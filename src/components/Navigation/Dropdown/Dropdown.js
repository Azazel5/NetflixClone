import React from 'react'
import './Dropdown.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";



const Dropdown = (props) => {
    const {
        iconHoveredInHandler, iconHoveredOutHandler, dropdown, floatingBoxHoveredInHandler,
        floatingBoxHoveredOutHandler, content
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
                {content}
            </div>}
        </div>
    )
}

export default Dropdown