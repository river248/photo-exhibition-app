import React, { useId, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

import styles from './Filter.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Filter() {
    const formId = useId()
    const beforeInpRef = useRef()
    const queryInpRef = useRef()
    const afterInpRef = useRef()
    const locationInpRef = useRef()

    const [isVisible, setIsVisible] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            previous_event: beforeInpRef.current.value,
            next_event: afterInpRef.current.value,
            // time_gap: 12,
        }

        // Handle submit if query is not null
        if (queryInpRef.current.value && locationInpRef.current.value) {
            data = {
                ...data,
                query: queryInpRef.current.value,
                start_date: '2019-01-01',
                end_date: '2019-01-31',
                location: locationInpRef.current.value,
                // is_temporal_search: true,
            }
            console.log(data)
        } else {
            toast.error('Please fill in "find", "location" and "date time" field!')
        }
    }

    return (
        <div className={cx('wrapper', { 'hide-nav slide-left-right': !isVisible })}>
            <h1 className={cx('title')}>FILTER</h1>

            <button className={cx('toggle-btn')} onClick={() => setIsVisible(!isVisible)}>
                <FontAwesomeIcon icon={isVisible ? faChevronLeft : faChevronRight} />
            </button>

            <form id={formId} className={cx('container')} onSubmit={(e) => handleSubmit(e)}>
                <div className={cx('input-wrapper')}>
                    <Input
                        textarea
                        ref={beforeInpRef}
                        lblClassName={cx('label')}
                        label={'Before:'}
                        placeholder={'Example: I am at home'}
                    />
                </div>
                <div className={cx('input-wrapper')}>
                    <div className={cx('input-container')}>
                        <Input
                            className={cx('time-inp')}
                            lblClassName={cx('label')}
                            label={'when:'}
                            type={'number'}
                            min={0}
                        />
                        <span>hours</span>
                    </div>
                </div>

                <div className={cx('input-wrapper')}>
                    <Input
                        textarea
                        ref={queryInpRef}
                        lblClassName={cx('label')}
                        label={'Find:'}
                        placeholder={'Example: I am at home'}
                    />
                </div>
                <div className={cx('input-wrapper')}>
                    <Input
                        ref={locationInpRef}
                        lblClassName={cx('label')}
                        label={'Location:'}
                        placeholder={'Example: dcu'}
                    />
                </div>
                <div className={cx('input-wrapper')}>
                    <Input lblClassName={cx('label')} label={'Date time:'} placeholder={'yyyy/MM/dd ~ yyyy/MM/dd'} />
                </div>

                <div className={cx('input-wrapper')}>
                    <Input
                        textarea
                        ref={afterInpRef}
                        lblClassName={cx('label')}
                        label={'After:'}
                        placeholder={'Example: I am at home'}
                    />
                </div>
                <div className={cx('input-wrapper')}>
                    <div className={cx('input-container')}>
                        <Input
                            className={cx('time-inp')}
                            lblClassName={cx('label')}
                            label={'when:'}
                            type={'number'}
                            min={0}
                        />
                        <span>hours</span>
                    </div>
                </div>

                <Button className={cx('submit-btn')} title={'Submit'} center />
            </form>
        </div>
    )
}

export default React.memo(Filter)
