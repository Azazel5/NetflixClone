import React from 'react'
import './VideoCard.css'
import { getSeasonsOrMovieLength } from '../../../utils/time'

const videoCard = (props) => {
    const { image, genres, runtime, seasons, vote_average, netflixOriginalCard } = props

    const classes = []

    // Setting different responsive sizes for netflix orignal card
    if(!netflixOriginalCard) {
        classes.push("VideoCard")
    } else {
        classes.push("NetflixOriginalCard")
    }
    
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    let timeSpan = getSeasonsOrMovieLength(seasons, runtime)
    const genreList = genres && genres.map((genre, index) => (
        <span key={genre.id}>
            {genre.name} {index !== genres.length - 1 ? '●' : null} &nbsp;
        </span>
    ))

    return (
        <div className={classes.join(' ')} style={styles}>
            <div className="VideoInfo">
                <h6>{props.name}</h6>
                <div className="horizontalStyle">
                    <span>{vote_average} &nbsp;</span>
                    {timeSpan}
                </div>
                <div className="horizontalStyle">
                    {genreList}
                </div>
            </div>
        </div>
    )
}

export default React.memo(videoCard)