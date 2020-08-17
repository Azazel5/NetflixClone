import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import BrowseContent from '../BrowseContent/BrowseContent'
import ErrorPage from 'components/StaticPages/ErrorPage/ErrorPage'
import { fetchTrending, selectAllTrendingVideos, selectTrendingError } from 'store/reducers/slices/trendingSlice'
import { fetchTopRated, selectAllTopRatedVideos, selectTopRatedError } from 'store/reducers/slices/topratedSlice'
import { fetchNetflixOriginals, selectAllNetflixOriginals, selectNetflixError } from 'store/reducers/slices/netflixOriginalsSlice'

const Home = () => {
    const trendingVideos = useSelector(selectAllTrendingVideos)
    const topRatedVideos = useSelector(selectAllTopRatedVideos)
    const netflixOriginals = useSelector(selectAllNetflixOriginals)

    const trendingError = useSelector(selectTrendingError)
    const topRatedError = useSelector(selectTopRatedError)
    const netflixError = useSelector(selectNetflixError)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTrending())
        dispatch(fetchTopRated())
        dispatch(fetchNetflixOriginals())
    }, [dispatch])


    let videoSections = []
    let component 
    if (!trendingError && !topRatedError && !netflixError) {
        videoSections.push({ title: "Trending", videos: trendingVideos })
        videoSections.push({ title: "Top Rated", videos: topRatedVideos })
        videoSections.push({ title: "Netflix Originals", videos: netflixOriginals })
        component = <BrowseContent videoSections={videoSections} />
    } else {
        component = (
            <ErrorPage errors={[trendingError, topRatedError, netflixError]} />
        )
    }

    return component
}

export default Home