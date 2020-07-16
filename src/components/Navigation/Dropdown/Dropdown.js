import React from 'react'
import './Dropdown.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


const dropdown = (props) => {
    console.log(props.dropdownOpen)
    return (
        <div className="Dropdown">
            <FontAwesomeIcon 
                onMouseOver={props.dropdownOpenHandler} 
                onMouseLeave={props.dropDownCloseHandler}
                size="lg"
                icon={faAngleDown} 
            />
        </div>
    )
}

export default dropdown