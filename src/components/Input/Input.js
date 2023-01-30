import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import styles from './Input.module.scss'

const cx = classNames.bind(styles)

const Input = forwardRef(
    ({ textarea, label, error, check, variant, borderStatus = '', className, ...passProps }, ref) => {
        const Comp = textarea ? 'textarea' : 'input'
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
                {label && <label className={cx('label')}>{label}</label>}
                <div className={cx('input-container')}>
                    {check && (
                        <span className={cx('icon', `check-${borderStatus}`)}>
                            {borderStatus === 'success' && <FontAwesomeIcon icon={faCheck} />}
                            {borderStatus === 'error' && <FontAwesomeIcon icon={faTriangleExclamation} />}
                        </span>
                    )}
                    <Comp
                        ref={inputRef}
                        className={cx('input-base', {
                            textarea,
                            [borderStatus]: borderStatus,
                            [variant]: variant,
                            [className]: className,
                        })}
                        onChange={(e) => handleOnChange(e.target.value)}
                        {...passProps}
                    />
                </div>
                {error && <span className={cx('error-text')}>{error}</span>}
            </div>
        )
    },
)

Input.propTypes = {
    textarea: PropTypes.bool,
    label: PropTypes.string,
    error: PropTypes.string,
    check: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    borderStatus: PropTypes.oneOf(['success', 'error', '']),
    classNames: PropTypes.string,
}

export default React.memo(Input)
