import React, { useState } from 'react'
import './BrowseContent.css'
import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import Video from '../../../components/Video/Video'

const BrowseContent = (props) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

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

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <Video>
                <NavBar
                    navigation location={location} logoutHandler={props.logoutHandler}
                    dropdown={dropdown} handlers={handlers} />
                <div className="TextsAndButtons">
                    <div className="verticalItem">
                        <h3>Watch Season 1 now</h3>
                    </div>

                    <div className="verticalItem">
                        Button
                    </div>
                </div>
            </Video>
        </div>
    )
}

export default BrowseContent