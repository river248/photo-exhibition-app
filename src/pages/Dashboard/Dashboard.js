import React, { Fragment } from 'react'
import classNames from 'classnames/bind'

import styles from './Dashboard.module.scss'
import OverlayImage from '~/components/OverlayImage'
import Filter from '~/components/Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import routes from '~/configs/routes'
import images from '~/assets/images'

const cx = classNames.bind(styles)

const listImage = [
    { focused: true, image: [images.img05_075336, images.img05_075408, images.img05_075440] },
    { focused: true, image: [images.img05_075941, images.img05_082810, images.img05_083402] },
    { focused: true, image: [images.img05_091011, images.img05_094120, images.img05_102720] },
    { focused: true, image: [images.img05_102752, images.img05_102824, ''] },
    { focused: false, image: [images.img06_075312, images.img06_075344, images.img06_075416] },
    { focused: false, image: [images.img06_075624, images.img06_075800, images.img06_080112] },
    { focused: false, image: [images.img06_081653, images.img06_084523, images.img06_084555] },
    { focused: false, image: [images.img06_084803, images.img06_085011, images.img06_085043] },
]

function Dashboard() {
    return (
        <Fragment>
            <Filter />
            <div className={cx('wrapper', 'expand')}>
                <div className={cx('header')}>
                    <Button className={cx('link')} to={routes.savedScence} title={'Saved scence'} />
                    <h1>Result</h1>
                </div>
                <div className={cx('container')}>
                    {listImage.map((item, index) => (
                        <div key={index} className={cx('gallery', item.focused ? 'border-image' : '')}>
                            <div className={cx('image-wrapper', 'image-wrapper-left')}>
                                {item.image[0] && (
                                    <OverlayImage src={item.image[0]} alt={''}>
                                        <div className={cx('img-action')}>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </span>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faSquareCheck} />
                                            </span>
                                        </div>
                                    </OverlayImage>
                                )}
                            </div>
                            <div className={cx('image-wrapper', 'image-wrapper-mid', item.focused ? 'box-shadow' : '')}>
                                {item.image[1] && (
                                    <OverlayImage src={item.image[1]} alt={''}>
                                        <div className={cx('img-action')}>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </span>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faSquareCheck} />
                                            </span>
                                        </div>
                                    </OverlayImage>
                                )}
                            </div>
                            <div className={cx('image-wrapper', 'image-wrapper-right')}>
                                {item.image[2] && (
                                    <OverlayImage src={item.image[2]} alt={''}>
                                        <div className={cx('img-action')}>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </span>
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faSquareCheck} />
                                            </span>
                                        </div>
                                    </OverlayImage>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
