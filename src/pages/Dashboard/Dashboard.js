import React, { useId } from 'react'
import classNames from 'classnames/bind'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

import styles from './Dashboard.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Dashboard() {
    const formId = useId()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <form id={formId} className={cx('query-form')} onSubmit={(e) => handleSubmit(e)}>
                    <div className={cx('left-container-form')}>
                        <Input className={cx('search-inp')} label={'Before:'} />
                        <Input className={cx('time-inp')} label={'when:'} />
                    </div>

                    <div className={cx('middle-container-form')}>
                        <Input className={cx('query-inp')} label={'Find:'} />
                    </div>

                    <div className={cx('right-container-form')}>
                        <Input className={cx('search-inp')} label={'After:'} />

                        <Input className={cx('time-inp')} label={'when:'} />
                    </div>

                    <Button className={cx('submit-btn')} icon={faTurnDown} />
                </form>
            </div>
        </div>
    )
}

export default Dashboard
