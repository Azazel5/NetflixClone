import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'baseAxios'
import { genreTopVideoTransformation } from 'utils/transformations'


const fetchTvGenres = async () => {
    try {
        const response = await axios.get(
            `genre/tv/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        )

        return response.data.genres
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchTvShowsByGenres = createAsyncThunk('tvByGenreSlice/fetchTvShowsByGenres',
    async (_, { rejectWithValue }) => {
        try {
            const genres = await fetchTvGenres()
            return await genreTopVideoTransformation(genres, 'tv')
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    }
)

const initalState = {
    genres: [],
    status: 'idle',
    error: null
}

const tvByGenreSlice = createSlice({
    name: 'tvByGenre',
    initialState: initalState,
    extraReducers: {
        [fetchTvShowsByGenres.pending]: (state, _) => {
            state.status = 'loading'
        },

        [fetchTvShowsByGenres.fulfilled]: (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({ ...genre })
            })

            state.status = 'success'
        },

        [fetchTvShowsByGenres.rejected]: (state, action) => {
            state.status = 'error'
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const selectTvByGenre = state => state.tvByGenre

export default tvByGenreSlice.reducer 