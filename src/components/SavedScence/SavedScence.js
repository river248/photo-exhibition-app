import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'
import Button from '~/components/Button'
import { actClearSavedImage } from '~/redux/actions/imageAction'
import { actToggleModal } from '~/redux/actions/globalAction'
import { fakeSubmitImage } from '~/utils/fakeData'
import { resExceptionMessageHandler } from '~/utils/helper'
import DefaultLoading from '~/components/Loading/DefaultLoading'
import Input from '~/components/Input'

const cx = classNames.bind(styles)

function SavedScence({ savedImage, clearSaveImage, toggleModal }) {
    const [isLoading, setIsLoading] = useState(false)
    const textBoxRef = useRef(null)

    const handleSubmit = async () => {
        const body = savedImage.map((item) => item.ImageID)
        setIsLoading(true)

        try {
            await fakeSubmitImage(body)
            clearSaveImage()
            toggleModal(false)
            toast.success('Submit successfully!')
            setIsLoading(false)
            console.log(savedImage)
        } catch (error) {
            toast.error(resExceptionMessageHandler(error))
            setIsLoading(false)
        }
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

            <div className={cx('text-box-container')}>
                <Input ref={textBoxRef} className={cx('inp')} placeholder={'Enter your text'} />
            </div>

            <div className={cx('saved-gallery')}>
                {savedImage.map((image) => (
                    <div key={image.ImageID} className={cx('saved-gallery-item')}>
                        <OverlayImage type={'remove'} image={image} />
                    </div>
                ))}
            </div>

            {!isLoading ? (
                <Button
                    className={cx('submit-btn')}
                    disabled={isEmpty(savedImage)}
                    title={'Submit'}
                    center
                    onClick={handleSubmit}
                />
            ) : (
                <div className={cx('loading')}>
                    <DefaultLoading />
                </div>
            )}
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
