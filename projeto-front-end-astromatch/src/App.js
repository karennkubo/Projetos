import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { createGlobalStyle } from 'styled-components'
import Home from './components/Home'
import Matches from './components/Matches'
import Header from './components/Header'

// Design
const Global = createGlobalStyle `
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:black;
}  
  `

const AppContainer = styled.div `
  width: 320px;
  display: flex;
  min-height: 600px;
  row-gap: 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  box-shadow: inset 0 0 1em salmon, 0 0 1em pink;
  `

// JS
const App = () => {
  const [pageHome, setPageHome] = useState(true);

  const goToMatches = () => {
    setPageHome(false)
  }

  const goToHome = () => {
    setPageHome(true)
  }

  return (
    <>
    <Global/>
    <AppContainer>
      <Header/>
      {pageHome ? <Home goToMatches={goToMatches}/> : <Matches goToHome={goToHome}/>}
    </AppContainer>
    </>
  );
}


export default App;
