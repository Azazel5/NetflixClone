import React from 'react'
import './VideoModal.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import { getSeasonsOrMovieLength } from '../../../utils/time'
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '../../UI/Button/Button'

Modal.setAppElement('#root');

const modalStyles = {
    content: {
        top: 0,
        left: 0,
        height: '60%',
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
    const voteAverage = videoInfo.vote_average * 10
    const voteStyle = { color: voteAverage > 49 ? '#46d369' : 'red' }
    const videoTime = getSeasonsOrMovieLength(videoInfo.seasons, videoInfo.runtime)

    const imageUrl = `https://image.tmdb.org/t/p/original/${videoInfo.backdrop_path}`
    return (
        <Modal
            isOpen={videoDetailModal}
            contentLabel="Modal is open"
            style={modalStyles}
            shouldCloseOnOverlayClick
            onRequestClose={closeModalHandler}
        >
            <div className="VideoDetailSection" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
                <FontAwesomeIcon onClick={closeModalHandler} style={{ color: 'white', float: 'right', padding: '14px', cursor: 'pointer' }}
                    size="2x"
                    icon={faTimes}
                />
                <div className="shadowedSection">
                    <h1>{videoInfo.title || videoInfo.name}</h1>
                    <div className="horizontalStyles">
                        <span style={voteStyle}>{`Rating: ${voteAverage}%`} &nbsp;</span>
                        <span>{(videoInfo.release_date || videoInfo.first_air_date).substring(0, 4)} &nbsp;</span>
                        {videoTime}
                    </div>
                    <div>{videoInfo.overview}</div>
                    <div className="horizontalStyles">
                        <Button
                            backgroundColor="#fff"
                            height="38px"
                            width="108px"
                            textColor="rgb(24, 24, 24)"
                            playButton
                            image
                            icon={faPlay}
                            hovered>
                            Play
                             </Button>

                        <Button
                            backgroundColor="rgba(133, 133, 133, 0.6)"
                            height="38px"
                            width="138px"
                            textColor="white"
                            playButton
                            image
                            icon={faPlus}
                            hovered>
                            My List
                             </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default VideoModal