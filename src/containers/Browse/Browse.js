import React, { useState, useContext } from 'react'
import './Browse.css'
import Modal from 'react-modal'
import NetflixLogo from '../../assets/images/netflix.png'
import ProfileCard from '../../components/UI/ProfileCard/ProfileCard'
import {AuthenticationContext} from '../../context/Authentication'
import {
    Weird, 
    Profile, 
    Smile, 
    Smirk, 
    Normal
} from '../../assets/images/index'

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

/**
 * Remember: the component where you want to use the context is the one which you wrap
 * with the provider.
 */
const Browse = props => { 
    const initialState = localStorage.getItem('profileSelected') ? false: true 
    const [modal, setModal] = useState(initialState)
    const authContext = useContext(AuthenticationContext)

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    const logoutHandler = () => {
        localStorage.removeItem('profileSelected')
        authContext.logout()
    }

    return (
        <div className="BrowseDiv">
            <Modal
                isOpen={modal}
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
                        <ProfileCard profileImage={Weird} username="Shammy" onClick={profileClickHandler}/>
                        <ProfileCard profileImage={Smile} username="PQ" onClick={profileClickHandler}/>
                        <ProfileCard profileImage={Smirk} username="Raj" onClick={profileClickHandler}/>
                        <ProfileCard profileImage={Normal} username="Subhanga" onClick={profileClickHandler}/>
                    </div>
                </div>
            </Modal>

            <h1>Browse</h1>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Browse