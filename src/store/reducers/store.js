import {configureStore} from '@reduxjs/toolkit'
import trendingReducer from './slices/trendingSlice'
import topRatedReducer from './slices/topratedSlice'
import netflixOriginalsReducer from './slices/netflixOriginalsSlice'

const store = configureStore({
    reducer: {
        trending: trendingReducer, 
        toprated: topRatedReducer, 
        netflixOriginals: netflixOriginalsReducer
    }
}) 

export default store 
