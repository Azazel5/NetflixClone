import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from './ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'
import {connect} from 'react-redux'
import {trendingActionCreator} from '../../store/actions/videos'

/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    const {onLoadTrending, trending} = props 

    useEffect(() => {
        onLoadTrending()
    }, [onLoadTrending])

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
            <BrowseContent logoutHandler={logoutHandler} trending={trending}/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        trending: state.videos.trending 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTrending: () => dispatch(trendingActionCreator())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)