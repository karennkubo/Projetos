import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import './styles'
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`

export const Body = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D3D9DB;
    font-family: 'Roboto', sans-serif;
`