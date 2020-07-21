import React from 'react'
import './VideoCarousel.css'

import VideoCard from '../VideoCard/VideoCard'

const videoCarousel = props => {
    const { trending, selectedMovie } = props
    const videoCards = trending.map(item => {
        return <div className="item" key={item.id}
            onMouseEnter={() => props.carouselItemHoverHandler(item.id, item.media_type)}>
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
        <div className="VideoCarousel">
            <h4>Trending</h4>
            <div className="items">
                {videoCards}
            </div>
        </div >
    )
}

export default videoCarousel