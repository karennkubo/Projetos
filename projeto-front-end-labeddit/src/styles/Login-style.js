import styled from "styled-components";

export const BodyLogin = styled.div `
    min-height: 85vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        flex-direction: column;
        justify-content: flex-start;
     }
`

export const Img = styled.img `
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        width:70vw;
     }
`

export const DivForm = styled.div `
    display: flex;
    flex-direction: column;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        width:310px;
     }
`