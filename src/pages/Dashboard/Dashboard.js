import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
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

function Dashboard({ isOpenModal, listImages, isFetchingAPI, savedImage, toggleModal, saveImage }) {
    const isSaved = (imageArg) => {
        const index = savedImage.findIndex((image) => image._id === imageArg._id)
        return index > -1
    }

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
                                    <div
                                        className={cx(
                                            'image-wrapper',
                                            'image-wrapper-left',
                                            isSaved(item.previous_event) ? ('box-shadow', 'border-image') : '',
                                        )}
                                    >
                                        <OverlayImage
                                            src={item.previous_event._source.image_link}
                                            alt={item.previous_event._source.new_name}
                                        >
                                            <div className={cx('img-action')}>
                                                {!isSaved(item.previous_event) && (
                                                    <Fragment>
                                                        <span
                                                            className={cx('icon')}
                                                            onClick={() => saveImage(item.previous_event)}
                                                        >
                                                            <FontAwesomeIcon icon={faBookmark} />
                                                        </span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faSquareCheck} />
                                                        </span>
                                                    </Fragment>
                                                )}
                                            </div>
                                        </OverlayImage>
                                    </div>
                                )}
                                {item.current_event && (
                                    <div
                                        className={cx(
                                            'image-wrapper',
                                            'image-wrapper-mid',
                                            isSaved(item.current_event) ? ('box-shadow', 'border-image') : '',
                                        )}
                                        style={{ width: item.previous_event || item.next_event ? '40%' : '100%' }}
                                    >
                                        {item.current_event && (
                                            <OverlayImage
                                                src={item.current_event._source.image_link}
                                                alt={item.current_event._source.new_name}
                                            >
                                                <div className={cx('img-action')}>
                                                    {!isSaved(item.current_event) && (
                                                        <Fragment>
                                                            <span
                                                                className={cx('icon')}
                                                                onClick={() => saveImage(item.current_event)}
                                                            >
                                                                <FontAwesomeIcon icon={faBookmark} />
                                                            </span>
                                                            <span className={cx('icon')}>
                                                                <FontAwesomeIcon icon={faSquareCheck} />
                                                            </span>
                                                        </Fragment>
                                                    )}
                                                </div>
                                            </OverlayImage>
                                        )}
                                    </div>
                                )}
                                {item.next_event && (
                                    <div
                                        className={cx(
                                            'image-wrapper',
                                            'image-wrapper-right',
                                            isSaved(item.next_event) ? ('box-shadow', 'border-image') : '',
                                        )}
                                    >
                                        {item.next_event && (
                                            <OverlayImage
                                                src={item.next_event._source.image_link}
                                                alt={item.next_event._source.new_name}
                                            >
                                                <div className={cx('img-action')}>
                                                    {!isSaved(item.next_event) && (
                                                        <Fragment>
                                                            <span
                                                                className={cx('icon')}
                                                                onClick={() => saveImage(item.next_event)}
                                                            >
                                                                <FontAwesomeIcon icon={faBookmark} />
                                                            </span>
                                                            <span className={cx('icon')}>
                                                                <FontAwesomeIcon icon={faSquareCheck} />
                                                            </span>
                                                        </Fragment>
                                                    )}
                                                </div>
                                            </OverlayImage>
                                        )}
                                    </div>
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
    savedImage: PropTypes.array,
    isFetchingAPI: PropTypes.bool,
    toggleModal: PropTypes.func,
    saveImage: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.globalReducer.isOpenModal,
        listImages: state.imageReducer.listImages,
        isFetchingAPI: state.globalReducer.isFetchingAPI,
        savedImage: state.imageReducer.savedImage,
    }
}
const mapDisptachToProps = (dispatch) => {
    return {
        toggleModal: (status) => {
            dispatch(actToggleModal(status))
        },
        saveImage: (image) => {
            dispatch(actSaveImage(image))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Dashboard)
