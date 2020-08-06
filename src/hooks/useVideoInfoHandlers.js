import { useState, useCallback } from 'react'

import { mediaTypeToVideoDetailTransformation } from '../utils/transformations'
import { isMobile } from 'react-device-detect'

// A custom hook which sets all VideoCard/Carousel click/hover behavior 
const UseVideoInfoHandlers = () => {
    const [videoInfo, setVideoInfo] = useState()
    const [detailModal, setDetailModal] = useState(false)

    const cardClickHandler = useCallback((videoId, mediaType) => {
        if (!isMobile) {
            setDetailModal(true)
        } else {
            mediaTypeToVideoDetailTransformation(videoId, mediaType)
                .then(data => {
                    setVideoInfo(data)
                    setDetailModal(true)
                })
        }
    }, [])

    const cardHoverHandler = useCallback((videoId, mediaType) => {
        mediaTypeToVideoDetailTransformation(videoId, mediaType)
            .then(data => setVideoInfo(data))
    }, [])

    const closeModalHandler = useCallback(() => {
        setDetailModal(false)
    }, [])

    return [videoInfo, detailModal, cardClickHandler, cardHoverHandler, closeModalHandler]
}

export default UseVideoInfoHandlers