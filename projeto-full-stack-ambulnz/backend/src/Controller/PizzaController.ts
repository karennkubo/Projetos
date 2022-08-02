import { PizzaBusiness } from './../Business/PizzaBusiness';
import { Request, Response } from 'express';

export class PizzaController {
    constructor (
        private pizzaBusiness:PizzaBusiness
    ) {};

    createPizza =async (req: Request, res: Response) => {
        const { name, price, photo_link } = req.body;
        const data = {name, price, photo_link};
        try {
            const results = await this.pizzaBusiness.createPizza(data);
            res.status(201).send(results);
        } catch (error:any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    };
    
    createIngredient =async (req: Request, res: Response) => {
        const {name} = req.body;
        try {
            const results = await this.pizzaBusiness.createIngredient(name);
            res.status(201).send(results);
        } catch (error:any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    };

    addIngredientsToPizza =async (req: Request, res: Response) => {
        const {pizza_id, ingredient_id} = req.body;
        const data = {pizza_id, ingredient_id};
        try {
            const results = await this.pizzaBusiness.addIngredientsToPizza(data);
            res.status(201).send(results);
        } catch (error:any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    };

    getAllPizzas =async (req: Request, res: Response) => {
        try {
            const results = await this.pizzaBusiness.getAllPizzas();
            res.status(200).send(results);
        } catch (error:any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    };

    getPizzaById =async (req: Request, res: Response) => {
        const id = req.params.id as string;
        try {
            const results = await this.pizzaBusiness.getPizzaById(id);
            res.status(200).send(results);
        } catch (error:any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    };
}