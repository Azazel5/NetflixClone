import React from 'react'
import './VideoCard.css'
import { getSeasonsOrMovieLength } from '../../../utils/time'

const videoCard = (props) => {
    const { 
        name, poster_path, genres, runtime, seasons,
        vote_average, netflixOriginalCard 
    } = props

    const classes = []
    const image = `url(https://image.tmdb.org/t/p/w500/${poster_path})`
    // Setting different responsive sizes for netflix orignal card
    if(!netflixOriginalCard) {
        classes.push("VideoCard")
    } else {
        classes.push("NetflixOriginalCard")
    }
    
    const styles = {
        backgroundImage: image,
        backgroundSize: 'cover',
    }

    let timeSpan = getSeasonsOrMovieLength(seasons, runtime)
    const genreList = genres && genres.map((genre, index) => (
        <span key={genre.id}>
            {genre.name} {index !== genres.length - 1 ? '●' : null} &nbsp;
        </span>
    ))

    return (
        <div className={classes.join(' ')} style={styles}>
            {genreList ? <div className="VideoInfo">
                <h6>{name}</h6>
                <div className="horizontalStyle">
                    <span>{vote_average} &nbsp;</span>
                    {timeSpan}
                </div>
                <div className="horizontalStyle">
                    {genreList}
                </div>
            </div>: null}
        </div>
    )
}

export default React.memo(videoCard)