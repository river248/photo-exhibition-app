import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'

import styles from './Dashboard.module.scss'
import Image from '~/components/Image'
import Header from './Header'
import SideBar from './SideBar'
import OverlayImage from '~/components/OverlayImage'

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
            <div className={cx('container-left')}>
                <Header />

                <div className={cx('content')}>
                    {listImage.map((item, index) => (
                        <div key={index} className={cx('gallery', item.focused ? 'border-image' : '')}>
                            <div className={cx('image-wrapper', 'image-wrapper-left')}>
                                {item.number[0] && <OverlayImage src={''} alt={''} />}
                            </div>
                            <div className={cx('image-wrapper', 'image-wrapper-mid', item.focused ? 'box-shadow' : '')}>
                                {item.number[1] && <OverlayImage src={''} alt={''} />}
                            </div>
                            <div className={cx('image-wrapper', 'image-wrapper-right')}>
                                {item.number[2] && <OverlayImage src={''} alt={''} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('container-right')}>
                <SideBar />
            </div>
        </div>
    )
}

export default Dashboard
