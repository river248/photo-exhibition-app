import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './SimilarImages.module.scss'
import OverlayImage from '~/components/OverlayImage'

const cx = classNames.bind(styles)

function SimilarImages({ images }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>SIMILAR IMAGES</span>
            </div>
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
        </div>
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
}

export default SimilarImages
