import React, { useState } from 'react'

import Dropdown from 'components/Navigation/Dropdown/Dropdown'

const UseDropDown = (content, boxSizing) => {
    const [dropdown, setDropdown] = useState({
        iconHovered: false,
        floatingBoxHovered: false
    })

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

        onItemClickCloseBoxHandler: () => {
            setDropdown(false)
        }
    }

    return (
        <Dropdown
            dropdown={dropdown} content={content}
            {...handlers} boxSizing={boxSizing}
        />
    )
}

export default UseDropDown