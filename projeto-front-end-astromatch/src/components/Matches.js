import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_URL} from '../constants/Url'
import Home from './Home'

const Foto = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`
const DivBotoes = styled.div `
    display: flex;
    justify-content: space-around;
    width: 320px;
`
const DivdaLista = styled.div `
  display: flex;
  justify-content:flex-start;
  align-items: center;
  width: 310px;
`
const BotaoRemove = styled.button`
  margin-left: auto;
  margin-right: 5px;
  box-shadow:inset 0px 1px 0px 0px #f7c5c0;
	background:linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
	background-color:#fc8d83;
	border-radius:6px;
	border:1px solid #d83526;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
  text-decoration:none;
	text-shadow:0px 1px 0px #b23e35;
    :hover{ 
        background:linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
	background-color:#e4685d;
    }
    :active {
	position:relative;
	top:1px;
}
  `
const Span = styled.span `
  color: white;
  word-wrap: break-word;
  padding: 10px;

`
const Botao = styled.button`
  box-shadow:inset 0px 1px 0px 0px #f7c5c0;
	background:linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
	background-color:#fc8d83;
	border-radius:6px;
	border:1px solid #d83526;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #b23e35;
    :hover{ 
        background:linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
	background-color:#e4685d;
    }
    :active {
	position:relative;
	top:1px;
}
`
const Matches = (props) => {

  const [matches, setMatches] = useState([])

  const getMatches = () => {
    axios
    .get(`${BASE_URL}matches`)
    .then((response) => {
      setMatches(response.data.matches)
    })
    .catch((error) => {
      alert(error)
    })
  }

  const clear = () => {
    axios
    .put(`${BASE_URL}clear`)
    .then((response) => {
      setMatches([])
    })
    .catch((error) => {
      alert(error)
    })
  }

  const removeMatch = (person) => {
    const newList = matches.filter((match) => {
      return (person.id !== match.id)
    })
    setMatches(newList);
  }

  useEffect(() => {
    getMatches()
  }, [])

    return (
      <>
      <DivBotoes>
      <Botao onClick={props.goToHome}>Home</Botao>
      <Botao onClick={clear}>Reset</Botao>
      </DivBotoes>
        {matches.map((match) => {
          return (
            <DivdaLista key={match.id}>
              <Foto src={match.photo} alt={match.name}/>
              <Span>{match.name}, {match.age} anos</Span>
              <BotaoRemove onClick={()=>removeMatch(match)}>X</BotaoRemove>
            </DivdaLista>
          )
        })}
      </>
    );
  }
  
  
  export default Matches;
