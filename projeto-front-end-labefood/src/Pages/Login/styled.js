import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

export const InputMaterial = styled(TextField)`

`

export const Main = styled.div `
    padding: 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        font-size: 2rem;
    }
`

export const Form = styled.form `
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 30%;
    justify-content: space-evenly;
`

export const ButtonStyled = styled(Button)`
    &&{
        color: #000;
        width: 100%;
        background-color: #E8222E;
    }
`