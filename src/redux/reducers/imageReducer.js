import { cloneDeep } from 'lodash'

import { GET_IMAGES, SAVE_IMAGE, REMOVE_SAVED_IMAGE } from '~/redux/types/image'

const initialState = {
    listImages: [],
    savedImage: [],
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            return {
                ...state,
                listImages: action.payload,
            }
        case SAVE_IMAGE:
            const cloneSavedImage = cloneDeep(state.savedImage)
            cloneSavedImage.push(action.payload)

            return {
                ...state,
                savedImage: cloneSavedImage,
            }
        case REMOVE_SAVED_IMAGE:
            const cloneRemoveSavedImage = cloneDeep(state.savedImage)
            const index = cloneRemoveSavedImage.findIndex((image) => image._id === action.payload)
            cloneRemoveSavedImage.splice(index, 1)

            return {
                ...state,
                savedImage: cloneRemoveSavedImage,
            }
        default:
            return { ...state }
    }
}

export default imageReducer
