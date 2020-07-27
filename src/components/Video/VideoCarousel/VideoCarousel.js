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

    const videoCards = carouselVideo.map(item => {
        const mediaType = item.media_type

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

        return <div className="item" key={item.id}
            onClick={() => isMobile ? mobileCarouselClickHandler(item.id, mediaType && mediaType) : carouselClickHandler()}
            onMouseEnter={() => !isMobile && carouselHoverHandler(item.id, mediaType && mediaType)}>
            <VideoCard
                name={item.name || item.title}
                vote_average={item.vote_average}
                image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
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