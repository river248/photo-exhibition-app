import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'

import styles from './SimilarImages.module.scss'
import OverlayImage from '~/components/OverlayImage'
import PopupImagesForm from '~/components/PopupImagesForm'
import { resExceptionMessageHandler } from '~/utils/helper'
import { fakeSubmitImage } from '~/utils/fakeData'
import { actGetSimilarImages } from '~/redux/actions/imageAction'

const cx = classNames.bind(styles)

function SimilarImages({ images, clearSimilarImages }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (images.length > 0) {
            const body = images.map((item) => item.ImageID)
            console.log(body)
            setIsLoading(true)
            try {
                await fakeSubmitImage(body)
                clearSimilarImages()
                toast.success('Submit successfully!')
                setIsLoading(false)
            } catch (error) {
                toast.error(resExceptionMessageHandler(error))
                setIsLoading(false)
            }
        }
    }

    return (
        <PopupImagesForm
            title={'SIMILAR IMAGES'}
            isLoading={isLoading}
            isDisabled={images.length < 1}
            onSubmit={handleSubmit}
        >
            <div className={cx('container')}>
                {images.length > 0 ? (
                    <Fragment>
                        {images.map((item, index) => (
                            <div key={index} className={cx('container-item')}>
                                <OverlayImage
                                    inforClassName={cx('information')}
                                    border
                                    enabledName
                                    hasInformation
                                    type={'add'}
                                    image={item}
                                    size={'fullsize'}
                                />
                            </div>
                        ))}
                    </Fragment>
                ) : (
                    <div className={cx('no-image')}>No similar image</div>
                )}
            </div>
        </PopupImagesForm>
    )
}

SimilarImages.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            ImageID: PropTypes.string.isRequired,
            new_name: PropTypes.string,
            event_id: PropTypes.string,
            local_time: PropTypes.string.isRequired,
            day_of_week: PropTypes.string.isRequired,
            image_link: PropTypes.string.isRequired,
        }),
    ),
    clearSimilarImages: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSimilarImages: () => {
            dispatch(actGetSimilarImages([], false))
        },
    }
}

export default connect(null, mapDispatchToProps)(React.memo(SimilarImages))
