import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../constants/Url';
import { goBack, goToCreateTripPage, goToHomePage, goToLogin, goToTripDetailsPage } from '../routes/Coordinator';
import useProtectedPage from '../hooks/useProtectedPage'
import { Botao, MainContainerColumn } from '../styles/Style';
import styled from 'styled-components';

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
`

export const AdminHomePage = () => {
  const navigate = useNavigate();
  useProtectedPage();
  const token = localStorage.getItem("token");
  const headers = { headers: { auth: token } }
  // Array de viagens
  const [trips, setTrips] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Pegando viagens
  const getAllTrips = () => {
    axios
      .get(`${BASE_URL}trips`, headers)
      .then((res) => {
        setTrips(res.data.trips)
      })
      .catch((err) => {
        console.log(err.response)
      })
  };
  useEffect(() => {
    getAllTrips();
  }, []);

  // Removendo viagens
  const removeATrip = (id) => {
    axios
      .delete(`${BASE_URL}trips/${id}`, headers)
      .then((res) => {
        getAllTrips();
      })
      .catch((err) => {
        alert(err.response);
      })
  }

  const allTrips = trips.map((trip) => {
    return (
      <Card key={trip.id}>
        <p><strong>Nome:</strong> {trip.name}</p>
        <div>
        <Botao onClick={() => goToTripDetailsPage(navigate, trip.id)}>Detalhes</Botao>
        <Botao onClick={() => removeATrip(trip.id)}>Remover</Botao>
        </div>
      </Card>
    )
  })

  return (
    <MainContainerColumn>
      <div>
        <Botao onClick={() => goToHomePage(navigate)}>Voltar</Botao>
      </div>
      <div>
        <Botao onClick={() => goToCreateTripPage(navigate)}>Criar viagem</Botao>
      </div>
      <div>
        <Botao onClick={logout}>Logout</Botao>
      </div>
      <div>
        {allTrips}
      </div>
    </MainContainerColumn>
  )
}
