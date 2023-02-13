import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import styles from './Dashboard.module.scss'
import OverlayImage from '~/components/OverlayImage'
import FilterImages from '~/components/FilterImages'
import SavedScence from '~/components/SavedScence'
import { actToggleModal } from '~/redux/actions/globalAction'
import { actSaveImage } from '~/redux/actions/imageAction'
import Loading from '~/components/Loading'

const cx = classNames.bind(styles)

function Dashboard({ isOpenModal, listImages, isFetchingAPI, toggleModal }) {
    return (
        <Fragment>
            <FilterImages />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Result</h1>
                </div>
                {isFetchingAPI && <Loading />}
                {!isFetchingAPI && !isEmpty(listImages) && (
                    <div className={cx('container')}>
                        {listImages.map((item, index) => (
                            <div
                                key={index}
                                className={cx('gallery')}
                                style={{ width: item.previous_event || item.next_event ? 'calc(1 / 3 * 100%)' : '20%' }}
                            >
                                {item.previous_event && (
                                    <OverlayImage
                                        border
                                        type={'add'}
                                        image={item.previous_event._source}
                                        size={'extra-small'}
                                    />
                                )}
                                {item.current_event && (
                                    <OverlayImage
                                        border
                                        spacing={item.previous_event || item.next_event}
                                        type={'add'}
                                        image={item.current_event._source}
                                        size={item.previous_event || item.next_event ? 'small' : 'fullsize'}
                                    />
                                )}
                                {item.next_event && (
                                    <OverlayImage
                                        border
                                        type={'add'}
                                        image={item.next_event._source}
                                        size={'extra-small'}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isOpenModal && (
                <div
                    className={cx('saved-scence-wrapper')}
                    onClick={() => {
                        toggleModal(false)
                    }}
                >
                    <div className={cx('saved-scence-container')} onClick={(e) => e.stopPropagation()}>
                        <SavedScence />
                    </div>
                </div>
            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    isOpenModal: PropTypes.bool,
    listImages: PropTypes.array,
    isFetchingAPI: PropTypes.bool,
    toggleModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.globalReducer.isOpenModal,
        listImages: state.imageReducer.listImages,
        isFetchingAPI: state.globalReducer.isFetchingAPI,
    }
}
const mapDisptachToProps = (dispatch) => {
    return {
        toggleModal: (status) => {
            dispatch(actToggleModal(status))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Dashboard)
