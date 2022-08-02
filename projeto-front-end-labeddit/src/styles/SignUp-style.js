import styled from "styled-components";
export const DivSignUp = styled.div `
    display: flex;
    flex-direction: row;
    min-height: 85vh;
    align-items: center;
    justify-content: center;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        flex-direction: column;
        justify-content: flex-start;
        
    }
    `
export const DivForm = styled.div `
display: flex;
flex-direction: column;
@media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
    width:310px;
 }
`

export const Img = styled.img `
@media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
    width:70vw;
 }
`