import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const fetchLatestVideos = createAsyncThunk('latestVideoSlice/fetchLatestVideos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Promise.all([
                axios.get(`discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6`)
                    .then(response => ({ title: "Latest Movies", videos: response.data.results })),
                axios.get(`discover/tv?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=first_air_date.desc&page=1&timezone=America%2FNew_York&vote_average.gte=6&include_null_first_air_dates=false`)
                    .then(response => ({ title: "Latest TV Shows", videos: response.data.results }))
            ])

            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    })

const initialState = {
    latestVideos: [],
    status: 'idle',
    error: null
}

const latestVideoSlice = createSlice({
    name: 'latestVideos',
    initialState: initialState,
    extraReducers: {
        [fetchLatestVideos.pending]: (state, _) => {
            state.status = 'loading'
        },

        [fetchLatestVideos.fulfilled]: (state, action) => {
            action.payload.forEach(latestVideo => {
                state.latestVideos.push({ ...latestVideo })
            })

            state.status = 'success'
        },

        [fetchLatestVideos.rejected]: (state, action) => {
            state.status = 'error'
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const selectLatestVideos = state => state.latestVideos

export default latestVideoSlice.reducer