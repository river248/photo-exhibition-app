import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './CustomInput.module.scss'

const cx = classNames.bind(styles)

const CustomInput = forwardRef(({ label, error, className, ...passProps }, ref) => {
    const inputRef = useRef()
    const [inputValue, setInputValue] = useState('')

    useImperativeHandle(
        ref,
        () => ({
            value: inputValue,

            focus: () => {
                inputRef.current.focus()
            },
            blur: () => {
                inputRef.current.blur()
            },
        }),
        [inputValue],
    )

    const handleOnChange = (value) => {
        setInputValue(value)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <label className={cx('input-label')}>{label}</label>
                <input
                    ref={inputRef}
                    className={cx('input-base', {
                        [className]: className,
                    })}
                    onChange={(e) => handleOnChange(e.target.value)}
                    {...passProps}
                />
            </div>
            {error && <span className={cx('error')}>{error}</span>}
        </div>
    )
})

CustomInput.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
}

export default React.memo(CustomInput)
