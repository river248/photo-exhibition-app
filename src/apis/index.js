import { toast } from 'react-toastify'

import axios from './axiosConfig'
import { API_ROOT } from '~/utils/constants'
import { resExceptionMessageHandler } from '~/utils/helper'
import { fakeRequest } from '~/utils/fakeData'

export const fetchAPI = async (args) => {
    try {
        // const res = await axios.post(`${API_ROOT}/path`, args)
        console.log(args)
        const res = await fakeRequest(args)

        return res.data
    } catch (error) {
        toast.error(resExceptionMessageHandler(error))
    }
}
