import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'

export const trendingAdapter = createEntityAdapter()

export const fetchTrending = createAsyncThunk('trendingSlice/fetchTrending', async () => {
    const response = await axios.get(
        `trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
    )
    return response.data.results
})

const trendingSlice = createSlice({
    name: 'trending',
    initialState: trendingAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [fetchTrending.fulfilled]: (state, action) => {
            trendingAdapter.upsertMany(state, action.payload)
        }
    }
})

export const {
    selectAll: selectAllTrendingVideos,
} = trendingAdapter.getSelectors(state => state.trending)

export default trendingSlice.reducer
