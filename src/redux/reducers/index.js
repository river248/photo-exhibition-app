import { combineReducers } from 'redux'

import globalReducer from './globalReducer'
import imageReducer from './imageReducer'

const rootReducer = combineReducers({
    globalReducer,
    imageReducer,
})

export default rootReducer
