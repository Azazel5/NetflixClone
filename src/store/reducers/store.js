import {configureStore} from '@reduxjs/toolkit'
import trendingReducer from './slices/trendingSlice'
import topRatedReducer from './slices/topratedSlice'
import netflixOriginalsReducer from './slices/netflixOriginalsSlice'
import moviesByGenresSlice from './slices/moviesByGenreSlice'

const store = configureStore({
    reducer: {
        trending: trendingReducer, 
        toprated: topRatedReducer, 
        netflixOriginals: netflixOriginalsReducer,
        byGenre: moviesByGenresSlice
    }
}) 

export default store 
