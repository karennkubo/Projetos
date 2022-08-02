import React, { useState } from "react";
import axios from "axios";
import GlobalStateContext from "./GlobalStateContext";
import { BASE_URL } from "../Constants/BaseUrl";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const GlobalState = (props) => {
    const token = window.localStorage.getItem("token");
    const headers = {
        headers: {
            Authorization: token
        }
    };
    const MySwal = withReactContent(Swal);


    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([]);
    const [qtd, setQtd] = useState(0);
    const [pizzas, setPizzas] = useState([]);
    const [pizza, setPizza] = useState([]);

    const getPizzas = () => {
        axios
            .get(`${BASE_URL}/pizza`)
            .then((res) => {
                setPizzas(res.data);
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

    const getPizza = (id) => {
        axios
            .get(`${BASE_URL}/pizza/${id}`)
            .then((res) => {
                setPizza(res.data);
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

    const getOrdersHistory = () => {
        axios
            .get(`${BASE_URL}/user/order`, headers)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
    }
    
    const values = { token, headers };
    const states = { orders, cart, qtd, pizzas, pizza };
    const setters = { setOrders, setCart, setQtd, setPizzas, setPizza };
    const requests = { getPizzas, getPizza, getOrdersHistory };

    return (
        <GlobalStateContext.Provider value={{ states, setters, requests, values }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}
export default GlobalState;