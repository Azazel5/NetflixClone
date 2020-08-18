import React, { useState, useRef } from 'react'
import './VideoCarousel.css'

import VideoCard from '../VideoCard/VideoCard'
import { buildVideoMetadata } from 'utils/transformations'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { scrollTo } from 'utils/animations'


const VideoCarousel = props => {
    const {
        carouselVideo, carouselName,
        carouselHoverHandler, videoInfo,
        carouselClickHandler
    } = props

    const carouselRef = useRef()
    const [disableScrolling, setDisableScrolling] = useState(false)

    const isNetflixOriginalCard = carouselName === "Netflix Originals" ? true : false
    const itemClass = []
    const itemsClass = []
    // Setting different transition styles for the netflix original card 
    if (!isNetflixOriginalCard) {
        itemClass.push("item")
        itemsClass.push("items")
    } else {
        itemClass.push("netflix-item")
        itemsClass.push("netflix-items")
    }

    const scrollOnAbsoluteButtonClick = scrollOffset => {
        setDisableScrolling(true)
        scrollTo(carouselRef.current, carouselRef.current.scrollLeft + scrollOffset, 1250, () => {
            setDisableScrolling(false)
        })
    }

    /**
     * The mediaType property only exists in the trending API call. For the sake of using the same 
     * function 'videoDetailRequest' for multiple individual API calls, I use this mediaType 
     * variable to judge whether a video is a TV show or a movie. This fails for API calls, such as
     * top rated or netflix originals. Thus, I have created a 'hacky' way of determining that by
     * checking if two properties exist: the first_air_date (only for tv shows) or the release_date
     * (only for movies).
     */
    const videoCards = carouselVideo.map(item => {
        const { mediaType, extraInfo } = buildVideoMetadata(item, videoInfo)
        return (
            item.poster_path && <div className={itemClass.join(' ')} key={item.id}
                onClick={() => carouselClickHandler(item.id, mediaType)}
                onMouseEnter={() => carouselHoverHandler(item.id, mediaType)}>
                <VideoCard
                    name={item.name || item.title}
                    vote_average={item.vote_average}
                    poster_path={item.poster_path}
                    netflixOriginalCard={isNetflixOriginalCard}
                    {...extraInfo}
                />
            </div>
        )
    })

    return (
        <div className="CarouselParent">
            <div className="VideoCarousel" ref={carouselRef}>
                <h4>{carouselName}</h4>
                <div className={itemsClass.join(" ")}>
                    {videoCards}
                </div>
            </div >

            <button
                className="Left NavItem"
                disabled={disableScrolling}
                onClick={() => scrollOnAbsoluteButtonClick(-1250)}>
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
            <button
                className="Right NavItem"
                disabled={disableScrolling}
                onClick={() => scrollOnAbsoluteButtonClick(1250)}>
                <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </button>
        </div>
    )
}

export default React.memo(VideoCarousel)