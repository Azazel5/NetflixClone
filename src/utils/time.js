import React from 'react'

const convertTimeToHourMinuteFormat = timeInHours => {
    var hours = Math.trunc(timeInHours / 60);
    var minutes = timeInHours % 60;
    return `${hours}h ${minutes}m`
}

export const getSeasonsOrMovieLength = (seasons, runtime) => {
    let timeSpan
    if (runtime) {
        timeSpan = <span>{convertTimeToHourMinuteFormat(runtime)}</span>
    } else if (seasons) {
        timeSpan = (
            <span>
                {seasons.length > 1 ? `${seasons.length} Seasons` : `${seasons.length} Season`}
            </span>
        )
    }

    return timeSpan
}