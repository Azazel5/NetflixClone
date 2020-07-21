import * as actionTypes from './actionTypes'
import axios from '../../baseAxios'

export function trendingActionCreator() {
    return dispatch => {
        axios.get(
            `trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
        ).then(response => dispatch({
            type: actionTypes.TRENDING_API_REQUEST,
            payload: response.data.results
        }))
    }
}

export function getVideoInformation(videoId, mediaType) {
    let requestURL;
    if (mediaType === 'movie') {
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