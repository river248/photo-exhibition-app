import React, { Fragment, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import styles from './Dashboard.module.scss'
import OverlayImage from '~/components/OverlayImage'
import FilterImages from '~/components/FilterImages'
import SavedScence from '~/components/SavedScence'
import { actToggleModal } from '~/redux/actions/globalAction'
import Loading from '~/components/Loading'
import Pagination from '~/components/Pagination'
import { actGetSimilarImages } from '~/redux/actions/imageAction'
import SimilarImages from '~/components/SimilarImages'
import CustomModal from '~/components/CustomModal'

const cx = classNames.bind(styles)

function Dashboard({ isOpenModal, listImages, isFetchingAPI, similarImages, toggleModal, clearSimilarImages }) {
    const [page, setPage] = useState(0)

    const listImagesByPage = useMemo(() => {
        let result = { listImages, numberPage: 0 }

        if (!isEmpty(listImages)) {
            const isMoreThanOne = listImages.find((item) => item.previous_event || item.next_event)
            const MAX_ITEM = isMoreThanOne ? 12 : 28
            const begin = (page - 1) * MAX_ITEM
            const end = page * MAX_ITEM
            const item = listImages.slice(begin, end)

            const numberPage = Math.ceil(listImages.length / MAX_ITEM)

            result = { listImages: item, numberPage }
        }

        return result
    }, [listImages, page])

    useEffect(() => {
        if (!isEmpty(listImages)) {
            setPage(1)
        }
    }, [listImages])

    return (
        <Fragment>
            <FilterImages />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Result</h1>
                </div>
                {isFetchingAPI && <Loading />}
                {!isFetchingAPI && !isEmpty(listImagesByPage) && (
                    <div className={cx('container')}>
                        {listImagesByPage.listImages.map((item, index) => (
                            <div
                                key={index}
                                className={cx('gallery')}
                                style={{
                                    width:
                                        item.previous_event || item.next_event
                                            ? 'calc(1 / 3 * 100%)'
                                            : 'calc(1 / 7 * 100%)',
                                }}
                            >
                                {item.previous_event && (
                                    <OverlayImage
                                        hasPopup
                                        border
                                        hasInformation
                                        type={'add'}
                                        image={item.previous_event._source}
                                        size={'extra-small'}
                                    />
                                )}
                                {item.current_event && (
                                    <OverlayImage
                                        hasPopup
                                        border
                                        enabledName
                                        hasInformation
                                        spacing={(item.previous_event || item.next_event) && true}
                                        type={'add'}
                                        image={item.current_event._source}
                                        size={item.previous_event || item.next_event ? 'small' : 'fullsize'}
                                    />
                                )}
                                {item.next_event && (
                                    <OverlayImage
                                        hasPopup
                                        border
                                        hasInformation
                                        type={'add'}
                                        image={item.next_event._source}
                                        size={'extra-small'}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {page > 0 && !isFetchingAPI && (
                    <Pagination
                        absolute
                        numberPage={listImagesByPage.numberPage}
                        currentPage={page}
                        onChange={(value) => setPage(value)}
                    />
                )}
            </div>

            <CustomModal isOpenModal={isOpenModal} onClose={() => toggleModal(false)}>
                <SavedScence />
            </CustomModal>

            <CustomModal isOpenModal={similarImages.isOpenPopup} onClose={() => clearSimilarImages()}>
                <SimilarImages images={similarImages.images} />
            </CustomModal>
        </Fragment>
    )
}

Dashboard.propTypes = {
    isOpenModal: PropTypes.bool,
    listImages: PropTypes.array,
    isFetchingAPI: PropTypes.bool,
    similarImages: PropTypes.shape({
        isOpenModal: PropTypes.bool,
        images: PropTypes.arrayOf(PropTypes.string),
    }),
    toggleModal: PropTypes.func,
    clearSimilarImages: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.globalReducer.isOpenModal,
        listImages: state.imageReducer.listImages,
        isFetchingAPI: state.globalReducer.isFetchingAPI,
        similarImages: state.imageReducer.similarImages,
    }
}
const mapDisptachToProps = (dispatch) => {
    return {
        toggleModal: (status) => {
            dispatch(actToggleModal(status))
        },
        clearSimilarImages: () => {
            dispatch(actGetSimilarImages([], false))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Dashboard)
