import * as actionTypes from '../actions/actionTypes'

const initialState = {
    trending: []
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
        default:
            return state
    }
}