import React from 'react'
import { useNavigate } from 'react-router-dom';
import { goToApplicationForm, goBack } from '../routes/Coordinator';
import { useGetData } from '../hooks/useGetData'
import { BASE_URL } from '../constants/Url';
import styled from 'styled-components'
import { Botao, MainContainerColumn } from '../styles/Style';

const Card = styled.div`
    width: 320px;
    margin: auto;
    word-wrap: break-word;
    background-color: #F4E7EE;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 10px -5px 71px 0px rgba(135,118,125,0.75);
    -webkit-box-shadow: 10px -5px 71px 0px rgba(135,118,125,0.75);
    -moz-box-shadow: 10px -5px 71px 0px rgba(135,118,125,0.75);
    text-align: center;
`
export const ListTripsPage = () => {
  const navigate = useNavigate();

  const [trips, isLoading, error] = useGetData(`${BASE_URL}trips`)

  const mapOfTrips = trips && trips.trips.map((trip) => {
    return (
      <Card key={trip.id}>
        <p><strong>Nome: </strong> {trip.name}</p>
        <p><strong>Planeta: </strong>{trip.planet}</p>
        <p><strong>Data: </strong>{trip.date}</p>
        <p><strong>Duração: </strong>{trip.durationInDays} dias</p>
        <p><strong>Descrição: </strong>{trip.description}</p>

      </Card>
    )
  })

  return (
    <MainContainerColumn>
      <div>
        <Botao onClick={() => goBack(navigate)}>Voltar</Botao>
      </div>
      <div>
        <Botao onClick={() => goToApplicationForm(navigate)}>Inscrever-se</Botao>
      </div>
      <div>
        {isLoading && <p>Carregando</p>}
        {!isLoading && error && <p>Recarregue a página</p>}
        {!isLoading && trips && mapOfTrips}
        {!isLoading && trips && mapOfTrips.length === 0 && <p>Não há viagens disponíveis!</p>}
      </div>

    </MainContainerColumn>
  )
}
