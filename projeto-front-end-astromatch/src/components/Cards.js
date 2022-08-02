import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import match from '../img/match.png'
import notAMatch from '../img/not-a-match.png'
import { BASE_URL} from '../constants/Url'

const Imagem = styled.img `
    width: 50px;
    background: salmon;
    box-shadow: 0 0 1em salmon;
    border-radius: 80%;
    :hover{
        width: 60px;
    }
`

const Botao = styled.button `
    background: none;
    border: none;
    cursor: pointer;

    `
const DivBotoes = styled.div `
    display: flex;
    justify-content: space-around;
    width: 320px;
`
const Foto = styled.img`
    height: 300px;
    max-width: 300px;
`

const P =styled.p`
    word-wrap: break-word;
    color: white;
    padding: 0 20px;
`

const Cards = (props) => {

    return (
      <>
        <div>
        <Foto src={props.profile.photo} alt={props.profile.name}/>
        </div>
        <div>
            <P><strong>{props.profile.name}</strong>, {props.profile.age} anos</P>
        </div>
        <div>
            <P>{props.profile.bio}</P>
        </div>
        <DivBotoes>
        <Botao onClick={()=>props.notAMatch(props.profile.id)}><Imagem src={notAMatch} alt="not-a-match"/></Botao>
        <Botao onClick={()=>props.match(props.profile.id)}><Imagem src={match} alt="match"/></Botao>
        </DivBotoes>

      </>
    );
  }
  
  
  export default Cards;