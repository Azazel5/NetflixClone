import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'baseAxios'
import { genreTopVideoTransformation } from 'utils/transformations'

const fetchMovieGenres = async () => {
    try {
        const response = await axios.get(
            `genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        )

        return response.data.genres
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchMoviesByGenre = createAsyncThunk('moviesByGenreSlice/fetchMoviesByGenre',
    async (_, { rejectWithValue }) => {
        try {
            const genres = await fetchMovieGenres()
            return await genreTopVideoTransformation(genres, 'movie')
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

const moviesByGenreSlice = createSlice({
    name: 'moviesByGenre',
    initialState: initalState,
    extraReducers: {
        [fetchMoviesByGenre.pending]: (state, _) => {
            state.status = 'loading'
        },

        [fetchMoviesByGenre.fulfilled]: (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({ ...genre })
            })

            state.status = 'success'
        },

        [fetchMoviesByGenre.rejected]: (state, action) => {
            state.status = 'error'
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const selectMoviesByGenre = state => state.moviesByGenre

export default moviesByGenreSlice.reducer 