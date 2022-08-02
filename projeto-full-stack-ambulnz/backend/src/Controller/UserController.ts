import { InputSignUp, InputLogin, InputOrder } from './../Model/User';
import { UserBusiness } from './../Business/UserBusiness';
import { Request, Response } from 'express';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    signUp = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const data: InputSignUp = {
            name,
            email,
            password
        };
        try {
            const token = await this.userBusiness.signUp(data);
            res.status(201).send(token);
        } catch (error: any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const data: InputLogin = {
            email,
            password
        };
        try {
            const token = await this.userBusiness.login(data);
            res.status(201).send(token);
        } catch (error: any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }

    order = async (req: Request, res: Response) => {
        const token = req.headers.authorization as string;
        const { pizza_id, quantity } = req.body;
        const data: InputOrder = {
            token,
            pizza_id,
            quantity
        };
        try {
            const results = await this.userBusiness.order(data);
            res.status(200).send(results);
        } catch (error: any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }

    history = async (req: Request, res: Response) => {
        const token = req.headers.authorization as string;
  
        try {
            const results = await this.userBusiness.getOrders(token);
            res.status(200).send(results);
        } catch (error: any) {
            const { statusCode, message } = error;
            if (statusCode === 200) {
                res.status(500).send(`Unexpected error!`);
            } else {
                res.status(statusCode || 400).send({ message });
            }
        }
    }
}