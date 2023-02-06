import React from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faTrashCan } from '@fortawesome/free-regular-svg-icons'

import styles from './SavedScence.module.scss'
import OverlayImage from '~/components/OverlayImage'

const cx = classNames.bind(styles)

function SavedScence({ listSavedImages }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>SAVED SCENCES</span>
                <div className={cx('bookmark')}>
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>{listSavedImages.length}</span>
                </div>
            </div>

            <div className={cx('saved-gallery')}>
                {listSavedImages.map((image) => (
                    <div key={image} className={cx('saved-gallery-item')}>
                        <div className={cx('image-wrapper', 'saved-image')}>
                            <OverlayImage src={image} alt={'saved images'} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

SavedScence.propTypes = {
    listSavedImages: PropTypes.array.isRequired,
}

export default React.memo(SavedScence)
