import VideoReducer from './videos'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    videos: VideoReducer
})

export default rootReducer