import React from 'react'
import { useNavigate } from 'react-router-dom'
import { goToListTripsPage, goToLogin } from '../routes/Coordinator';
import { Botao, MainContainer } from '../styles/Style';
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Botao onClick={() => goToLogin(navigate)}>Login</Botao>
      <Botao onClick={() => goToListTripsPage(navigate)}>Viagens</Botao>
    </MainContainer>

  )
}
