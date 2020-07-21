import React from 'react'
import './VideoCard.css'

const videoCard = (props) => {
    const {image, normal} = props
    let dimensions = {}
    if(normal) {
        dimensions['height'] = '140px'
        dimensions['width'] = '230px'
    }

    return (
        <div className="VideoCard" style={{height: dimensions['height'], width: dimensions['width']}}>
            <img src={image} alt="videoPreview"/>
        </div>
    )
}

export default videoCard