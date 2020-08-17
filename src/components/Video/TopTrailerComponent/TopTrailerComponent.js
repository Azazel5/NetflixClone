import React from 'react'
import './TopTrailerComponent.css'

const TopTrailerComponent = (props) => {
    const backgroundPicture = {
        backgroundImage: `url(${props.image})`
    }
    return (
        <div className="VideoComponent" style={backgroundPicture}>
            {props.children}
        </div>
    )
}

export default TopTrailerComponent