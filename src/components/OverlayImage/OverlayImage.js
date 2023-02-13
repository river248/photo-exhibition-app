import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './OverlayImage.module.scss'
import Image from '~/components/Image'
import { actSaveImage, actRemoveSavedImage } from '~/redux/actions/imageAction'
import { format } from 'date-fns'

const cx = classNames.bind(styles)

function OverlayImage({
    image,
    spacing,
    size = 'fullsize',
    border,
    type,
    enabledName,
    hasInformation,
    savedImage,
    saveImage,
    removeSavedImage,
}) {
    const isSaved = () => {
        const index = savedImage.findIndex((item) => item.ImageID === image.ImageID)
        return index > -1
    }

    return (
        <div className={cx('wrapper', { spacing, [size]: size, ['has-information']: hasInformation })}>
            <div className={cx('container', isSaved(image) && border ? ('box-shadow', 'border-image') : '')}>
                <Image className={cx('image')} absolute src={image.image_link} alt={image.new_name} />
                <div className={cx('middle-content')}>
                    {type === 'add' && (
                        <Fragment>
                            {!isSaved(image) && (
                                <div className={cx('img-action')}>
                                    <span className={cx('icon')} onClick={() => saveImage(image)}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                    <span className={cx('icon')}>
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
                <div className={cx('information')}>
                    <Tippy content={image.new_name} placement={'bottom-start'}>
                        <span>{image.new_name}</span>
                    </Tippy>

                    <span>{format(new Date(image.local_time), 'yyyy/MM/dd')}</span>
                    <span>{image.day_of_week}</span>
                </div>
            )}
        </div>
    )
}

OverlayImage.propTypes = {
    image: PropTypes.shape({
        ImageID: PropTypes.string.isRequired,
        new_name: PropTypes.string.isRequired,
        event_id: PropTypes.number.isRequired,
        local_time: PropTypes.string.isRequired,
        day_of_week: PropTypes.string.isRequired,
        image_link: PropTypes.string.isRequired,
        similar_images: PropTypes.array,
    }),
    spacing: PropTypes.bool,
    size: PropTypes.oneOf(['fullsize', 'large', 'middle', 'small', 'extra-small']),
    type: PropTypes.oneOf(['add', 'remove']),
    border: PropTypes.bool,
    hasInformation: PropTypes.bool,
    enabledName: PropTypes.bool,
    savedImage: PropTypes.array,
    saveImage: PropTypes.func,
    removeSavedImage: PropTypes.func,
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
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(React.memo(OverlayImage))
