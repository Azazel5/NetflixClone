import React, { useState } from 'react'
import './BrowseContent.css'
import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import Video from '../../../components/Video/TopTrailerComponent/Video'
import Button from '../../../components/UI/Button/Button'
import VideoCarousel from '../../../components/Video/VideoCarousel/VideoCarousel'
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const BrowseContent = (props) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

    const {
        logoutHandler, selectedMovie, carouselItemHoverHandler,
        videos
    } = props

    const [firstVideo, ...remainingVideos] = videos.trending.content
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

    const videoCarousels = Object.keys(videos).map(key => {
        let passedVideos = videos[key].content
        const videoType = videos[key].videoType
        if (videoType && videoType === 'Trending') {
            passedVideos = remainingVideos
        }

        return videoType &&
            <VideoCarousel
                key={videos[key].videoType}
                carouselName={videos[key].videoType}
                carouselVideo={passedVideos}
                carouselItemHoverHandler={carouselItemHoverHandler}
                selectedMovie={selectedMovie}
            />
    })

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

            {videoCarousels}

        </div>
    )
}

export default BrowseContent