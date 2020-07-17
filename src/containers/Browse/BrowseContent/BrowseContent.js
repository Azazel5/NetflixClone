import React, {useState} from 'react'
import './BrowseContent.css'
import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'

const BrowseContent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const dropdownOpenHandler = () => {
        setDropdownOpen(true)
    }

    const dropdownCloseHandler = () => {
        setDropdownOpen(false)
    }

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <NavBar 
                navigation location={location} logoutHandler={props.logoutHandler}
                dropdownOpen={dropdownOpen} dropdownOpenHandler={dropdownOpenHandler}
                dropdownCloseHandler={dropdownCloseHandler}
            />
        </div>
    )
}

export default BrowseContent