import React, { useId, useRef, useState, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { connect } from 'react-redux'

import styles from './FilterImages.module.scss'
import Input from '~/components/Input'
import Button from '~/components/Button'
import DateTimeInput from '~/components/DateTimeInput'
import { actToggleModal, actFetchingAPI } from '~/redux/actions/globalAction'
import { actGetImages } from '~/redux/actions/imageAction'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function FilterImages({ toggleModal, getImages, fetchingAPI }) {
    const formId = useId()
    const beforeInpRef = useRef()
    const queryInpRef = useRef()
    const afterInpRef = useRef()
    const locationInpRef = useRef()
    const textBoxRef = useRef()

    const [dateRange, setDateRange] = useState({ startDate: '2019-01-01', endDate: '2020-06-30' })
    const [visibleMore, setVisibleMore] = useState(false)
    const [textBox, setTextBox] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        let body = {
            previous_event: beforeInpRef.current?.value,
            next_event: afterInpRef.current?.value,
            time_gap: 1,
        }

        // Handle submit if query is not null
        if (queryInpRef.current.value) {
            body = {
                ...body,
                query: queryInpRef.current.value,
                start_date: dateRange.startDate,
                end_date: dateRange.endDate,
                location: locationInpRef.current?.value || '',
            }
            fetchingAPI(true)
            getImages(1234, body)
        } else {
            toast.error('Please fill in "find", "location" and "date time" field!')
        }
    }

    const handleSubmitText = useCallback(() => {
        if (textBox) {
            console.log(textBox)
            setTextBox('')
            toast.success('Successfully!')
        }
    }, [textBox])

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>MemoriEase</h1>

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
                        startDate={'2019-01-01'}
                        endDate={'2020-06-30'}
                        calendarPos={visibleMore ? 'top' : 'bottom'}
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
            <div className={cx('text-box-container')}>
                <textarea
                    className={cx('text-box')}
                    placeholder={'Enter your answer for question answering topic here'}
                    value={textBox}
                    onChange={(e) => setTextBox(e.target.value)}
                />
                <span className={cx('send-button')} onClick={handleSubmitText}>
                    <svg className="xsrhx6k" height="20px" viewBox="0 0 24 24" width="20px">
                        <path
                            d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
                            fill="#ffffff"
                        ></path>
                    </svg>
                </span>
            </div>
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
        getImages: (apiKey, body) => {
            dispatch(actGetImages(apiKey, body))
        },
        fetchingAPI: (status) => {
            dispatch(actFetchingAPI(status))
        },
    }
}

export default connect(null, mapDispatchToProps)(React.memo(FilterImages))
