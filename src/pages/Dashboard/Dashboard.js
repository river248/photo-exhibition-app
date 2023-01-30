import React, { useId, useRef } from 'react'
import classNames from 'classnames/bind'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

import styles from './Dashboard.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

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
        </div>
    )
}

export default Dashboard
