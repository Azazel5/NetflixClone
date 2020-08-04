import React, { useState, useEffect, useRef } from 'react'
import './Search.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = props => {
    const [searchBox, setSearchBox] = useState(false)
    const searchBoxRef = useRef()

    useEffect(() => {
        document.addEventListener('mousedown', outsideSearchClickListener, false)
        return () => {
            document.removeEventListener('mousedown', outsideSearchClickListener, false)
        }
    }, [])

    const searchClickHandler = () => {
        setSearchBox(true)
    }

    const outsideSearchClickListener = event => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setSearchBox(false)
        }
    }

    let searchBar
    let boxHeight
    if (!searchBox) {
        searchBar = <FontAwesomeIcon size="lg" icon={faSearch} />
    } else {
        searchBar = (
            <div className="Holder scale-up-hor-right">
                <FontAwesomeIcon className="Icon" size="lg" icon={faSearch} />
                <input autoFocus placeholder="Titles, peopls, genres" />
            </div>
        )
        boxHeight = { height: '80%', width: '250px' }
    }

    return (
        <div className="SearchBox" style={boxHeight} onClick={searchClickHandler} ref={searchBoxRef}>
            {searchBar}
        </div>
    )
}

export default Search