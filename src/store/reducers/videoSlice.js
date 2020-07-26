import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import axios from '../../baseAxios'

export const videoAdapter = createEntityAdapter()

export const fetchTrending = createAsyncThunk('videoSlice/fetchTrending', async () => {
    const response = await axios.get(
        `trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
    )
    return response.data.results 
})

const videoSlice = createSlice({
    name: 'videos', 
    initialState: videoAdapter.getInitialState(), 
    reducers: {}, 
    extraReducers: {
        [fetchTrending.fulfilled]: (state, action) => {
            videoAdapter.upsertMany(state, action.payload)
        }
    }
})

export const {trending} = videoSlice.actions
export const {
    selectAll: selectAllTrendingVideos,
    selectById: selectTrendingVideosById,
    selectIds: selectTrendingIds 
  } = videoAdapter.getSelectors(state => state.videos)

export default videoSlice.reducer
