import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { goBack } from '../routes/Coordinator';
import {BASE_URL} from '../constants/Url'
import axios from 'axios';
import useProtectedPage from '../hooks/useProtectedPage';
import styled from 'styled-components';
import {Botao, Form, Input, Select, MainContainerColumn} from '../styles/Style'

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

export const TripDetailsPage = () => {
  const navigate = useNavigate();
  useProtectedPage();
  const token = localStorage.getItem("token");
  const headers = {headers:{auth:token}}
  const params = useParams();

  const [trip, setTrip] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [approveds, setApproveds] = useState([]);

  // Pegando viagens
  const getTrip = () => {
    axios
    .get(`${BASE_URL}trip/${params.id}`, headers)
    .then((res) => {
      setTrip(res.data.trip)
      setCandidates(res.data.trip.candidates)
      setApproveds(res.data.trip.approved)
    })
    .catch((err) => {
      console.log(err.response)
    })
  };
  useEffect(() => {
    getTrip();
  }, []);

  const decideCandidate = (id, boolean) => {
    const body = {
      "approve": boolean
    }

    axios
    .put(`${BASE_URL}trips/${params.id}/candidates/${id}/decide`, body, headers)
    .then((res) => {
      getTrip()
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  const mapOfCandidates = candidates.map((candidate) => {
    return (
      <Card key={candidate.id}>
        <p><strong>Nome:</strong> {candidate.name}</p>
        <p>{candidate.applicationText}</p>
        <Botao onClick={() => decideCandidate(candidate.id, true)}>Aprovar</Botao>
        <Botao onClick={() => decideCandidate(candidate.id, false)}>Reprovar</Botao>

      </Card>
    )
  })

  const allApproved = approveds.map((approved) => {
    return (
      <Card>
        <p>{approved.name}</p>
      </Card>
    )
  })

  return (
    <MainContainerColumn>
      <div>
        <Botao onClick={() => goBack(navigate)}>Voltar</Botao>
      </div>

      <Card key={trip.id}>
        <p><strong>Nome: </strong>{trip.name}</p>
        <p><strong>Descrição: </strong>{trip.description}</p>
        <p><strong>Duração da viagem: </strong>{trip.durationInDays} dias</p>
        <p><strong>Data: </strong>{trip.date}</p>
      </Card>
      <h3>Candidatos na lista de espera:</h3>
      {candidates.length > 0 ? mapOfCandidates : <Card><p>Não há candidatos na lista de espera</p></Card>}
      <h3>Candidatos aprovados:</h3>
      {approveds.length > 0 ? allApproved : <Card><p>Não há candidatos aprovados</p></Card>}
    </MainContainerColumn>
  )
}
