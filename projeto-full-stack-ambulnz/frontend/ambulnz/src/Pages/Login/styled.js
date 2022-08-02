import styled from "styled-components";

export const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
 
    
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 40%;
    width: 40%;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
    width: 80%;
    }
`
