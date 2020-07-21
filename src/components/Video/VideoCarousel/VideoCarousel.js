import React from 'react'
import './VideoCarousel.css'

import VideoCard from '../VideoCard/VideoCard'

const videoCarousel = props => {
    const videoCards = props.trending.map(item => (
        <div className="item" key={item.id}>
            <VideoCard
                image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                normal
            />
        </div>
    ))

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