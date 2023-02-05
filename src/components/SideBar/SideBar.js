import React from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faTrashCan } from '@fortawesome/free-regular-svg-icons'

import styles from './SideBar.module.scss'
import OverlayImage from '~/components/OverlayImage'

const cx = classNames.bind(styles)

const listSavedImages = [1, 2, 3, 4, 5]

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>SAVED SCENCES</span>
                <div className={cx('bookmark')}>
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>9</span>
                </div>
            </div>

            <div className={cx('saved-gallery')}>
                {listSavedImages.map((image) => (
                    <div key={image} className={cx('saved-gallery-item')}>
                        <div className={cx('image-wrapper', 'saved-image')}>
                            <OverlayImage src={''} alt={''} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default React.memo(SideBar)
