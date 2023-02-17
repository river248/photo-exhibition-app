import { cloneDeep } from 'lodash'

import { GET_IMAGES, SAVE_IMAGE, REMOVE_SAVED_IMAGE, GET_SIMILAR_IMAGES, CLEAR_SAVED_IMAGES } from '~/redux/types/image'

const initialState = {
    listImages: [],
    savedImage: [],
    similarImages: {
        isOpenPopup: false,
        images: [],
    },
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
        case CLEAR_SAVED_IMAGES:
            return {
                ...state,
                savedImage: action.payload,
            }

        case REMOVE_SAVED_IMAGE:
            const cloneRemoveSavedImage = cloneDeep(state.savedImage)
            const index = cloneRemoveSavedImage.findIndex((image) => image.ImageID === action.payload)
            cloneRemoveSavedImage.splice(index, 1)

            return {
                ...state,
                savedImage: cloneRemoveSavedImage,
            }

        case GET_SIMILAR_IMAGES:
            return {
                ...state,
                similarImages: action.payload,
            }
        default:
            return { ...state }
    }
}

export default imageReducer
