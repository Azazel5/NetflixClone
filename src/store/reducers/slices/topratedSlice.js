import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'

export const topratedAdapter = createEntityAdapter()

export const fetchTopRated = createAsyncThunk('topratedSlice/fetchTopRated', async () => {
    const response = await axios.get(
        `movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
    )
    
    return response.data.results
})

const topratedSlice = createSlice({
    name: 'toprated',
    initialState: topratedAdapter.getInitialState(),
    extraReducers: {
        [fetchTopRated.fulfilled]: (state, action) => {
            topratedAdapter.upsertMany(state, action.payload)
        }
    }
})

export const {
    selectAll: selectAllTopRatedVideos,
} = topratedAdapter.getSelectors(state => state.toprated)

export default topratedSlice.reducer
