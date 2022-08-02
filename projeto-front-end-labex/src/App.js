import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import { Router } from './routes/Router';
import Header from './pages/Header';

const MainContainer = styled.div `
  min-height: 80vh;
  background-color: #967b8a;
`
const App = () => {
  return (
    <>
    <Header/>
    <MainContainer>
      <Router/>
    </MainContainer>
    </>
  );
}

export default App;
