import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { format, getDay } from 'date-fns'
import { toast } from 'react-toastify'

import styles from './OverlayImage.module.scss'
import Image from '~/components/Image'
import { actSaveImage, actRemoveSavedImage, actGetSimilarImages } from '~/redux/actions/imageAction'
import { dayOfWeek } from '~/utils/constants'

const cx = classNames.bind(styles)

function OverlayImage({
    image,
    spacing,
    size = 'fullsize',
    border,
    type,
    enabledName,
    hasInformation,
    inforClassName,
    hasPopup = false,
    savedImage,
    saveImage,
    removeSavedImage,
    getSimilarImages,
}) {
    const isSaved = () => {
        const index = savedImage.findIndex((item) => item.ImageID === image.ImageID)
        return index > -1
    }

    const handleClickImage = (data) => {
        if (hasPopup && data) {
            const prefix = 'http://lifeseeker-sv.computing.dcu.ie/'
            const ext = '.webp'

            const arr = data.map((link) => {
                const relativePath = link.split(prefix)[1].split(ext)[0].split('/')
                const ImageID = relativePath[2]
                const getDate = ImageID.split('_')[0]
                const getTime = ImageID.split('_')[1]

                const year = getDate.substring(0, 4)
                const month = getDate.substring(4, 6)
                const day = getDate.substring(6, 8)
                const hour = getTime.substring(0, 2)
                const minute = getTime.substring(2, 4)

                const similarImage = {
                    ImageID: `${ImageID}.jpg`,
                    new_name: '',
                    event_id: null,
                    local_time: `${year}-${month}-${day}T${hour}:${minute}:00`,
                    day_of_week: dayOfWeek[getDay(new Date(`${year}-${month}-${day}T${hour}:${minute}:00`))],
                    image_link: link,
                }

                return similarImage
            })

            console.log(arr)

            getSimilarImages(arr, true)
        }
    }

    return (
        <div className={cx('wrapper', { spacing, [size]: size, ['has-information']: hasInformation })}>
            <div
                className={cx('container', isSaved(image) && border ? ('box-shadow', 'border-image') : '')}
                onClick={() => handleClickImage(image.similar_images)}
            >
                <Image className={cx('image')} absolute src={image.image_link} alt={image.new_name} />
                <div className={cx('middle-content')}>
                    {type === 'add' && (
                        <Fragment>
                            {!isSaved(image) && (
                                <div className={cx('img-action')}>
                                    <span
                                        className={cx('icon')}
                                        onClick={(e) => {
                                            saveImage(image)
                                            e.stopPropagation()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                    <span
                                        className={cx('icon')}
                                        onClick={(e) => {
                                            toast.success('Submit sucessfully!')
                                            e.stopPropagation()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSquareCheck} />
                                    </span>
                                </div>
                            )}
                        </Fragment>
                    )}
                    {type === 'remove' && (
                        <span className={cx('icon')} onClick={() => removeSavedImage(image.ImageID)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                    )}
                </div>
            </div>
            {enabledName && (
                <div className={cx('information', { [inforClassName]: inforClassName })}>
                    {image.new_name && (
                        <Tippy content={image.new_name} placement={'bottom-start'}>
                            <span>{image.new_name}</span>
                        </Tippy>
                    )}
                    <Tippy
                        content={`${image.day_of_week}, ${format(new Date(image.local_time), 'HH:mm yyyy-MM-dd')}`}
                        placement={'bottom-start'}
                    >
                        <span>
                            {image.day_of_week}, {format(new Date(image.local_time), 'HH:mm yyyy-MM-dd')}
                        </span>
                    </Tippy>
                </div>
            )}
        </div>
    )
}

OverlayImage.propTypes = {
    image: PropTypes.shape({
        ImageID: PropTypes.string.isRequired,
        new_name: PropTypes.string,
        event_id: PropTypes.number,
        local_time: PropTypes.string,
        day_of_week: PropTypes.string,
        image_link: PropTypes.string.isRequired,
        similar_images: PropTypes.array,
    }),
    spacing: PropTypes.bool,
    size: PropTypes.oneOf(['fullsize', 'large', 'middle', 'small', 'extra-small']),
    type: PropTypes.oneOf(['add', 'remove']),
    border: PropTypes.bool,
    hasInformation: PropTypes.bool,
    inforClassName: PropTypes.string,
    hasPopup: PropTypes.bool,
    enabledName: PropTypes.bool,
    savedImage: PropTypes.array,
    saveImage: PropTypes.func,
    removeSavedImage: PropTypes.func,
    getSimilarImages: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        savedImage: state.imageReducer.savedImage,
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        saveImage: (image) => {
            dispatch(actSaveImage(image))
        },
        removeSavedImage: (imageId) => {
            dispatch(actRemoveSavedImage(imageId))
        },
        getSimilarImages: (images, isOpenPopup) => {
            dispatch(actGetSimilarImages(images, isOpenPopup))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(React.memo(OverlayImage))
