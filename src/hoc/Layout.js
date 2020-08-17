import React from 'react'
import useNavbar from 'hooks/useNavbar'


const Layout = props => {
    const navBar = useNavbar()
    const style = {
        background: '#141414',
        minHeight: '100vh'
    }
    return (
        <div style={style}>
            {navBar}
            {props.children}
        </div>
    )
}

export default Layout