import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const topratedAdapter = createEntityAdapter()

export const fetchTopRated = createAsyncThunk('topratedSlice/fetchTopRated',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
            )
            return response.data.results
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    })

const topratedSlice = createSlice({
    name: 'toprated',
    initialState: topratedAdapter.getInitialState({ error: null }),
    extraReducers: {
        [fetchTopRated.fulfilled]: (state, action) => {
            topratedAdapter.upsertMany(state, action.payload)
        },

        [fetchTopRated.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }        }
    }
})

export const {
    selectAll: selectAllTopRatedVideos,
} = topratedAdapter.getSelectors(state => state.toprated)

export const selectTopRatedError = state => state.toprated.error

export default topratedSlice.reducer
