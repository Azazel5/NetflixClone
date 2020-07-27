import {configureStore} from '@reduxjs/toolkit'
import trendingReducer from './slices/trendingSlice'
import topRatedReducer from './slices/topratedSlice'

const store = configureStore({
    reducer: {
        trending: trendingReducer, 
        toprated: topRatedReducer
    }
}) 

export default store 
