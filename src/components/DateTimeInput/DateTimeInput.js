import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'

import styles from './DateTimeInput.module.scss'
import Input from '~/components/Input'

const cx = classNames.bind(styles)

function DateTimeInput({ onChange, startDate, endDate, calendarPos }) {
    const ref = useRef(null)

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: 'selection',
        },
    ])

    const [isShowTimePicker, setIsShowTimePicker] = useState(false)

    useEffect(() => {
        const hideOnEscape = (e) => {
            if (e.key === 'Escape') {
                setIsShowTimePicker(false)
            }
        }

        const checkIfClickedOutside = (e) => {
            if (isShowTimePicker && ref.current && !ref.current.contains(e.target)) {
                setIsShowTimePicker(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)
        document.addEventListener('keydown', hideOnEscape)

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
            document.removeEventListener('keydown', hideOnEscape)
        }
    }, [isShowTimePicker])

    return (
        <div ref={ref} className={cx('wrapper')}>
            <div className={cx('container')}>
                <Input
                    lblClassName={cx('label')}
                    label={'Date time:'}
                    value={`${format(dateRange[0].startDate, 'yyyy/MM/dd')} ~ ${format(
                        dateRange[0].endDate,
                        'yyyy/MM/dd',
                    )}`}
                    onFocus={() => setIsShowTimePicker(true)}
                />
            </div>
            {isShowTimePicker && (
                <div className={cx('calendar-wrapper', { [calendarPos]: calendarPos })}>
                    <DateRange
                        className={cx('calendar')}
                        ranges={dateRange}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        direction={'horizontal'}
                        onChange={(item) => {
                            setDateRange([item.selection])
                            onChange({ startDate: item.selection.startDate, endDate: item.selection.endDate })
                        }}
                    />
                </div>
            )}
        </div>
    )
}

DateTimeInput.propTypes = {
    onChange: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    calendarPos: PropTypes.oneOf(['bottom', 'top']),
}

export default React.memo(DateTimeInput)
