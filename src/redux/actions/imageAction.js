import { SAVE_IMAGE, REMOVE_SAVED_IMAGE } from '~/redux/types/image'

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
