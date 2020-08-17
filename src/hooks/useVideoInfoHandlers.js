import { useState, useCallback } from 'react'

import { mediaTypeToVideoDetailTransformation } from 'utils/transformations'
import { isMobile } from 'react-device-detect'

// A custom hook which sets all VideoCard/Carousel click/hover behavior 
const UseVideoInfoHandlers = () => {
    const [videoInfo, setVideoInfo] = useState()
    const [videoInfoError, setVideoInfoError] = useState(null)
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
                .catch(error => {
                    setVideoInfoError(error)
                })
        }
    }, [])

    const cardHoverHandler = useCallback((videoId, mediaType) => {
        mediaTypeToVideoDetailTransformation(videoId, mediaType)
            .then(data => {
                setVideoInfo(data)
            })
            .catch(error => {
                setVideoInfoError(error)
            })
    }, [])

    const closeModalHandler = useCallback(() => {
        setDetailModal(false)
    }, [])

    return [videoInfo, videoInfoError, detailModal, cardClickHandler, cardHoverHandler, closeModalHandler]
}

export default UseVideoInfoHandlers