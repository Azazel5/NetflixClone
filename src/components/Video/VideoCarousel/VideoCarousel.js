import React from 'react'
import './VideoCarousel.css'

import VideoCard from '../VideoCard/VideoCard'
import VideoModal from '../../Modals/VideoModal/VideoModal'
import { isMobile } from 'react-device-detect';


const videoCarousel = props => {
    const {
        carouselVideo, carouselName,
        carouselHoverHandler, videoInfo,
        carouselClickHandler, videoDetailModal,
        closeModalHandler, mobileCarouselClickHandler
    } = props

    const isNetflixOriginalCard = carouselName === "Netflix Originals" ? true: false
    const classes = []

    // Setting different transition styles for the netflix original card 
    if(!isNetflixOriginalCard) {
        classes.push("item")
    } else {
        classes.push("netflix-item")
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
        let mediaType
        if(item.media_type) {
            mediaType = item.media_type
        } else {
            if(item.first_air_date) {
                mediaType = 'tv'
            } else if(item.release_date) {
                mediaType = 'movie'
            }
        }

        let extraInfo = {}
        if (!isMobile) {
            if (videoInfo && videoInfo.id === item.id) {
                extraInfo['genres'] = videoInfo.genres
                if (videoInfo.runtime) {
                    extraInfo['runtime'] = videoInfo.runtime
                } else if (videoInfo.seasons) {
                    extraInfo['seasons'] = videoInfo.seasons
                }
            }
        }

        return <div className={classes.join(' ')} key={item.id}
            onClick={() => isMobile ? mobileCarouselClickHandler(item.id, mediaType) : carouselClickHandler()}
            onMouseEnter={() => !isMobile && carouselHoverHandler(item.id, mediaType)}>
            <VideoCard
                name={item.name || item.title}
                vote_average={item.vote_average}
                image={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                netflixOriginalCard={isNetflixOriginalCard}
                {...extraInfo}
            />
        </div>
    })

    let detailModalComponent
    if (videoDetailModal) {
        detailModalComponent = (
            <VideoModal
                videoDetailModal={videoDetailModal}
                closeModalHandler={closeModalHandler}
                videoInfo={videoInfo}
            />
        )
    }

    return (
        <>
            <div className="VideoCarousel">
                <h4>{carouselName}</h4>
                <div className="items">
                    {videoCards}
                </div>
                {detailModalComponent}
            </div >
        </>
    )
}

export default videoCarousel