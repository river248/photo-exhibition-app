import { IS_FETCHING_API, TOGGLE_MODAL } from '~/redux/types/global'

export const actFetchAPI = (status) => {
    return {
        type: IS_FETCHING_API,
        payload: status,
    }
}

export const actToggleModal = (status) => {
    return {
        type: TOGGLE_MODAL,
        payload: status,
    }
}
