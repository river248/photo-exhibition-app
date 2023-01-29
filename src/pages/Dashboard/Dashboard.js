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
                        <CustomInput label={'Before: '} />
                        <CustomInput label={'when: '} />
                    </div>

                    <div className={cx('middle-container-form')}>
                        <CustomInput label={'Find: '} />
                    </div>

                    <div className={cx('right-container-form')}>
                        <CustomInput label={'After: '} />
                        <CustomInput label={'when: '} />
                    </div>

                    {/* <input type={'submit'} /> */}
                </form>
            </div>
        </div>
    )
}

export default Dashboard
