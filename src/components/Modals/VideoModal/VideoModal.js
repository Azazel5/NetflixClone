import React from 'react'
import './VideoModal.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

Modal.setAppElement('#root');

const modalStyles = {
    content: {
        top: 0,
        left: 0,
        height: '50%',
        width: '100%',
        background: '#141414',
        border: '',
        borderRadius: '',
        padding: 0,
        margin: 'auto'
    },
    overlay: {
        backgroundColor: 'rgba(17,17,17,0.7)'
    }
}

const VideoModal = props => {
    const { videoDetailModal, closeModalHandler, videoInfo } = props
    const imageUrl = `https://image.tmdb.org/t/p/original/${videoInfo.backdrop_path}`
    return (
        <Modal
            isOpen={videoDetailModal}
            contentLabel="Modal is open"
            style={modalStyles}
            shouldCloseOnOverlayClick
            onRequestClose={closeModalHandler}
        >
            <div className="VideoDetailSection" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}}>
                <FontAwesomeIcon onClick={closeModalHandler} style={{ color: 'white', float: 'right', padding: '14px', cursor: 'pointer' }}
                    size="2x"
                    icon={faTimes}
                />
            </div>
        </Modal>
    )
}

export default VideoModal