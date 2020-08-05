import React, { useState, useEffect } from 'react'

import ProfileModal from '../../components/Modals/ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import { fetchTrending, selectAllTrendingVideos } from '../../store/reducers/slices/trendingSlice'
import { fetchTopRated, selectAllTopRatedVideos } from '../../store/reducers/slices/topratedSlice'
import { fetchNetflixOriginals, selectAllNetflixOriginals } from '../../store/reducers/slices/netflixOriginalsSlice'
import { fetchMoviesByGenre, selectMoviesByGenre, selectMovieByGenreStatus } from '../../store/reducers/slices/moviesByGenreSlice'
import { fetchTvShowsByGenres, selectTvByGenre, selectTvByGenreStatus } from '../../store/reducers/slices/tvByGenreSlice'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import Layout from '../../hoc/Layout'
import SearchContent from './SearchContent/SearchContent'


/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    // Render different videoSections based on this route prop
    const { route } = props
    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
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

    const history = useHistory()

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    let videoSections = []
    let browseContent
    if (route === '/browse') {
        videoSections.push({ title: "Trending", videos: trendingVideos })
        videoSections.push({ title: "Top Rated", videos: topRatedVideos })
        videoSections.push({ title: "Netflix Originals", videos: netflixOriginals })
        browseContent = (
            <BrowseContent videoSections={videoSections} />
        )

    } else if (route === '/browse/movies') {
        if (movieByGenreStatus === 'success') {
            browseContent = (
                <BrowseContent videoSections={moviesByGenre} />
            )

        } else if (movieByGenreStatus === 'idle' || movieByGenreStatus === 'loading') {
            browseContent = <LoadingScreen />
        }
    } else if (route === '/browse/tv') {
        if (tvByGenreStatus === 'success') {
            browseContent = (
                <BrowseContent videoSections={tvByGenre} />
            )
        } else if (tvByGenreStatus === 'idle' || tvByGenreStatus === 'loading') {
            browseContent = <LoadingScreen />
        }
    } else if (route === '/search') {
        browseContent = <SearchContent searchParam={history.location.search.substring(3)} />
    }

    return (
        <>
            <ProfileModal modalOpen={modal} profileClickHandler={profileClickHandler} />
            {!modal && <Layout>
                {browseContent}
            </Layout>}
        </>
    )
}

/**
 * Remember the thing which gave you trouble here. Never mutate state directly. Since I didn't create
 * a copy of the trending state array, I kept splicing each item all over the place, which 
 * caused unnecessary problems. 
 */

export default Browse