import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './SimilarImages.module.scss'
import Image from '~/components/Image'

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
                                <div className={cx('image-wrapper')}>
                                    <Image absolute src={item} alt={'similar image'} />
                                </div>
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
    images: PropTypes.arrayOf(PropTypes.string),
}

export default SimilarImages
