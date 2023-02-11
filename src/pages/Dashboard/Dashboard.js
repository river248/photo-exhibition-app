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

const cx = classNames.bind(styles)

function Dashboard({ isOpenModal, listImages, isFetchingAPI, savedImage, toggleModal, saveImage }) {
    const isSaved = (imageId) => {
        const index = savedImage.findIndex((image) => image.id === imageId)
        return index > -1
    }

    return (
        <Fragment>
            <FilterImages />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Result</h1>
                </div>
                {isFetchingAPI && <span>Loading...</span>}
                {!isFetchingAPI && !isEmpty(listImages) && (
                    <div className={cx('container')}>
                        {listImages.map((item, index) => (
                            <div key={index} className={cx('gallery')}>
                                <div
                                    className={cx(
                                        'image-wrapper',
                                        'image-wrapper-left',
                                        isSaved(item.image[0].id) ? ('box-shadow', 'border-image') : '',
                                    )}
                                >
                                    {item.image[0] && (
                                        <OverlayImage src={item.image[0].src} alt={'prev event image'}>
                                            <div className={cx('img-action')}>
                                                {!isSaved(item.image[0].id) && (
                                                    <Fragment>
                                                        <span
                                                            className={cx('icon')}
                                                            onClick={() => saveImage(item.image[0])}
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
                                <div
                                    className={cx(
                                        'image-wrapper',
                                        'image-wrapper-mid',
                                        isSaved(item.image[1].id) ? ('box-shadow', 'border-image') : '',
                                    )}
                                >
                                    {item.image[1] && (
                                        <OverlayImage src={item.image[1].src} alt={'current event image'}>
                                            <div className={cx('img-action')}>
                                                {!isSaved(item.image[1].id) && (
                                                    <Fragment>
                                                        <span
                                                            className={cx('icon')}
                                                            onClick={() => saveImage(item.image[1])}
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
                                <div
                                    className={cx(
                                        'image-wrapper',
                                        'image-wrapper-right',
                                        isSaved(item.image[2].id) ? ('box-shadow', 'border-image') : '',
                                    )}
                                >
                                    {item.image[2] && (
                                        <OverlayImage src={item.image[2].src} alt={'next event image'}>
                                            <div className={cx('img-action')}>
                                                {!isSaved(item.image[2].id) && (
                                                    <Fragment>
                                                        <span
                                                            className={cx('icon')}
                                                            onClick={() => saveImage(item.image[2])}
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
