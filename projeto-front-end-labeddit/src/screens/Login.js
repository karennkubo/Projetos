import React from 'react'
import { useForm } from "../hooks/useForm"
import { goToSignUp, goToFeed } from "../routes/Coordinator"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {BASE_URL} from "../constants/urls"
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BodyLogin, Img, DivForm } from '../styles/Login-style';
import People from '../assets/people.png'

export default function Login() {

  const { form, onChange, cleanFields } = useForm({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    axios
    .post(`${BASE_URL}/users/login`, form)
    .then((res) => {
      window.localStorage.setItem("token", res.data.token);
      goToFeed(navigate);
      cleanFields();
    })
    .catch((err) => {
      alert(err.response.data);
    })
  }

  return (
    <>
    <BodyLogin>
      <Img src={People} alt='people'/>
      <DivForm>
      <Form onSubmit={login} style={{display: "flex", flexDirection: "column", rowGap: "10px", marginBottom: "10px"}}>
        <Form.Group>
          <Form.Label>E-mail: </Form.Label>
        <Form.Control
          placeholder="E-mail"
          type={"email"}
          required
          onChange={onChange}
          value={form.email}
          name={"email"}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Senha: </Form.Label>
        <Form.Control
          placeholder="Senha"
          type={"password"}
          required
          onChange={onChange}
          value={form.password}
          name={"password"}
        />
        </Form.Group>
        <Button variant='dark' type='submit'>Entrar</Button>
      </Form>
      <Button variant='dark' onClick={()=>goToSignUp(navigate)} >Criar conta</Button>
      </DivForm>
      </BodyLogin>
    </>
  )
}
