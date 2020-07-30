import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from '../../components/Modals/ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrending, selectAllTrendingVideos } from '../../store/reducers/slices/trendingSlice'
import { fetchTopRated, selectAllTopRatedVideos } from '../../store/reducers/slices/topratedSlice'
import { fetchNetflixOriginals, selectAllNetflixOriginals } from '../../store/reducers/slices/netflixOriginalsSlice'
import { fetchMoviesByGenre, selectAction, selectAdventure } from '../../store/reducers/slices/moviesByGenreSlice'


/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    // Render different videoSections based on this route prop
    const { route } = props

    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()
    const dispatch = useDispatch()

    const trendingVideos = useSelector(selectAllTrendingVideos)
    const topRatedVideos = useSelector(selectAllTopRatedVideos)
    const netflixOriginals = useSelector(selectAllNetflixOriginals)

    const actionMovies = useSelector(selectAction)
    const adventureMovies = useSelector(selectAdventure)


    let videoSections
    if (route === '/browse') {
        videoSections = [
            { title: "Trending", videos: trendingVideos },
            { title: "Top Rated", videos: topRatedVideos },
            { title: "Netflix Originals", videos: netflixOriginals }
        ]
    } else if(route === '/browse/movies') {
        videoSections = [
            {title: 'Action', videos: actionMovies},
            {title: 'Adventure', videos: adventureMovies}
        ]
    }

    useEffect(() => {
        if (route === '/browse') {
            dispatch(fetchTrending())
            dispatch(fetchTopRated())
            dispatch(fetchNetflixOriginals())
        }

        else if (route === '/browse/movies') {
            dispatch(fetchMoviesByGenre())
        }
    }, [dispatch, route])

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
        history.push('/')
    }

    return (
        <>
            <ProfileModal modalOpen={modal} profileClickHandler={profileClickHandler} />
            <BrowseContent
                videoSections={videoSections}
                logoutHandler={logoutHandler}
            />
        </>
    )
}

/**
 * Remember the thing which gave you trouble here. Never mutate state directly. Since I didn't create
 * a copy of the trending state array, I kept splicing each item all over the place, which 
 * caused unnecessary problems. 
 */

export default Browse