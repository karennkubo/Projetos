import styled from 'styled-components'

export const Botao = styled.button`
    box-shadow: 0px 0px 0px 2px #967b8a;
	background:linear-gradient(to bottom, #f4e7ee 5%, #a1919a 100%);
	background-color:#f4e7ee;
	border-radius:10px;
	border:1px solid #f4e7ee;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:19px;
	padding:12px 37px;
	text-decoration:none;
	text-shadow:0px 1px 0px #4d3442;
    :hover{ 
    background:linear-gradient(to bottom, #a1919a 5%, #f4e7ee 100%);
	background-color:#a1919a;
    }
    :active{
    position:relative;
	top:1px;
    }
`

export const MainContainer = styled.div`
    width: 320px;
    min-height: 80vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
`
export const MainContainerColumn = styled.div `
    width: 320px;
    min-height: 80vh;
    display: flex;
    margin: auto;
    padding-top: 10px;
    align-items: center;
    flex-direction: column;
    column-gap: 20px;
    row-gap: 5px;
`

export const Form = styled.form` 
    width: 320px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-content: center;
`
export const Input = styled.input `
    width: 320px;
    box-shadow: 0px 0px 0px 2px #967b8a;
	background:linear-gradient(to bottom, #f4e7ee 5%, #a1919a 100%);
	background-color:#f4e7ee;
	border-radius:10px;
	border:1px solid #f4e7ee;

`

export const Select = styled.select`
    width: 320px;
    box-shadow: 0px 0px 0px 2px #967b8a;
	background:linear-gradient(to bottom, #f4e7ee 5%, #a1919a 100%);
	background-color:#f4e7ee;
	border-radius:10px;
	border:1px solid #f4e7ee;

`