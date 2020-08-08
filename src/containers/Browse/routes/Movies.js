import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchMoviesByGenre, selectMoviesByGenre, selectMovieByGenreStatus } from '../../../store/reducers/slices/moviesByGenreSlice'
import BrowseContent from '../BrowseContent/BrowseContent'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'

const Movies = () => {
    const moviesByGenre = useSelector(selectMoviesByGenre)
    const movieByGenreStatus = useSelector(selectMovieByGenreStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (movieByGenreStatus === 'idle') {
            dispatch(fetchMoviesByGenre())
        }
    }, [dispatch, movieByGenreStatus])

    let browseContent
    if (movieByGenreStatus === 'success') {
        browseContent = <BrowseContent videoSections={moviesByGenre} />

    } else if (movieByGenreStatus === 'idle' || movieByGenreStatus === 'loading') {
        browseContent = <LoadingScreen />
    }

    return browseContent
}

export default Movies