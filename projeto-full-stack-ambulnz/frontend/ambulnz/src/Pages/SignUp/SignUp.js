import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from './../../Hooks/useForm';
import axios from 'axios';
import { BASE_URL } from './../../Constants/BaseUrl';
import { goToPizzas, goToLogin } from './../../Routes/coordinator';
import { Form, Main } from "../Login/styled";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { grey } from "@mui/material/colors";


export const SignUp = () => {
    const navigate = useNavigate();
    const { form, InputChange } = useForm({
        name: "",
        email: "",
        password: ""
    });
    const MySwal = withReactContent(Swal);


    const signUp = (event) => {
        event.preventDefault()
        
        axios.post(`${BASE_URL}/user/signup`, form)
            .then((res) => {
                localStorage.setItem('token', res.data)
                goToPizzas(navigate);
            })
            .catch((err) => {
                MySwal.fire({
                    title: 'Erro',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            })
    }
    return (
        <Main>
            <Typography variant="h1" color={"primary"} sx={{ textShadow: "2px 2px 3px rgba(255,255,255,0.1)" }}>
                Cadastro
            </Typography>
            <Button variant="contained" type="submit" style={{maxWidth: '120px', maxHeight: '60px', minWidth: '120px', minHeight: '60px'}} onClick={() => goToLogin(navigate)}>Login</Button>
            <Form onSubmit={signUp}>
                <TextField id="outlined-basic" label="Name" name={"name"}
                    type={"text"} variant="outlined" color={"primary"} value={form.name} sx={{ bgcolor: grey[500] }}
                    onChange={InputChange} required margin={"normal"} />
                <TextField id="outlined-basic" label="E-mail" name={"email"} sx={{ bgcolor: grey[500] }}
                    type={"email"} variant="outlined" color={"primary"} value={form.email}
                    onChange={InputChange} required margin={"normal"} />
                <TextField id="outlined-basic" label="Password" name={"password"} sx={{ bgcolor: grey[500] }}
                    type={"password"} variant="outlined" value={form.password}
                    onChange={InputChange} required margin={"normal"} minLength="10" />

                <Button variant="contained"
                    color={"primary"} type="submit" >Criar Conta</Button>
            </Form>
            
        </Main>
    )
}