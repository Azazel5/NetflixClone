import { useState } from 'react'

const UseHoverStyleButton = (buttonsObj) => {
    const [buttonHovered, setButtonHovered] = useState(buttonsObj)

    const onButtonHoverHandler = (id) => {
        setButtonHovered(prevHover => ({
            ...prevHover,
            [id]: !prevHover[id]
        }))
    }

    return [buttonHovered, onButtonHoverHandler]
}

export default UseHoverStyleButton