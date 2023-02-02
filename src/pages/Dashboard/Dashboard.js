import React from 'react'
import classNames from 'classnames/bind'

import styles from './Dashboard.module.scss'
import SideBar from './SideBar'
import OverlayImage from '~/components/OverlayImage'
import Filter from '~/components/Filter'

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
    )
}

export default Dashboard
