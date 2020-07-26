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
    const { logoutHandler, videos } = props

    const [firstVideo, ...remainingVideos] = videos
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

    const videoDetailRequest = async (videoId, mediaType) => {
        let requestURL;
        if (mediaType === 'movie' || !mediaType) {
            requestURL = `movie/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        } else if (mediaType === 'tv') {
            requestURL = `tv/${videoId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
        }
    
        const response = await axios.get(requestURL)
        setVideoInfo(response.data )
    }

    const carouselHoverHandler = (videoId, mediaType) => {
        videoDetailRequest(videoId, mediaType)
    }

    const carouselClickHandler = () => {
        setVideoDetailModal(true)
    }

    const closeModalHandler = () => {
        setVideoDetailModal(false)
    }

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
                                height="38px"
                                width="108px"
                                textColor="rgb(24, 24, 24)"
                                playButton
                                image
                                icon={faPlay}
                                hovered>
                                Play
                             </Button>

                            <Button
                                backgroundColor="rgba(133, 133, 133, 0.6)"
                                height="38px"
                                width="138px"
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
                <VideoCarousel
                    carouselName="Trending"
                    carouselVideo={remainingVideos}
                    carouselClickHandler={carouselClickHandler}
                    carouselHoverHandler={carouselHoverHandler}
                    videoInfo={videoInfo}
                    videoDetailModal={videoDetailModal}
                    closeModalHandler={closeModalHandler}
                />
            </div>

        </div>
    )
}



export default BrowseContent