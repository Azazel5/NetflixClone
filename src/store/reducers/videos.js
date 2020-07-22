import * as actionTypes from '../actions/actionTypes'

const initialState = {
    videos: {
        trending: {content: []},
        topRated: {content: []}
    },

    movie: {},
}

export default function videoReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TRENDING_API_REQUEST:
            return {
                ...state,
                videos: {
                    ...state.videos,
                    trending: {
                        videoType: action.videoType,
                        content: [
                            ...state.videos.trending.content,
                            ...action.payload,
                        ]
                    },
                }
            }

        case actionTypes.GET_VIDEO_DETAILS:
            return {
                ...state,
                movie: {
                    ...state.movie,
                    ...action.payload
                }
            }

        case actionTypes.TOP_RATED_API_REQUEST:
            return {
                ...state,
                ...state,
                videos: {
                    ...state.videos,
                    topRated: {
                        videoType: action.videoType,
                        content: [
                            ...state.videos.topRated.content,
                            ...action.payload,
                        ]
                    },
                }
            }

        default:
            return state
    }
}