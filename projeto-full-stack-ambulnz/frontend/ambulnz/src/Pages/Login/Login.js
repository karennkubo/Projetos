import React from "react";
import { useNavigate } from "react-router-dom";
import { Main, Form } from "./styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useForm from "../../Hooks/useForm";
import axios from 'axios';
import { goToPizzas, goToSignUp } from "../../Routes/coordinator";
import { Button } from "@mui/material";
import { BASE_URL } from "../../Constants/BaseUrl";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { grey } from '@mui/material/colors';

export const Login = () => {
    let navigate = useNavigate();

    const { form, InputChange } = useForm({
        email: "",
        password: ""
    })

    const MySwal = withReactContent(Swal);

    const login = (event) => {
        event.preventDefault();
        axios
            .post(`${BASE_URL}/user/login`, form)
            .then((res) => {
                localStorage.setItem('token', res.data)
                goToPizzas(navigate);
            })
            .catch((error) => {
                MySwal.fire({
                    title: 'Erro',
                    text: `${error.response.data.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            })
    };

    return (
        <Main>
            <Typography variant="h1" color={"primary"} sx={{ textShadow: "2px 2px 3px rgba(255,255,255,0.1)" }}>
                Entrar
            </Typography>
            <Button variant="contained" type="submit" style={{ maxWidth: '120px', maxHeight: '60px', minWidth: '120px', minHeight: '60px' }} onClick={() => goToSignUp(navigate)}>Cadastro</Button>
            <Form onSubmit={login}>
                <TextField id="outlined-basic" label="E-mail" name={"email"}
                    type={"email"} variant="outlined" color={"primary"} value={form.email} sx={{ bgcolor: grey[500] }}
                    onChange={InputChange} required margin={"normal"} />
                <TextField id="outlined-basic" label="Password" name={"password"}
                    type={"password"} variant="outlined" value={form.password} sx={{ bgcolor: grey[500] }}
                    onChange={InputChange} required margin={"normal"} />

                <Button variant="contained"
                    color={"primary"} type="submit" >Entrar</Button>
            </Form>           

        </Main>
    )
}