import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './../Constants/BaseUrl';
import { useContext } from 'react';
import GlobalStateContext from './../Global/GlobalStateContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
    mx: "auto"
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function BasicModal(props) {
    const MySwal = withReactContent(Swal);
    const { values } = useContext(GlobalStateContext);
    const { headers } = values;
    const [qtd, setQtd] = useState(0);
    const onChangeQuantity = (event) => {
        let value = event.target.value
        setQtd(value)
    }

    const order = (id, name, qtd, handleClose) => {
        const body = {
            pizza_id: id,
            quantity: Number(qtd)
        }
        axios
            .post(`${BASE_URL}/user/order`, body, headers)
            .then((res) => {
                MySwal.fire({
                    title: 'Compra realizada',
                    text: `Compra: ${qtd}x ${name}`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                handleClose();
            })
            .catch((err) => {
                MySwal.fire({
                    title: 'Erro',
                    text: `${err.response.data.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                handleClose();

            })

    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 2 }}>
                        Selecione a quantidade:
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Quantidade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={qtd}
                                key={qtd}
                                label="Quantidade"
                                onChange={onChangeQuantity}
                            >
                                <MenuItem key={0} value={0}>0</MenuItem>
                                {numbers.map((qnt) => {
                                    return (
                                        <MenuItem key={qnt} value={qnt}>{qnt}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Button onClick={() => order(props.id, props.name, qtd, props.handleClose)}>Comprar</Button>
                </Box>
            </Modal>
        </div>
    );
}
