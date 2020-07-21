import * as actionTypes from '../actions/actionTypes'

const initialState = {
    trending: [], 
    movie: {}
}

export default function videoReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.TRENDING_API_REQUEST:
            return {
                ...state,
                trending: [
                    ...state.trending, 
                    ...action.payload
                ]
            }

        case actionTypes.GET_VIDEO_DETAILS:
            return {
                ...state,
                movie: {
                    ...state.movie, 
                    ...action.payload
                }
            }

        default:
            return state
    }
}