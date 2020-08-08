import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchLatestVideos, selectLatestVideos, selectLatestVideoStatus } from '../../../store/reducers/slices/latestVideoSlice'
import BrowseContent from '../BrowseContent/BrowseContent'
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen'

const LatestVideo = () => {
    const latestVideos = useSelector(selectLatestVideos)
    const latestVideoStatus = useSelector(selectLatestVideoStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (latestVideoStatus === 'idle') {
            dispatch(fetchLatestVideos())
        }
    }, [dispatch, latestVideoStatus])

    let browseContent
    if (latestVideoStatus === 'success') {
        browseContent = <BrowseContent videoSections={latestVideos} />
    } else if (latestVideoStatus === 'idle' || latestVideoStatus === 'loading') {
        browseContent = <LoadingScreen />
    }

    return browseContent
}

export default LatestVideo