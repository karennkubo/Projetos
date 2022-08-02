import styled from "styled-components"

export const Icon = styled.img `
    width: 32px;
    :hover { 
        width: 35px;
    }
    :active {
        box-shadow: 0px 0px 15px #ccc;
        width: 35px;
    }
`
export const Card = styled.div `
    box-shadow: #FAB253 0px 0px 0px 4px, #FD7D1C 0px 0px 0px 8px;
    border-radius: 5px;
    word-wrap: break-word;
    background-color: white;
`
export const DivCards = styled.div `
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding-top: 20px;
    width: 80vw;
    margin: auto;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        width:320px;
     }
`
export const DivBody = styled.div `
    display: flex;
    flex-direction: column;
    
`
export const Textarea = styled.textarea `
    width: 80vw;
    min-height: 15vh;
    box-shadow: #D3D9DB 0px 0px 0px 4px, #47515A 0px 0px 0px 8px;
    border-radius: 5px;    
    word-wrap: break-word;
    white-space:normal;
    resize: none;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        width:320px;
     }
`

export const TextareaTitulo = styled.textarea `
    width: 80vw;
    min-height: 5vh;
    box-shadow: #D3D9DB 0px 0px 0px 4px, #47515A 0px 0px 0px 8px;
    border-radius: 5px;    
    word-wrap: break-word;
    white-space:normal;
    resize: none;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) { 
        width:320px;
     }
`
export const ImgLoading = styled.img `
    width: 320px;
    align-self: center;
`

export const DivForm = styled.div `
    display: flex;
    flex-direction: column;
    min-height: 30vh;
    justify-content: center;
`


export const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    word-wrap: break-word;
    margin: auto;
`

export const DivBotoesPosts = styled.div `
    display: flex;
    column-gap: 10px;

`

export const Icones = styled.button `
    background: none;
    border: none;
    cursor: pointer;
    padding-left: 10px;
`
