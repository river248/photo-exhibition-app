import React from 'react'
import classNames from 'classnames/bind'

import styles from './Dashboard.module.scss'
import Image from '~/components/Image'
import Header from './Header'

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
                            <div className={cx('image-wrapper-left')}>
                                {item.number[0] && <Image absolute src={''} alt={''} />}
                            </div>
                            <div className={cx('image-wrapper-mid', item.focused ? 'box-shadow' : '')}>
                                {item.number[1] && <Image absolute src={''} alt={''} />}
                            </div>
                            <div className={cx('image-wrapper-right')}>
                                {item.number[2] && <Image absolute src={''} alt={''} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('container-right')}></div>
        </div>
    )
}

export default Dashboard
