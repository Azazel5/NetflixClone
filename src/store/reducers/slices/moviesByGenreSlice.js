import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'

const fetchMovieGenres = async () => {
    const response = await axios.get(
        `genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    )

    return response.data.genres
}

export const fetchMoviesByGenre = createAsyncThunk('moviesByGenreSlice/fetchMoviesByGenre',
    async () => {
        const genres = await fetchMovieGenres()
        const genreRequestArray = []
        let baseUrl
        genres.forEach(genre => {
            baseUrl = `discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id.toString()}`
            genreRequestArray.push(axios.get(baseUrl).then(response => response.data.results))
        })

        const response = await Promise.all(genreRequestArray)
        console.log(response)

        return response
    }
)

const initalState = {
    action: [],
    adventure: []
}

const moviesByGenreSlice = createSlice({
    name: 'byGenre',
    initialState: initalState,
    extraReducers: {
        [fetchMoviesByGenre.fulfilled]: (state, action) => {
            state.action = [...action.payload[0]]
            state.adventure = [...action.payload[1]]
        }
    }
})

export const selectAction = state => state.byGenre.action
export const selectAdventure = state => state.byGenre.adventure

export default moviesByGenreSlice.reducer 