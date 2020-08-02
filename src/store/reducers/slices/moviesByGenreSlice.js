import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'
import { genreTopVideoTransformation } from '../../../utils/transformations'

const fetchMovieGenres = async () => {
    const response = await axios.get(
        `genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    )

    return response.data.genres
}

export const fetchMoviesByGenre = createAsyncThunk('moviesByGenreSlice/fetchMoviesByGenre',
    async () => {
        const genres = await fetchMovieGenres()
        return await genreTopVideoTransformation(genres, 'movie')
    }
)

const initalState = {
    genres: [],
    status: 'idle'
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
        }
    }
})

export const selectMoviesByGenre = state => state.moviesByGenre.genres
export const selectMovieByGenreStatus = state => state.moviesByGenre.status

export default moviesByGenreSlice.reducer 