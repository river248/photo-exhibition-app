import React, { useState } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'
import { actClearSavedImage } from '~/redux/actions/imageAction'
import { actToggleModal } from '~/redux/actions/globalAction'
import { fakeSubmitImage } from '~/utils/fakeData'
import { resExceptionMessageHandler } from '~/utils/helper'
import PopupImagesForm from '~/components/PopupImagesForm'

const cx = classNames.bind(styles)

function SavedScence({ savedImage, clearSaveImage, toggleModal }) {
    const [isLoading, setIsLoading] = useState(false)

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
        <PopupImagesForm
            title={'SAVED SCENCES'}
            numberImages={savedImage.length}
            isLoading={isLoading}
            isDisabled={isEmpty(savedImage)}
            onSubmit={handleSubmit}
        >
            <div className={cx('saved-gallery')}>
                {savedImage.map((image) => (
                    <div key={image.ImageID} className={cx('saved-gallery-item')}>
                        <OverlayImage type={'remove'} image={image} />
                    </div>
                ))}
            </div>
        </PopupImagesForm>
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
