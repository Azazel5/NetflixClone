import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from './ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/videos'

/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    const {
        onLoadTrending, onLoadVideoDetails, selectedMovie,
        onLoadTopRated, videos
    } = props

    useEffect(() => {
        onLoadTrending()
        onLoadTopRated()
    }, [onLoadTrending, onLoadTopRated])

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
        history.push('/')
    }

    const carouselItemHoverHandler = (videoId, mediaType) => {
        onLoadVideoDetails(videoId, mediaType)
    }

    return (
        <>
            <ProfileModal modalOpen={modal} profileClickHandler={profileClickHandler} />
            <BrowseContent
                logoutHandler={logoutHandler}
                videos={videos}
                carouselItemHoverHandler={carouselItemHoverHandler}
                selectedMovie={selectedMovie}
            />
        </>
    )
}

/**
 * Remember the thing which gave you trouble here. Never mutate state directly. Since I didn't create
 * a copy of the trending state array, I kept splicing each item all over the place, which 
 * caused unnecessary problems. 
 */
const mapStateToProps = state => {
    return {
        videos: state.videos.videos,
        selectedMovie: state.videos.movie,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTrending: () => dispatch(actionCreators.trendingActionCreator()),
        onLoadVideoDetails: (videoId, mediaType) =>
            (dispatch(actionCreators.getVideoInformation(videoId, mediaType))),
        onLoadTopRated: () => dispatch(actionCreators.topRatedActionCreator())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)