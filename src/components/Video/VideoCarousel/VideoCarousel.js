import React from 'react'
import './VideoCarousel.css'

import VideoCard from '../VideoCard/VideoCard'

const videoCarousel = props => {
    const { carouselVideo, selectedMovie, carouselName } = props
    const videoCards = carouselVideo.map(item => {
        const mediaType = item.media_type

        return <div className="item" key={item.id}
            onMouseEnter={() => props.carouselItemHoverHandler(item.id, mediaType ? mediaType : null)}>
            <VideoCard
                name={item.name ? item.name : item.title}
                vote_average={item.vote_average}
                image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                selectedMovie={selectedMovie}
                normal
            />
        </div>
    })

    return (
        <>
            <div className="VideoCarousel">
                <h4>{carouselName}</h4>
                <div className="items">
                    {videoCards}
                </div>
            </div >
        </>
    )
}

export default videoCarousel