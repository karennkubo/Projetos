import React, { useState } from 'react';
import {goToFeed, goToSignUp} from "../../Routes/Coordinator";
import { Button, IconButton } from '@mui/material';
import { Form, Main, ButtonStyled, InputMaterial } from './styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { BASE_URL } from './../../Constants/urls';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmitLogin = (e) => {
    e.preventDefault();

    const userLogin = {
      email,
      password
    }
    loginApi(userLogin)
  }

  const loginApi = async(body) => {
    await axios.post(`${BASE_URL}/login`, body)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      alert(`Hello ${res.data.user.name}`);
      goToFeed(navigate);
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }

  return (
    <Main>
      <p>Entrar</p>
      <Form onSubmit={onSubmitLogin}>
        <InputMaterial
          id='outlined-basic'
          label='Email'
          type={"email"}
          value={email}
          placeholder={"email@email.com"}
          variant='outlined'
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <InputMaterial
          id='outlined-basic'
          label='Password'
          placeholder={"Mínimo de 6 caracteres"}
          value={password}
          type={showPassword ? "text" : "password"}
          variant='outlined'
          onChange={(event) => setPassword(event.target.value)}
          inputProps={{minLength:6, title:"A senha deve conter no mínimo 6 caracteres"}}
          required
        />

        <IconButton
          aria-label='toggle password visibility'
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <ButtonStyled type="submit">Entrar</ButtonStyled>
      </Form>
      <Button onClick={()=>goToSignUp(navigate)}> Ainda não tem uma conta? Cadastre-se aqui!</Button>
    </Main>
  )
}
