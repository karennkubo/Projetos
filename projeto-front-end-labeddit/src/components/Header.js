import React from 'react'
import { HeaderDiv, Image } from '../styles/Header-style'
import Logo from '../assets/Logo.gif'
import Mail from '../assets/mail.gif'
const Header =()=> {
  return (
    <HeaderDiv>
      <Image src={Logo} alt="LabEddit Logo" />
      <a href='mailto:karennckubo@gmail.com' target='_blank' rel='noreferrer'><Image src={Mail} alt="Link to e-mail" /></a>
    </HeaderDiv>
  )
}

export default Header;
