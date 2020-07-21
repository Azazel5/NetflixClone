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
