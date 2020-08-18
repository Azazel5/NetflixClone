import React from 'react'
import './CircularSoundButton.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const circularSoundButton = props => {
    const { topTrailerSoundOn, topTrailerSoundButtonClickHandler } = props
    return (
        <button className="RoundButton" onClick={topTrailerSoundButtonClickHandler}>
            <FontAwesomeIcon icon={topTrailerSoundOn ? faVolumeUp : faVolumeMute} />
        </button>
    )
}

export default circularSoundButton