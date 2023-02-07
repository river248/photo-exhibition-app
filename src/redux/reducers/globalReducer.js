import { IS_FETCHING_API, TOGGLE_MODAL } from '~/redux/types/global'

const initialState = {
    isFetchingAPI: false,
    isOpenModal: false,
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_FETCHING_API:
            return {
                ...state,
                isFetchingAPI: action.payload,
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                isOpenModal: action.payload,
            }
        default:
            return { ...state }
    }
}

export default globalReducer
