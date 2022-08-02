import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/urls';
import { useForm } from '../hooks/useForm'
import { goToFeed, goToLogin } from '../routes/Coordinator';
import { Form, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { DivSignUp, Img, DivForm } from '../styles/SignUp-style';
import People from '../assets/people.png'

export default function SignUp() {
  const { form, onChange, cleanFields } = useForm({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/users/signup`, form)
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
    <DivSignUp>
      <Img src={People} alt="people"/>
      <DivForm>
      <Button variant='dark' onClick={() => goToLogin(navigate)} className='dark mb-3 mt-3' >Voltar</Button>

      <Form onSubmit={submit} style={{width: '310px', display:'flex', rowGap: '20px', flexDirection:'column'}}>
        <Form.Group>
          <Form.Control
            name="username"
            placeholder="Usuário"
            onChange={onChange}
            value={form.username}
            type="text"
            pattern={"^.{5,}"}
            title={"É necessário no mínimo 5 caracteres."}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="email"
            placeholder="E-mail"
            onChange={onChange}
            value={form.email}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="password"
            placeholder="Senha"
            onChange={onChange}
            value={form.password}
            type="password"
            pattern={"^.{8,30}"}
            title={"A senha deve possuir no mínimo 8 e no máximo 30 caracteres."}
            required
          />
        </Form.Group>
        <Button variant='dark' type='submit'>Criar</Button>
      </Form>
      </DivForm>
    </DivSignUp>
  )
}
