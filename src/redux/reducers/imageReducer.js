import { cloneDeep } from 'lodash'

import { SAVE_IMAGE, REMOVE_SAVED_IMAGE } from '~/redux/types/image'

const initialState = {
    savedImage: [],
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_IMAGE:
            const cloneSavedImage = cloneDeep(state.savedImage)
            cloneSavedImage.push(action.payload)

            return {
                ...state,
                savedImage: cloneSavedImage,
            }
        case REMOVE_SAVED_IMAGE:
            const cloneRemoveSavedImage = cloneDeep(state.savedImage)
            const index = cloneRemoveSavedImage.findIndex((image) => image.id === action.payload)
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
