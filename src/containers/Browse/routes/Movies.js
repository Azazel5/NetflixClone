import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchMoviesByGenre, selectMoviesByGenre } from 'store/reducers/slices/moviesByGenreSlice'
import BrowseContent from '../BrowseContent/BrowseContent'
import LoadingScreen from 'components/StaticPages/LoadingScreen/LoadingScreen'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'

const Movies = () => {
    const {genres, status, error} = useSelector(selectMoviesByGenre)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMoviesByGenre())
        }
    }, [dispatch, status])

    let browseContent
    if (status === 'success') {
        browseContent = <BrowseContent videoSections={genres} />
    } else if (status === 'idle' || status === 'loading') {
        browseContent = <LoadingScreen />
    } else if(status === 'error') {
        browseContent = <ErrorPage errors={error}/>
    }

    return browseContent
}

export default Movies