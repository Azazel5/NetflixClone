import axios from '../baseAxios'

/**
 * 
 * @param {*} genres: the genres
 * @param {*} apiCallType: whether the subsequent API calls will be made for tv or movies 
 * 
 * Takes a genre object and does creates a big chain of API calls to get each genre's top trending videos
 * 
 * Fetches all genres and creates a trending movies API call for each. I push the response with 
 * a title and content to make it easier to label the video carousels later. This Promise.all 
 * function returns a large array, so I have to parse through the action.payload later 
 * in the slice reducer.  
 */

export const genreTopVideoTransformation = async (genres, apiCallType) => {
    let url
    if (apiCallType === 'tv') {
        url = `discover/tv?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_genres=`
    } else if (apiCallType === 'movie') {
        url = `discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`
    }

    const genreRequestArray = []
    genres.forEach(genre => {
        let newUrlParser = url 
        newUrlParser += genre.id.toString()
        genreRequestArray.push(axios.get(newUrlParser).then(response =>
            ({ title: genre.name, videos: response.data.results })))
    })

    return await Promise.all(genreRequestArray)
}