import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = props => {
    const [searchBox, setSearchBox] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchChanged, setSearchChanged] = useState(false)
    const searchBoxRef = useRef()
    const history = useHistory()

    useEffect(() => {
        document.addEventListener('mousedown', outsideSearchClickListener, false)
        return () => {
            document.removeEventListener('mousedown', outsideSearchClickListener, false)
        }
    }, [])

    useEffect(() => {
        if (searchText.length > 0) {
            history.push({
                pathname: '/search',
                search: `?q=${searchText}`
            })

        } else if (searchChanged && searchText.length === 0) {
            history.replace({ pathname: '/browse' })
        }
    }, [history, searchText, searchChanged])

    const searchClickHandler = () => {
        setSearchBox(true)
    }

    const outsideSearchClickListener = event => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setSearchBox(false)
        }
    }

    const searchTextChangeHandler = event => {
        const textValue = event.target.value
        setSearchText(textValue)
        setSearchChanged(true)
    }

    const clickCrossHandler = () => {
        setSearchText('')
    }

    let searchBar
    let boxHeight
    if (!searchBox) {
        searchBar = <FontAwesomeIcon size="lg" icon={faSearch} />
    } else {
        searchBar = (
            <div className="Holder scale-up-hor-right">
                <FontAwesomeIcon className="Icon" size="lg" icon={faSearch} />
                <input autoFocus placeholder="Titles, peopls, genres"
                    onChange={searchTextChangeHandler} value={searchText} />
                {searchText.length > 0 ?
                    <FontAwesomeIcon onClick={clickCrossHandler} size="lg" icon={faTimes} /> : null
                }
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