import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/Url'
import Cards from './Cards'
import Loading from '../img/loading.gif'
import styled from 'styled-components'

// Design
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

const Gif = styled.img`
    width: 320px;
`

const Home = (props) => {

    const [profiles, setProfiles] = useState({})
    const [loading, setLoading] = useState(false);

    const getProfileToChoose = () => {
        axios
            .get(`${BASE_URL}person`)
            .then((response) => {
                setProfiles(response.data.profile)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const likeSomeone = (id) => {
        axios
            .post(`${BASE_URL}choose-person`, {
                id: profiles.id,
                choice: true,
            })
            .then((response) => {
                getProfileToChoose()
            })
            .catch((error) => {
                alert(error)
            })
    }

    const dislikeSomeone = (id) => {
        axios
            .post(`${BASE_URL}choose-person`, {
                id: profiles.id,
                choice: false,
            })
            .then((response) => {
                getProfileToChoose()
            })
            .catch((error) => {
                alert(error)
            })
    }

    useEffect(() => {
        getProfileToChoose()
        setTimeout(() => {
            setLoading(true)
        }, 1700);
    }, [])


    return (
        <>
            <div>
                <Botao onClick={props.goToMatches}>Matches</Botao>
            </div>

            {loading && profiles.id ? <Cards profile={profiles} match={() => likeSomeone(profiles.id)} notAMatch={() => dislikeSomeone(profiles.id)} /> : <Gif src={Loading} alt="loading" />}

        </>
    );
}

export default Home;
