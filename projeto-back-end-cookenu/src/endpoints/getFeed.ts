import { User } from './../model/User';
import { UserDatabase } from './../data/UserDatabase';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

export async function getFeed(req: Request, res: Response) {
    let errorCode: number = 400;
    try {
        const token = req.headers.authorization
        if (!token) {
            errorCode = 422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);
        if(!data) {
            errorCode=404;
            throw new Error(`Usuário não encontrado!`)
        }
        const user_id = data.id;

        const userDatabase = new UserDatabase();

        const recipesFromUsers = await userDatabase.findRecipesFromUsers(user_id);

        res.status(200).send({ recipes: recipesFromUsers })
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
}