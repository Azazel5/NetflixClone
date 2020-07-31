import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../baseAxios'

const fetchMovieGenres = async () => {
    const response = await axios.get(
        `genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    )

    return response.data.genres
}

/**
 * Fetch all genres and create a trending movies API call for each. I push the response with 
 * a title and content to make it easier to label the video carousels later. This Promise.all 
 * function returns a large array, so I have to parse through the action.payload later 
 * in the slice reducer.  
 */
export const fetchMoviesByGenre = createAsyncThunk('moviesByGenreSlice/fetchMoviesByGenre',
    async () => {
        const genres = await fetchMovieGenres()
        const genreRequestArray = []
        let baseUrl
        genres.forEach(genre => {
            baseUrl = `discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id.toString()}`
            genreRequestArray.push(axios.get(baseUrl).then(response =>
                ({title: genre.name, videos: response.data.results})))
        })

        const response = await Promise.all(genreRequestArray)
        return response
    }
)

const initalState = {
    genres: [],
    status: 'idle'
}

const moviesByGenreSlice = createSlice({
    name: 'byGenre',
    initialState: initalState,
    extraReducers: {
        [fetchMoviesByGenre.pending]: (state, _) => {
            state.status = 'loading'
        },

        [fetchMoviesByGenre.fulfilled]: (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({...genre})
            })
            state.status = 'success'
        }
    }
})

export const selectMoviesByGenre = state => state.byGenre.genres 
export const selectMovieByGenreStatus = state => state.byGenre.status


export default moviesByGenreSlice.reducer 