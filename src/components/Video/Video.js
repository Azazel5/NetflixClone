import React from 'react'
import './Video.css'

const video = (props) => {
    return (
        <div className="VideoComponent">
            {props.children}
        </div>
    )
}

export default video