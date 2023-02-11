import React, { useId, useRef, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { connect } from 'react-redux'

import styles from './FilterImages.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'
import DateTimeInput from '~/components/DateTimeInput'
import { actToggleModal, actFetchAPI } from '~/redux/actions/globalAction'
import { actGetImages } from '~/redux/actions/imageAction'

const cx = classNames.bind(styles)

function FilterImages({ toggleModal, getImages, fetchingAPI }) {
    const formId = useId()
    const beforeInpRef = useRef()
    const queryInpRef = useRef()
    const afterInpRef = useRef()
    const locationInpRef = useRef()

    const [dateRange, setDateRange] = useState({})
    const [visibleMore, setVisibleMore] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        let args = {
            previous_event: beforeInpRef.current?.value,
            next_event: afterInpRef.current?.value,
            // time_gap: 12,
        }

        // Handle submit if query is not null
        if (queryInpRef.current.value) {
            args = {
                ...args,
                query: queryInpRef.current.value,
                start_date: dateRange.startDate,
                end_date: dateRange.endDate,
                location: locationInpRef.current?.value,
                // is_temporal_search: true,
            }
            fetchingAPI(true)
            getImages(args)
        } else {
            toast.error('Please fill in "find", "location" and "date time" field!')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>FILTER</h1>

            <form id={formId} className={cx('container')} onSubmit={(e) => handleSubmit(e)}>
                {visibleMore && (
                    <Fragment>
                        <div className={cx('input-wrapper')}>
                            <Input
                                textarea
                                ref={beforeInpRef}
                                lblClassName={cx('label')}
                                label={'Before:'}
                                placeholder={'Example: I am at home'}
                            />
                        </div>
                        <div className={cx('input-wrapper', 'border-bottom-dash')}>
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
                    </Fragment>
                )}

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
                    <DateTimeInput
                        onChange={(value) =>
                            setDateRange({
                                startDate: format(value.startDate, 'yyyy-MM-dd'),
                                endDate: format(value.endDate, 'yyyy-MM-dd'),
                            })
                        }
                    />
                </div>

                {visibleMore && (
                    <Fragment>
                        <div className={cx('input-wrapper', 'border-top-dash')}>
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
                    </Fragment>
                )}

                <Button className={cx('submit-btn')} title={'Search'} center />
            </form>
            <Button
                className={cx('submit-btn')}
                title={visibleMore ? 'Show less' : 'Show more'}
                center
                fullsize
                onClick={() => setVisibleMore((prev) => !prev)}
            />
            <Button
                className={cx('submit-btn', 'link')}
                title={'Saved scence'}
                center
                fullsize
                onClick={() => toggleModal(true)}
            />
        </div>
    )
}

FilterImages.propTypes = {
    toggleModal: PropTypes.func,
    getImages: PropTypes.func,
    fetchingAPI: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: (status) => {
            dispatch(actToggleModal(status))
        },
        getImages: (args) => {
            dispatch(actGetImages(args))
        },
        fetchingAPI: (status) => {
            dispatch(actFetchAPI(status))
        },
    }
}

export default connect(null, mapDispatchToProps)(React.memo(FilterImages))
