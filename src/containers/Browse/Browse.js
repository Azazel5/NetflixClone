import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from '../../components/Modals/ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTrending, selectAllTrendingVideos } from '../../store/reducers/slices/trendingSlice'
import { fetchTopRated, selectAllTopRatedVideos } from '../../store/reducers/slices/topratedSlice'
import { fetchNetflixOriginals, selectAllNetflixOriginals } from '../../store/reducers/slices/netflixOriginalsSlice'
import { fetchMoviesByGenre, selectMoviesByGenre, selectMovieByGenreStatus } from '../../store/reducers/slices/moviesByGenreSlice'
import { fetchTvShowsByGenres, selectTvByGenre, selectTvByGenreStatus } from '../../store/reducers/slices/tvByGenreSlice'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'


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

    const moviesByGenre = useSelector(selectMoviesByGenre)
    const movieByGenreStatus = useSelector(selectMovieByGenreStatus)

    const tvByGenre = useSelector(selectTvByGenre)
    const tvByGenreStatus = useSelector(selectTvByGenreStatus)

    useEffect(() => {
        if (route === '/browse') {
            dispatch(fetchTrending())
            dispatch(fetchTopRated())
            dispatch(fetchNetflixOriginals())
        }

        else if (route === '/browse/movies') {
            if (movieByGenreStatus === 'idle') {
                dispatch(fetchMoviesByGenre())
            }
        } else if (route === '/browse/tv') {
            if (tvByGenreStatus === 'idle') {
                dispatch(fetchTvShowsByGenres())
            }
        }

    }, [dispatch, route, movieByGenreStatus, tvByGenreStatus])

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
        history.push('/')
    }

    let videoSections = []
    let browseContent
    if (route === '/browse') {
        videoSections.push({ title: "Trending", videos: trendingVideos })
        videoSections.push({ title: "Top Rated", videos: topRatedVideos })
        videoSections.push({ title: "Netflix Originals", videos: netflixOriginals })
        browseContent = (
            <BrowseContent
                videoSections={videoSections}
                logoutHandler={logoutHandler}
            />
        )

    } else if (route === '/browse/movies') {
        if (movieByGenreStatus === 'success') {
            browseContent = (
                <BrowseContent
                    videoSections={moviesByGenre}
                    logoutHandler={logoutHandler}
                />
            )
        } else if(movieByGenreStatus === 'idle' || movieByGenreStatus === 'loading') {
            browseContent = <LoadingScreen />
        }
    } else if (route === '/browse/tv') {
        if (tvByGenreStatus === 'success') {
            browseContent = (
                <BrowseContent
                    videoSections={tvByGenre}
                    logoutHandler={logoutHandler}
                />
            )
        } else if(tvByGenreStatus === 'idle' || tvByGenreStatus === 'loading') {
            browseContent = <LoadingScreen />
        }
    }

    return (
        <>
            <ProfileModal modalOpen={modal} profileClickHandler={profileClickHandler} />
            {browseContent}
        </>
    )
}

/**
 * Remember the thing which gave you trouble here. Never mutate state directly. Since I didn't create
 * a copy of the trending state array, I kept splicing each item all over the place, which 
 * caused unnecessary problems. 
 */

export default Browse