import { actFetchingAPI } from './globalAction'
import { fetchCurentEvent } from '~/apis'
import { GET_IMAGES, SAVE_IMAGE, REMOVE_SAVED_IMAGE, GET_SIMILAR_IMAGES, CLEAR_SAVED_IMAGES } from '~/redux/types/image'

export const getImages = (images) => {
    return {
        type: GET_IMAGES,
        payload: images,
    }
}

export const actGetImages = (apiKey, body) => {
    return async (dispatch) => {
        const res = await fetchCurentEvent(apiKey, body)

        if (res) {
            dispatch(getImages(res))
        }
        dispatch(actFetchingAPI(false))
    }
}

// =================================================================================================
export const actGetSimilarImages = (images, isOpenPopup) => {
    return {
        type: GET_SIMILAR_IMAGES,
        payload: { images, isOpenPopup },
    }
}

export const actSaveImage = (image) => {
    return {
        type: SAVE_IMAGE,
        payload: image,
    }
}

export const actClearSavedImage = () => {
    return {
        type: CLEAR_SAVED_IMAGES,
        payload: [],
    }
}

export const actRemoveSavedImage = (imageId) => {
    return {
        type: REMOVE_SAVED_IMAGE,
        payload: imageId,
    }
}
