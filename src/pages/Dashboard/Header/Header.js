import React, { useId, useRef } from 'react'
import classNames from 'classnames/bind'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Header() {
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
            <form id={formId} className={cx('container')} onSubmit={(e) => handleSubmit(e)}>
                <div className={cx('container-left')}>
                    <Input ref={beforeInpRef} className={cx('search-inp')} label={'Before:'} />
                    <Input className={cx('time-inp')} label={'when:'} readOnly />
                </div>

                <div className={cx('container-middle')}>
                    <Input ref={queryInpRef} className={cx('query-inp')} label={'Find:'} />
                </div>

                <div className={cx('container-right')}>
                    <Input ref={afterInpRef} className={cx('search-inp')} label={'After:'} />
                    <Input className={cx('time-inp')} label={'when:'} readOnly />
                </div>

                <Button className={cx('submit-btn')} icon={faTurnDown} />
            </form>
        </div>
    )
}

export default React.memo(Header)
