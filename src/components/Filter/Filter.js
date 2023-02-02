import React, { useId, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Filter.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Filter() {
    const formId = useId()
    const beforeInpRef = useRef()
    const queryInpRef = useRef()
    const afterInpRef = useRef()
    const [isVisible, setIsVisible] = useState(true)

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
        <div className={cx('wrapper', { 'hide-nav slide-left-right': !isVisible })}>
            {/* <h1>FILTER</h1> */}
            <button className={cx('toggle-btn')} onClick={() => setIsVisible(!isVisible)}>
                <FontAwesomeIcon icon={isVisible ? faChevronLeft : faChevronRight} />
            </button>

            <form id={formId} className={cx('container')} onSubmit={(e) => handleSubmit(e)}>
                <div className={cx('input-wrapper')}>
                    <Input textarea ref={beforeInpRef} lblClassName={cx('label')} label={'Before:'} />
                </div>
                <div className={cx('input-wrapper')}>
                    <Input lblClassName={cx('label')} label={'when:'} type={'number'} min={0} />
                </div>

                <div className={cx('input-wrapper')}>
                    <Input textarea ref={queryInpRef} lblClassName={cx('label')} label={'Find:'} />
                </div>

                <div className={cx('input-wrapper')}>
                    <Input textarea ref={afterInpRef} lblClassName={cx('label')} label={'After:'} />
                </div>
                <div className={cx('input-wrapper')}>
                    <Input className={cx('input')} lblClassName={cx('label')} label={'when:'} type={'number'} min={0} />
                </div>

                <Button className={cx('submit-btn')} title={'Submit'} center />
            </form>
        </div>
    )
}

export default React.memo(Filter)
