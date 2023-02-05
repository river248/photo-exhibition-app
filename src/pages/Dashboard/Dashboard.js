import React from 'react'
import classNames from 'classnames/bind'

import styles from './Dashboard.module.scss'
import OverlayImage from '~/components/OverlayImage'
import Filter from '~/components/Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import routes from '~/configs/routes'

const cx = classNames.bind(styles)

const listImage = [
    { focused: true, number: ['before', 'current', 'after'] },
    { focused: true, number: ['before', 'current', 'after'] },
    { focused: true, number: ['before', 'current', 'after'] },
    { focused: true, number: ['before', 'current', 'after'] },
    { focused: true, number: ['before', 'current', 'after'] },
    { focus: false, number: ['', 'current', 'after'] },
    { focus: false, number: ['before', 'current', 'after'] },
    { focus: false, number: ['before', 'current', 'after'] },
    { focus: false, number: ['before', 'current', 'after'] },
    { focus: false, number: ['before', 'current', 'after'] },
    { focus: false, number: ['before', 'current', 'after'] },
    { focus: false, number: ['', 'current', 'after'] },
]

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <Filter />
            <div className={cx('container', 'expand')}>
                <div className={cx('header')}>
                    <Button className={cx('link')} to={routes.savedScence} title={'Go to saved scence'} />
                    <h1>Result</h1>
                </div>
                {listImage.map((item, index) => (
                    <div key={index} className={cx('gallery', item.focused ? 'border-image' : '')}>
                        <div className={cx('image-wrapper', 'image-wrapper-left')}>
                            {item.number[0] && (
                                <OverlayImage src={''} alt={''}>
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
                            {item.number[1] && (
                                <OverlayImage src={''} alt={''}>
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
                            {item.number[2] && (
                                <OverlayImage src={''} alt={''}>
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
    )
}

export default Dashboard
