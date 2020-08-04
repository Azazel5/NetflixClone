import React, { useState, useContext } from 'react'

import NavBar from '../components/Navigation/NavBar/NavBar'
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from '../context/Authentication'

const UseNavbar = () => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
        history.push('/')
    }

    const handlers = {
        iconHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                iconHovered: true,
            }))
        },

        iconHoveredOutHandler: () => {
            setTimeout(() => {
                setDropdown(prevDropdown => ({
                    ...prevDropdown,
                    iconHovered: false,
                }))
            }, 600)
        },

        floatingBoxHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: true,
            }))
        },

        floatingBoxHoveredOutHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: false,
            }))
        },
    }


    return (
        <NavBar
            navigation logoutHandler={logoutHandler}
            dropdown={dropdown} handlers={handlers} />
    )
}

export default UseNavbar