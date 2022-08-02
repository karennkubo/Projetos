import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {deepOrange} from '@mui/material/colors';

export default function AboutUsModal(props) {
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

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ p: 2 }}>
                        Karen - Pizzaria Artesanal
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle1" component="h2" sx={{ p: 2 }}>
                        Site e API desenvolvida com: React.JS, Node.JS, Javascript, Typescript, Material-UI, Styled-components, Knex, Express.JS, Axios, POO, arquitetura em camadas, criptografia e clean code.
                    </Typography>
                    <Button sx={{ color: deepOrange[500], marginLeft:"41%" }} onClick={props.handleClose}>Ok</Button>
                </Box>
            </Modal>
        </div>
    )
}
