import React, { useId, useRef } from 'react'
import classNames from 'classnames/bind'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

import styles from './Dashboard.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Image from '~/components/Image'

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
    const formId = useId()
    const beforeInpRef = useRef()
    const queryInpRef = useRef()
    const afterInpRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            before: beforeInpRef.current.value,
            after: afterInpRef.current.value,
        }

        // Handle submit if query is not null
        if (queryInpRef.current.value) {
            data = {
                ...data,
                query: queryInpRef.current.value,
            }
            console.log(data)
        }
    }

    const background = (index) => {
        const line = Math.ceil(index / 3)
        if (line % 2 === 0) {
            return 'even'
        }
        return 'odd'
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <form id={formId} className={cx('query-form')} onSubmit={(e) => handleSubmit(e)}>
                    <div className={cx('left-container-form')}>
                        <Input ref={beforeInpRef} className={cx('search-inp')} label={'Before:'} />
                        <Input className={cx('time-inp')} label={'when:'} />
                    </div>

                    <div className={cx('middle-container-form')}>
                        <Input ref={queryInpRef} className={cx('query-inp')} label={'Find:'} />
                    </div>

                    <div className={cx('right-container-form')}>
                        <Input ref={afterInpRef} className={cx('search-inp')} label={'After:'} />
                        <Input className={cx('time-inp')} label={'when:'} />
                    </div>

                    <Button className={cx('submit-btn')} icon={faTurnDown} />
                </form>
            </div>

            <div className={cx('container')}>
                {listImage.map((item, index) => (
                    <div key={index} className={cx('gallery', item.focused ? 'border-image' : '')}>
                        <div className={cx('image-left-wrapper')}>
                            {item.number[0] && <Image absolute src={''} alt={''} />}
                        </div>
                        <div className={cx('image-mid-wrapper', item.focused ? 'box-shadow' : '')}>
                            {item.number[1] && <Image absolute src={''} alt={''} />}
                        </div>
                        <div className={cx('image-right-wrapper')}>
                            {item.number[2] && <Image absolute src={''} alt={''} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
