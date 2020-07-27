import React, { useState, useContext, useEffect} from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from '../../components/Modals/ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTrending, selectAllTrendingVideos} from '../../store/reducers/slices/trendingSlice'
import {fetchTopRated, selectAllTopRatedVideos} from '../../store/reducers/slices/topratedSlice'

/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    const initialState = localStorage.getItem('profileSelected') ? false : true

    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()
    const dispatch = useDispatch()

    const videoSections = [
        {title: "Trending", videos: useSelector(selectAllTrendingVideos)},
        {title: "Top Rated", videos: useSelector(selectAllTopRatedVideos)},
    ]

    useEffect(() => {
        dispatch(fetchTrending())
        dispatch(fetchTopRated())
    }, [dispatch])

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