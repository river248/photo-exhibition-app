import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'
import Button from '~/components/Button'
import { actClearSavedImage } from '~/redux/actions/imageAction'
import { actToggleModal } from '~/redux/actions/globalAction'

const cx = classNames.bind(styles)

function SavedScence({ savedImage, clearSaveImage, toggleModal }) {
    const handleSubmit = () => {
        clearSaveImage()
        toggleModal(false)
        toast.success('Submit successfully!')
        console.log(savedImage)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>SAVED SCENCES</span>
                <div className={cx('bookmark')}>
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>{savedImage.length}</span>
                </div>
            </div>

            <div className={cx('saved-gallery')}>
                {savedImage.map((image) => (
                    <div key={image.ImageID} className={cx('saved-gallery-item')}>
                        <OverlayImage type={'remove'} image={image} />
                    </div>
                ))}
            </div>

            <Button className={cx('submit-btn')} title={'Submit'} center onClick={handleSubmit} />
        </div>
    )
}

SavedScence.propTypes = {
    savedImage: PropTypes.array,
    clearSaveImage: PropTypes.func,
    toggleModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        savedImage: state.imageReducer.savedImage,
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        clearSaveImage: () => {
            dispatch(actClearSavedImage())
        },
        toggleModal: (status) => {
            dispatch(actToggleModal(status))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(React.memo(SavedScence))
