import React, { useState } from 'react'
import './BrowseContent.css'
import NavBar from '../../../components/Navigation/NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import Video from '../../../components/Video/TopTrailerComponent/Video'
import Button from '../../../components/UI/Button/Button'
import VideoCarousel from '../../../components/Video/VideoCarousel/VideoCarousel'
import {faPlay, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

const BrowseContent = (props) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

    const {logoutHandler, trending} = props

    const handlers = {
        iconHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                iconHovered: true,
            }))
        },

        iconHoveredOutHandler: () => {
            setTimeout(() => {
                setDropdown(prevDropdown => ({
                    ...prevDropdown,
                    iconHovered: false,
                }))
            }, 600)
        },

        floatingBoxHoveredInHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: true,
            }))
        },

        floatingBoxHoveredOutHandler: () => {
            setDropdown(prevDropdown => ({
                ...prevDropdown,
                floatingBoxHovered: false,
            }))
        },
    }

    const location = useLocation()
    return (
        <div className="BrowseContent">
            <Video>
                <NavBar
                    navigation location={location} logoutHandler={logoutHandler}
                    dropdown={dropdown} handlers={handlers} />
                <div className="TextsAndButtons">
                    <div className="verticalItem">
                        <h3>Watch Season 1 now</h3>
                        <span>Her powers made her an outcast. A sword will make her a legend. Her people will make her a queen.</span>
                        <div className="horizontalButtonsHolder">
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
                                icon={faInfoCircle}
                                hovered>
                                More Info
                             </Button>
                        </div>
                    </div>

                    <div className="verticalItem">
                        Trailer sound button
                    </div>
                </div>
            </Video>
            
            <VideoCarousel trending={trending}/>
        </div>
    )
}

export default BrowseContent