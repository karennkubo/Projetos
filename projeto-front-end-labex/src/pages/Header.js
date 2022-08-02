import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import Logo from '../img/logo.png'

const Container = styled.div `
  height: 20vh;
  background-color: #F4E7EE;
  display: flex;
  justify-content: center;
`

const Imagem = styled.img `
  width: 20vh;
`

const Header = () => {
  return (
    <Container>
      <Imagem src={Logo} alt="logo" title='Logo Labex - Karen Kubo'/>
    </Container>
  )
}
export default Header;
