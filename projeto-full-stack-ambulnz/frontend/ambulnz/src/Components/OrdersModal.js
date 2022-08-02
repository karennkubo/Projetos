import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { deepOrange } from '@mui/material/colors';
import { useContext } from 'react';
import GlobalStateContext from './../Global/GlobalStateContext';
import { useEffect } from 'react';

export default function OrdersModal(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };
    const { states, requests } = useContext(GlobalStateContext);
    const { getOrdersHistory } = requests;
    const { orders } = states;

    useEffect(() => {
        getOrdersHistory();
    }, [])
    return (
        <div>

            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ p: 2 }} color={"primary"}>
                        Orders
                    </Typography>
                    {orders.length > 0 ? orders.map((order) => {
                        const date = new Date(order.ordered_at);
                        const dataFormatada = date.toLocaleDateString();
                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', width:"100%"}}>
                                <Typography id="modal-modal-title" variant="h5" component="h2" color={deepOrange[300]}>
                                    {dataFormatada}
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2" color={deepOrange[300]}>
                                    {order.quantity}x {order.pizza_name}
                                </Typography>
                            </Box>
                        )
                    }) : 
                    <Box sx={{ display: "flex", justifyContent: "space-around"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color={"primary"}>
                        Nenhum pedido foi feito no momento!
                    </Typography>
                    </Box>
                    }
                    
                    <Button sx={{ color: deepOrange[500] }} onClick={props.handleClose}>Ok</Button>
                </Box>
            </Modal>
        </div>
    )
}
