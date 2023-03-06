import { toast } from 'react-toastify'

import axios from './axiosConfig'
import { API_ROOT } from '~/utils/constants'
import { resExceptionMessageHandler } from '~/utils/helper'

export const fetchCurentEvent = async (apiKey, body) => {
    // "query", "start_date", "end_date", "location" must be required
    let isMoreSearch = false
    const { query, start_date, end_date, location, previous_event, next_event, time_gap } = body

    if (previous_event || next_event) {
        isMoreSearch = true
    }

    try {
        let res = undefined
        if (isMoreSearch) {
            res = await axios.post(`${API_ROOT}/predict_temporal?api_key=${apiKey}`, {
                query,
                start_date,
                end_date,
                location,
                previous_event,
                next_event,
                time_gap,
                is_temporal_search: true,
            })
        } else {
            res = await axios.post(`${API_ROOT}/predict?api_key=${apiKey}`, {
                query,
                start_date,
                end_date,
                location,
            })
        }
        return res.data
    } catch (error) {
        toast.error(resExceptionMessageHandler(error))
    }
}
