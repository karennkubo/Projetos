import { InputSignUp, InputLogin } from './../types';
import { Request, Response } from 'express';
import { UserBusiness } from './../business/UserBusiness';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {};

    signUp = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        const input: InputSignUp = {
            name,
            email,
            password
        }

        try {
            const token = await this.userBusiness.signup(input);
            res.status(201).send(token)

        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.status(500).send(`Erro no cadastro`)
            }
        }
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const input: InputLogin = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input);
            res.status(200).send(token)
        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.status(500).send(`Erro no login!`)
            }
        }
    };
}