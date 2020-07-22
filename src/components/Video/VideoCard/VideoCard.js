import React from 'react'
import './VideoCard.css'

const videoCard = (props) => {
    const { image, normal, selectedMovie } = props

    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover'
    }

    if (normal) {
        styles['height'] = '140px'
        styles['width'] = '230px'
    }

    const genres = selectedMovie && selectedMovie.genres &&
        selectedMovie.genres.map((genre, index) => (
            <span key={genre.id}>
                {genre.name} {index !== selectedMovie.genres.length - 1 ? '●': null} &nbsp;
            </span>
        ))

    return (
        <div className="VideoCard" style={styles}>
            <div className="VideoInfo">
                <h6>{props.name}</h6>
                <span>{props.vote_average}</span>
                <div className="genres">
                    {genres}
                </div>
            </div>
        </div>
    )
}

export default videoCard