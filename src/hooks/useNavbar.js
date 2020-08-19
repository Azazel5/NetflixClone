import React, { useContext } from 'react'

import NavBar from 'containers/NavBar/NavBar'
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from 'context/Authentication'
import useDropdown from './useDropdown'

import ProfileCard from 'components/UI/ProfileCard/ProfileCard'
import { NavLink } from 'react-router-dom'

import {
    Weird,
    Profile,
    Smile,
    Normal
} from '../assets/images/index'

const UseNavbar = () => {
    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
        history.push('/')
    }

    const profileDropdownContent = (
        <>
            <ProfileCard
                profileImage={Profile}
                username="Pushpa"
                dropdown
            />
            <ProfileCard
                profileImage={Weird}
                username="Shammy"
                dropdown
            />
            <ProfileCard
                profileImage={Smile}
                username="PQ"
                dropdown
            />
            <ProfileCard
                profileImage={Normal}
                username="Subhanga"
                dropdown
            />

            <span style={{ borderBottom: '1px solid grey', marginBottom: '7px' }}>Manage Profiles</span>
            <span>Account</span>
            <span>Help Center</span>
            <span onClick={logoutHandler}>Sign out of Netflix</span>
        </>
    )

    const navLinks = (
        <>
            <NavLink className="inactive" activeClassName="active" to="/browse" exact>Home</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/tv" exact>TV Shows</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/movies" exact>Movies</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/latest" exact>Latest</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/list" exact>My List</NavLink>
        </>
    )

    const profileDropdown = useDropdown(profileDropdownContent,
        { top: '42px', right: '0px', width: '20vh', height: '42vh' })

    const navDropdown = useDropdown(navLinks,
        { top: '15px', width: '100px' })

    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    return (
        <NavBar navigation profileDropdown={profileDropdown}
            navDropdown={navDropdown} />
    )
}

export default UseNavbar