import React from 'react'
import './VideoCard.css'
import { convertTimeToHourMinuteFormat } from '../../../utils/time'

const videoCard = (props) => {
    const { image, normal, genres, runtime, seasons, vote_average } = props
    const seasonLength = seasons && seasons.length
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover'
    }

    let timeSpan
    if (runtime) {
        timeSpan = <span>{convertTimeToHourMinuteFormat(runtime)}</span>
    } else if (seasons) {
        timeSpan = <span>{seasonLength > 1 ? `${seasonLength} Seasons` : `${seasonLength} Season`}</span>
    }

    if (normal) {
        styles['height'] = '140px'
        styles['width'] = '230px'
    }

    const genreList = genres && genres.map((genre, index) => (
        <span key={genre.id}>
            {genre.name} {index !== genres.length - 1 ? '●' : null} &nbsp;
        </span>
    ))

    return (
        <div className="VideoCard" style={styles}>
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