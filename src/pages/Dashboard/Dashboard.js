import React, { useId } from 'react'
import classNames from 'classnames/bind'

import styles from './Dashboard.module.scss'
import CustomInput from '~/components/CustomInput'

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
                        <div className={cx('search-inp')}>
                            <CustomInput label={'Before:'} />
                        </div>
                        <div className={cx('time-inp')}>
                            <CustomInput label={'when:'} />
                        </div>
                    </div>

                    <div className={cx('middle-container-form')}>
                        <CustomInput className={cx('query-inp')} label={'Find:'} />
                    </div>

                    <div className={cx('right-container-form')}>
                        <div className={cx('search-inp')}>
                            <CustomInput label={'After:'} />
                        </div>
                        <div className={cx('time-inp')}>
                            <CustomInput label={'when:'} />
                        </div>
                    </div>

                    <div className={cx('submit-inp-wrapper')}>
                        <input className={cx('submit-inp')} type={'submit'} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard
