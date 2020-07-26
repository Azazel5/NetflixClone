import React from 'react'
import Modal from 'react-modal'
import NetflixLogo from '../../../assets/images/netflix.png'
import ProfileCard from '../../UI/ProfileCard/ProfileCard'
import './ProfileModal.css'

import {
    Weird,
    Profile,
    Smile,
    Normal
} from '../../../assets/images/index'


Modal.setAppElement('#root');

const modalStyles = {
    content: {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: '#141414',
        border: '',
        borderRadius: '',
        padding: 0
    }
}

const profileModal = props => {
    const {modalOpen, profileClickHandler} = props 
    
    return (
        <Modal
            isOpen={modalOpen}
            contentLabel="Modal is open"
            style={modalStyles}
            shouldCloseOnEsc={false}
        >
            <img style={{ height: '45px', width: '140px', marginLeft: '20px', padding: '8px' }} src={NetflixLogo} alt="Logo" />
            <div className="ProfileDiv">
                <h1 style={{ color: 'rgb(255, 255, 255)', fontWeight: 'lighter', fontSize: '3.5vw' }}>
                    Who's watching?
            </h1>

                <div className="horizontalComp">
                    <ProfileCard profileImage={Profile} username="Pushpa" onClick={profileClickHandler} />
                    <ProfileCard profileImage={Weird} username="Shammy" onClick={profileClickHandler} />
                    <ProfileCard profileImage={Smile} username="PQ" onClick={profileClickHandler} />
                    <ProfileCard profileImage={Normal} username="Subhanga" onClick={profileClickHandler} />
                </div>

                <button className={"ProfileButton"}>
                    MANAGE PROFILES 
                </button>
            </div>
        </Modal>

    )
}

export default profileModal