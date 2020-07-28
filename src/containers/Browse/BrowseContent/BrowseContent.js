import React, { useState } from 'react'
import './BrowseContent.css'

import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import Video from '../../../components/Video/TopTrailerComponent/Video'
import Button from '../../../components/UI/Button/Button'
import VideoCarousel from '../../../components/Video/VideoCarousel/VideoCarousel'
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import axios from '../../../baseAxios'

const BrowseContent = (props) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

    const [videoInfo, setVideoInfo] = useState(null)

    const [videoDetailModal, setVideoDetailModal] = useState(false)
    const { logoutHandler, videoSections } = props

    const [firstVideo, ...remainingVideos] = videoSections[0].videos
    const imageUrl = firstVideo ? `https://image.tmdb.org/t/p/original/${firstVideo.poster_path}` : null

    const handlers = {
        iconHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                iconHovered: true,
            }))
        },

        iconHoveredOutHandler: () => {
            setTimeout(() => {
                setDropdown(prevDropdown => ({
                    ...prevDropdown,
                    iconHovered: false,
                }))
            }, 600)
        },

        floatingBoxHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: true,
            }))
        },

        floatingBoxHoveredOutHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: false,
            }))
        },
    }

    const carouselHoverHandler = (videoId, mediaType) => {
        videoDetailRequest(videoId, mediaType)
            .then(data => setVideoInfo(data))
    }

    const carouselClickHandler = () => {
        setVideoDetailModal(true)
    }

    const mobileCarouselClickHandler = (videoId, mediaType) => {
        videoDetailRequest(videoId, mediaType)
            .then(data => {
                setVideoInfo(data)
                setVideoDetailModal(true)
            })        
    }

    const closeModalHandler = () => {
        setVideoDetailModal(false)
    }

    const videoDetailRequest = async (videoId, mediaType) => {
        let requestURL;
        if (mediaType === 'movie') {
            requestURL = `movie/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        } else if (mediaType === 'tv') {
            requestURL = `tv/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        }

        const response = await axios.get(requestURL)
        return response.data
    }

    const carousels = videoSections.map(videoSection => (
        <VideoCarousel
            key={videoSection.title}
            carouselName={videoSection.title}
            carouselVideo={videoSection.title === "Trending" ? remainingVideos : videoSection.videos}
            carouselClickHandler={carouselClickHandler}
            carouselHoverHandler={carouselHoverHandler}
            mobileCarouselClickHandler={mobileCarouselClickHandler}
            videoInfo={videoInfo}
            videoDetailModal={videoDetailModal}
            closeModalHandler={closeModalHandler}
        />
    ))

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <Video image={imageUrl}>
                <NavBar
                    navigation location={location} logoutHandler={logoutHandler}
                    dropdown={dropdown} handlers={handlers} />
                <div className="TextsAndButtons">
                    <div className="verticalItem">
                        <h3>{firstVideo ? (firstVideo.name || firstVideo.title) : null}</h3>
                        <span>{firstVideo ? firstVideo.overview : null}</span>
                        <div className="horizontalButtonsHolder">
                            <Button
                                backgroundColor="#fff"
                                textColor="rgb(24, 24, 24)"
                                playButton
                                image
                                icon={faPlay}
                                hovered>
                                Play
                             </Button>

                            <Button
                                backgroundColor="rgba(133, 133, 133, 0.6)"
                                textColor="white"
                                playButton
                                image
                                icon={faInfoCircle}
                                hovered>
                                More Info
                             </Button>
                        </div>
                    </div>

                    <div className="verticalItem">
                        Trailer sound button
                    </div>
                </div>
            </Video>

            <div className="Carousels">
                {carousels}
            </div>

        </div>
    )
}



export default BrowseContent