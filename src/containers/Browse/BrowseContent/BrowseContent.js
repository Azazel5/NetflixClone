import React, { useState } from 'react'
import './BrowseContent.css'
import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'

const BrowseContent = (props) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false, 
        floatingBoxHovered: false 
    })

    const handlers = {
        iconHoveredInHandler:  () => {
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

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <NavBar
                navigation location={location} logoutHandler={props.logoutHandler}
                dropdown={dropdown} handlers={handlers}
            />
        </div>
    )
}

export default BrowseContent