import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'
import { actRemoveSavedImage } from '~/redux/actions/imageAction'

const cx = classNames.bind(styles)

function SavedScence({ savedImage, removeSavedImage }) {
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
                    <div key={image.id} className={cx('saved-gallery-item')}>
                        <div className={cx('image-wrapper', 'saved-image')}>
                            <OverlayImage src={image.src} alt={'saved images'}>
                                <span className={cx('icon')} onClick={() => removeSavedImage(image.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </span>
                            </OverlayImage>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

SavedScence.propTypes = {
    savedImage: PropTypes.array,
}

const mapStateToProps = (state) => {
    return {
        savedImage: state.imageReducer.savedImage,
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        removeSavedImage: (imageId) => {
            dispatch(actRemoveSavedImage(imageId))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(React.memo(SavedScence))
