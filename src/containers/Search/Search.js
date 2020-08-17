import React, { useState, useEffect, useRef } from 'react'
import './Search.css'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from 'react-transition-group'

const Search = () => {
    const [searchBox, setSearchBox] = useState(false)
    const [searchIcon, setSearchIcon] = useState(true)

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

    const searchBar = (
        <CSSTransition in={searchBox} classNames="search-animation" timeout={500} unmountOnExit
            onEnter={() => setSearchIcon(false)}
            onExiting={() => setSearchBox(false)}
            onExited={() => setSearchIcon(true)}>
            <div className="Holder">
                <FontAwesomeIcon className="Icon" size="lg" icon={faSearch} />
                <input autoFocus placeholder="Titles, people, genres"
                    onChange={searchTextChangeHandler} value={searchText} />
                {searchText.length > 0 ?
                    <FontAwesomeIcon onClick={clickCrossHandler} size="lg" icon={faTimes} /> : null
                }
            </div>
        </CSSTransition>
    )

    return (
        <div className="SearchBox" onClick={searchClickHandler} ref={searchBoxRef}>
            {searchIcon && <FontAwesomeIcon size="lg" icon={faSearch} />}
            {searchBar}
        </div>
    )
}

export default Search