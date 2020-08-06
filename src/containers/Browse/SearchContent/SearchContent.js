import React, { useState, useEffect, useCallback } from 'react'
import './SearchContent.css'

import axios from '../../../baseAxios'
import VideoCard from '../../../components/Video/VideoCard/VideoCard'
import { debounce } from 'lodash'

const SearchContent = props => {
    const [searchedVideoList, setSearchedVideoList] = useState([])
    const [loading, setLoading] = useState(true)
    const { searchParam } = props

    const getSearchMovies = async (searchItem) => {
        const movieUrl = `search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        const tvUrl = `search/tv?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1&query=${searchItem}&include_adult=false`

        const responses = await Promise.all(
            [
                axios.get(movieUrl).then(response => response.data.results),
                axios.get(tvUrl).then(response => response.data.results)
            ]
        )

        setSearchedVideoList([...responses[0], ...responses[1]])
        setLoading(false)
    }

    const delayedAPICall = useCallback(debounce(getSearchMovies, 1000), [])

    useEffect(() => {
        delayedAPICall(searchParam)
        return () => {
            delayedAPICall.cancel()
        }
    }, [delayedAPICall, searchParam])

    const compare = (a, b) => {
        if (a.popularity > b.popularity) {
            return -1;
        }
        if (a.popularity < b.popularity) {
            return 1;
        }
        return 0;
    }

    let movieCards
    if (!loading) {
        searchedVideoList.sort(compare)
        movieCards = searchedVideoList.map(video => (
            video.poster_path && <div className="GridItem" key={video.id}>
                <VideoCard
                    name={video.name || video.title}
                    vote_average={video.vote_average}
                    poster_path={video.poster_path}
                    netflixOriginalCard={false}
                />
            </div>
        ))
    }

    return (
        <div className="SearchContent">
            <div className="SearchGrid">
                {movieCards}
            </div>
        </div>
    )
}

export default SearchContent