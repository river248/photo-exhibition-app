import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './OverlayImage.module.scss'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

function OverlayImage({ src, alt, children }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('image')} absolute src={src} alt={alt} />

            <div className={cx('middle')}>{children}</div>
        </div>
    )
}

OverlayImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    children: PropTypes.node,
}

export default React.memo(OverlayImage)
