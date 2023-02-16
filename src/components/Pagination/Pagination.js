import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import styles from './Pagination.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Pagination({ numberPage, currentPage, onChange, absolute }) {
    const listPage = () => {
        const arr = []
        for (let index = 0; index < numberPage; index++) {
            arr.push(index + 1)
        }
        return arr
    }

    const handlePageChange = (page) => {
        onChange(page)
    }

    return (
        <div className={cx('wrapper', { absolute })}>
            <div className={cx('container')}>
                <Button className={cx('page')} icon={faAnglesLeft} />
                <Button className={cx('page')} icon={faChevronLeft} />
                {listPage().map((page) => (
                    <Button
                        className={cx('page', currentPage === page && 'current-page')}
                        title={page.toString()}
                        key={page}
                        onClick={() => handlePageChange(page)}
                    />
                ))}
                <Button className={cx('page')} icon={faChevronRight} />
                <Button className={cx('page')} icon={faAnglesRight} />
            </div>
        </div>
    )
}

Pagination.propTypes = {
    numberPage: PropTypes.number,
    currentPage: PropTypes.number,
    onChange: PropTypes.func,
    absolute: PropTypes.bool,
}

export default React.memo(Pagination)
