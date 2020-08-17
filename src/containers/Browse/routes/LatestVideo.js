import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchLatestVideos, selectLatestVideos } from 'store/reducers/slices/latestVideoSlice'
import BrowseContent from '../BrowseContent/BrowseContent'
import LoadingScreen from 'components/StaticPages/LoadingScreen/LoadingScreen'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'

const LatestVideo = () => {
    const { latestVideos, status, error } = useSelector(selectLatestVideos)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLatestVideos())
        }
    }, [dispatch, status])

    let browseContent
    if (status === 'success') {
        browseContent = <BrowseContent videoSections={latestVideos} />
    } else if (status === 'idle' || status === 'loading') {
        browseContent = <LoadingScreen />
    } else if (status === 'error') {
        browseContent = <ErrorPage errors={error} />
    }

    return browseContent
}

export default LatestVideo