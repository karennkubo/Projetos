import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicModal from './Modal';

export default function PizzaCards(props) {
    const ingredients = props.ingredients && props.ingredients.map((ing) => {
        return (
            <Box component="div" sx={{ color:"text.secondary" }}>
                    {ing}
            </Box>
        )
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Card sx={{ maxWidth: 345, display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }} key={props.id}>
            <CardMedia
                component="img"
                image={props.photo_link}
                alt={props.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                Ingredientes: {ingredients}
                <Typography variant="body" color="text" component="div">
                    {props.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </Typography>
                <BasicModal
                    open={open}
                    handleClose={handleClose}
                    id={props.id}
                    name={props.name}
                />
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent: "flex-end", position: "absolute", bottom:"0", right:"0"}}>
                <Button size="large" onClick={handleOpen} color="primary">Comprar</Button>
            </CardActions>
        </Card>
    );

}
