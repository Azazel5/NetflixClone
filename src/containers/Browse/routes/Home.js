import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import BrowseContent from '../BrowseContent/BrowseContent'
import { fetchTrending, selectAllTrendingVideos } from '../../../store/reducers/slices/trendingSlice'
import { fetchTopRated, selectAllTopRatedVideos } from '../../../store/reducers/slices/topratedSlice'
import { fetchNetflixOriginals, selectAllNetflixOriginals } from '../../../store/reducers/slices/netflixOriginalsSlice'

const Home = () => {
    const trendingVideos = useSelector(selectAllTrendingVideos)
    const topRatedVideos = useSelector(selectAllTopRatedVideos)
    const netflixOriginals = useSelector(selectAllNetflixOriginals)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTrending())
        dispatch(fetchTopRated())
        dispatch(fetchNetflixOriginals())
    }, [dispatch])


    let videoSections = []
    videoSections.push({ title: "Trending", videos: trendingVideos })
    videoSections.push({ title: "Top Rated", videos: topRatedVideos })
    videoSections.push({ title: "Netflix Originals", videos: netflixOriginals })
    return <BrowseContent videoSections={videoSections} />
}

export default Home