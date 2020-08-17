import React from 'react'
import './VideoModal.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import { getSeasonsOrMovieLength } from 'utils/time'
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/UI/Button/Button'
import useHoverStyleButton from 'hooks/useHoverStyleButton'


if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

// Don't move this to css; it has to be here for the shouldCloseOnOverlay prop to work 
const overlayStyle = {
    overlay: {
        backgroundColor: 'rgba(17,17,17,0.7)'
    }
}

const VideoModal = props => {
    const { videoDetailModal, closeModalHandler, videoInfo } = props
    const [buttonHovered, onButtonHoverHandler] = useHoverStyleButton({
        'playButton': true,
        'plusButton': true
    })

    const {
        vote_average, seasons, runtime,
        backdrop_path, poster_path, title, name,
        release_date, first_air_date,
        overview
    } = videoInfo

    const voteAverage = vote_average * 10
    const voteStyle = { color: voteAverage > 49 ? '#46d369' : 'red' }
    const videoTime = getSeasonsOrMovieLength(seasons, runtime)

    const styles = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path || poster_path}`,
        backgroundSize: 'cover'
    }

    return (
        <Modal
            className="ModalStyles"
            style={overlayStyle}
            isOpen={videoDetailModal}
            contentLabel="Modal is open"
            shouldCloseOnOverlayClick
            onRequestClose={closeModalHandler}
        >
            <div className="VideoDetailSection" style={styles}>
                <FontAwesomeIcon onClick={closeModalHandler} style={{ color: 'white', float: 'right', padding: '14px', cursor: 'pointer' }}
                    size="2x"
                    icon={faTimes}
                />
                <div className="shadowedSection">
                    <h1>{title || name}</h1>
                    <div className="horizontalStyles">
                        <span style={voteStyle}>{`Rating: ${voteAverage}%`} &nbsp;</span>
                        <span>{(release_date || first_air_date).substring(0, 4)} &nbsp;</span>
                        {videoTime}
                    </div>
                    <div className="Overview">{overview}</div>
                    <div className="horizontalStyles">
                        <Button
                            backgroundColor="#fff"
                            textColor="rgb(24, 24, 24)"
                            playButton
                            height="38px"
                            width="138px"
                            image
                            icon={faPlay}
                            onButtonHover={() => onButtonHoverHandler('playButton')}
                            hoverStatus={buttonHovered['playButton']}>
                            Play
                        </Button>

                        <Button
                            backgroundColor="rgba(133, 133, 133, 0.6)"
                            textColor="white"
                            height="38px"
                            width="138px"
                            playButton
                            image
                            icon={faPlus}
                            onButtonHover={() => onButtonHoverHandler('plusButton')}
                            hoverStatus={buttonHovered['plusButton']}>
                            My List
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(VideoModal)