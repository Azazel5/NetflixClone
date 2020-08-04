import React from 'react'
import './Dropdown.css'

import ProfileCard from '../../UI/ProfileCard/ProfileCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import {
    Weird,
    Profile,
    Smile,
    Normal
} from '../../../assets/images/index'

const Dropdown = (props) => {
    const {
        iconHoveredInHandler, iconHoveredOutHandler, dropdown, floatingBoxHoveredInHandler,
        floatingBoxHoveredOutHandler, profileClickHandler, logoutHandler
    } = props

    const { iconHovered, floatingBoxHovered } = dropdown

    return (
        <div className="Dropdown">
            <FontAwesomeIcon
                size="lg"
                icon={faAngleDown}
                onMouseOver={iconHoveredInHandler}
                onMouseLeave={iconHoveredOutHandler}
            />

            {(iconHovered || floatingBoxHovered) && <div className="FloatingBox"
                onMouseOver={floatingBoxHoveredInHandler}
                onMouseLeave={floatingBoxHoveredOutHandler}
            >
                <ProfileCard
                    profileImage={Profile}
                    username="Pushpa"
                    onClick={profileClickHandler}
                    dropdown
                />
                <ProfileCard
                    profileImage={Weird}
                    username="Shammy"
                    onClick={profileClickHandler}
                    dropdown
                />
                <ProfileCard
                    profileImage={Smile}
                    username="PQ"
                    onClick={profileClickHandler}
                    dropdown
                />
                <ProfileCard
                    profileImage={Normal}
                    username="Subhanga"
                    onClick={profileClickHandler}
                    dropdown
                />

                <span style={{ borderBottom: '1px solid grey', marginBottom: '7px' }}>Manage Profiles</span>
                <span>Account</span>
                <span>Help Center</span>
                <span onClick={logoutHandler}>Sign out of Netflix</span>
            </div>}
        </div>
    )
}

export default Dropdown