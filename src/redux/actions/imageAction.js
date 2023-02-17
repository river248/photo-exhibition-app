import { actFetchAPI } from './globalAction'
import { fetchAPI } from '~/apis'
import { GET_IMAGES, SAVE_IMAGE, REMOVE_SAVED_IMAGE, GET_SIMILAR_IMAGES } from '~/redux/types/image'

export const getImages = (images) => {
    return {
        type: GET_IMAGES,
        payload: images,
    }
}

export const actGetImages = (args) => {
    return async (dispatch) => {
        const res = await fetchAPI(args)
        if (res) {
            dispatch(getImages(res))
        }
        dispatch(actFetchAPI(false))
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

export const actRemoveSavedImage = (imageId) => {
    return {
        type: REMOVE_SAVED_IMAGE,
        payload: imageId,
    }
}
