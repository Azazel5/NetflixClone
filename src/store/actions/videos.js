import * as actionTypes from './actionTypes'
import axios from '../../baseAxios'

export function trendingActionCreator() {
    return dispatch => {
        axios.get(
            `trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        ).then(response => dispatch({
            type: actionTypes.TRENDING_API_REQUEST,
            payload: response.data.results, 
            videoType: 'Trending'
        }))
    }
}

export function topRatedActionCreator() {
    return dispatch => {
        axios.get(
            `movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
        ).then(response => dispatch({
            type: actionTypes.TOP_RATED_API_REQUEST,
            payload: response.data.results, 
            videoType: 'Top Rated'
        }))
    }
}

export function getVideoInformation(videoId, mediaType) {
    let requestURL;
    if (mediaType === 'movie' || !mediaType) {
        requestURL = `movie/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    } else if (mediaType === 'tv') {
        requestURL = `tv/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    } 

    return dispatch => {
        axios.get(requestURL)
            .then(response => dispatch({
                type: actionTypes.GET_VIDEO_DETAILS,
                payload: response.data
        }))
    }
}