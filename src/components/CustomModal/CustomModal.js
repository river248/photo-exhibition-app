import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './CustomModal.module.scss'

const cx = classNames.bind(styles)

function CustomModal({ isOpenModal, onClose, children }) {
    return (
        <Fragment>
            {isOpenModal && (
                <div className={cx('wrapper')} onClick={() => onClose()}>
                    <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

CustomModal.propTypes = {
    isOpenModal: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
}

export default CustomModal
