import React, { Fragment } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import styles from './Dashboard.module.scss'
import OverlayImage from '~/components/OverlayImage'
import Filter from '~/components/Filter'
import images from '~/assets/images'
import SavedScence from '~/components/SavedScence'
import { actToggleModal } from '~/redux/actions/globalAction'
import { actSaveImage } from '~/redux/actions/imageAction'

const cx = classNames.bind(styles)

const listImage = [
    {
        image: [
            { id: 'img05_075336', src: images.img05_075336 },
            { id: 'img05_075408', src: images.img05_075408 },
            { id: 'img05_075440', src: images.img05_075440 },
        ],
    },
    {
        image: [
            { id: 'img05_075941', src: images.img05_075941 },
            { id: 'img05_082810', src: images.img05_082810 },
            { id: 'img05_083402', src: images.img05_083402 },
        ],
    },
    {
        image: [
            { id: 'img05_091011', src: images.img05_091011 },
            { id: 'img05_094120', src: images.img05_094120 },
            { id: 'img05_102720', src: images.img05_102720 },
        ],
    },
    {
        image: [{ id: 'img05_102752', src: images.img05_102752 }, { id: 'img05_102824', src: images.img05_102824 }, ''],
    },
    {
        image: [
            { id: 'img06_075312', src: images.img06_075312 },
            { id: 'img06_075344', src: images.img06_075344 },
            { id: 'img06_075416', src: images.img06_075416 },
        ],
    },
    {
        image: [
            { id: 'img06_075624', src: images.img06_075624 },
            { id: 'img06_075800', src: images.img06_075800 },
            { id: 'img06_080112', src: images.img06_080112 },
        ],
    },
    {
        image: [
            { id: 'img06_081653', src: images.img06_081653 },
            { id: 'img06_084523', src: images.img06_084523 },
            { id: 'img06_084555', src: images.img06_084555 },
        ],
    },
    {
        image: [
            { id: 'img06_084803', src: images.img06_084803 },
            { id: 'img06_085011', src: images.img06_085011 },
            { id: 'img06_085043', src: images.img06_085043 },
        ],
    },
]

function Dashboard({ isOpenModal, savedImage, toggleModal, saveImage }) {
    const isSaved = (imageId) => {
        const index = savedImage.findIndex((image) => image.id === imageId)
        return index > -1
    }

    return (
        <Fragment>
            <Filter />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Result</h1>
                </div>
                <div className={cx('container')}>
                    {listImage.map((item, index) => (
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
    savedImage: PropTypes.array,
    toggleModal: PropTypes.func,
    saveImage: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.globalReducer.isOpenModal,
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
