import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'

const cx = classNames.bind(styles)

function SavedScence({ savedImage }) {
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

export default connect(mapStateToProps, null)(React.memo(SavedScence))
