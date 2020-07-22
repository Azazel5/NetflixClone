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
        logoutHandler, highlightedVideo,
        trending, selectedMovie, carouselItemHoverHandler,
        topRated
    } = props
    const destructuredHighlight = highlightedVideo[0] ? highlightedVideo[0] : null
    const imageUrl = destructuredHighlight ? `https://image.tmdb.org/t/p/original/${destructuredHighlight.poster_path}` : null

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

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <Video image={imageUrl}>
                <NavBar
                    navigation location={location} logoutHandler={logoutHandler}
                    dropdown={dropdown} handlers={handlers} />
                <div className="TextsAndButtons">
                    <div className="verticalItem">
                        <h3>{destructuredHighlight ? destructuredHighlight.name : null}</h3>
                        <span>{destructuredHighlight ? destructuredHighlight.overview : null}</span>
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

            <VideoCarousel
                carouselName="Trending"
                carouselVideo={trending}
                carouselItemHoverHandler={carouselItemHoverHandler}
                selectedMovie={selectedMovie}
            />

            <VideoCarousel
                carouselName="Top Rated"
                carouselVideo={topRated}
                carouselItemHoverHandler={carouselItemHoverHandler}
                selectedMovie={selectedMovie}
            />
        </div>
    )
}

export default BrowseContent