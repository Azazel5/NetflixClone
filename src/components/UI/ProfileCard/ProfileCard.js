import React from 'react'
import './ProfileCard.css'

const ProfileCard = props => {
    return (
        <div className="ProfileCard" onClick={props.onClick}>
            <img src={props.profileImage} alt="profile" />
            <span>{props.username}</span>
        </div>
    )
}

export default ProfileCard