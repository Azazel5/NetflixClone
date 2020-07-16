import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";

import ProfileModal from './ProfileModal/ProfileModal'
import BrowseContent from './BrowseContent/BrowseContent'
import { AuthenticationContext } from '../../context/Authentication'

/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => {
    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

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
            <BrowseContent logoutHandler={logoutHandler}/>
        </>
    )
}

export default Browse