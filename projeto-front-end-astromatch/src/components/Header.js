import logo from '../img/Astromatch.gif'
import React from 'react'
import styled from 'styled-components'

const Gif = styled.img`
    width: 300px;
    border-radius: 20%;
    padding-top: 10px;
`

const Header = () => {
    return (
        <div>
            <Gif src={logo} alt="gif-logo" />
        </div>
    )
}

export default Header;