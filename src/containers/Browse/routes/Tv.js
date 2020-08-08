import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchTvShowsByGenres, selectTvByGenre, selectTvByGenreStatus } from '../../../store/reducers/slices/tvByGenreSlice'
import BrowseContent from '../BrowseContent/BrowseContent'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'

const Tv = () => {
    const tvByGenre = useSelector(selectTvByGenre)
    const tvByGenreStatus = useSelector(selectTvByGenreStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (tvByGenreStatus === 'idle') {
            dispatch(fetchTvShowsByGenres())
        }
    }, [dispatch, tvByGenreStatus])

    let browseContent
    if (tvByGenreStatus === 'success') {
        browseContent = (
            <BrowseContent videoSections={tvByGenre} />
        )
    } else if (tvByGenreStatus === 'idle' || tvByGenreStatus === 'loading') {
        browseContent = <LoadingScreen />
    }
    return browseContent
}

export default Tv