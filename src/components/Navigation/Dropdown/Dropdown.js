import React from 'react'
import './Dropdown.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = props => {
    const {
        iconHoveredInHandler, iconHoveredOutHandler, dropdown,
        floatingBoxHoveredInHandler, floatingBoxHoveredOutHandler, content,
        boxSizing, onItemClickCloseBoxHandler
    } = props

    const { iconHovered, floatingBoxHovered } = dropdown
    return (
        <div className="Dropdown">
            <FontAwesomeIcon
                size="lg"
                icon={faAngleDown}
                color="white"
                onMouseOver={iconHoveredInHandler}
                onMouseLeave={iconHoveredOutHandler}
            />

            {(iconHovered || floatingBoxHovered) && (
                <div className="FloatingBox" style={boxSizing}
                    onMouseOver={floatingBoxHoveredInHandler}
                    onMouseLeave={floatingBoxHoveredOutHandler}
                    onClick={onItemClickCloseBoxHandler}
                >
                    {content}
                </div>)}
        </div>
    )
}

export default Dropdown