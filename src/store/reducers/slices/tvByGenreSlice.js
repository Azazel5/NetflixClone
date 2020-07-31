import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'
import { genreTopVideoTransformation } from '../../../utils/transformations'


const fetchTvGenres = async () => {
    const response = await axios.get(
        `genre/tv/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    )

    return response.data.genres
}

export const fetchTvShowsByGenres = createAsyncThunk('tvByGenreSlice/fetchTvShowsByGenres',
    async () => {
        const genres = await fetchTvGenres()
        return await genreTopVideoTransformation(genres, 'tv')
    }
)

const initalState = {
    genres: [],
    status: 'idle'
}

const tvByGenreSlice = createSlice({
    name: 'tvByGenre',
    initialState: initalState,
    extraReducers: {
        [fetchTvShowsByGenres.pending]: (state, action) => {
            state.status = 'loading'
        },

        [fetchTvShowsByGenres.fulfilled]: (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({ ...genre })
            })

            state.status = 'success'
        }, 

        [fetchTvShowsByGenres.rejected]: (_, action) => {
            console.log("Error: ", action.payload)
        }
    }
})

export const selectTvByGenre = state => state.tvByGenre.genres
export const selectTvByGenreStatus = state => state.tvByGenre.status

export default tvByGenreSlice.reducer 