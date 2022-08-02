import { User } from './../model/User';
import { UserDatabase } from './../data/UserDatabase';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

export async function getUserByProfile(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const token = req.headers.authorization
        if(!token) {
            errorCode=422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }

        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);

        const userDatabase = new UserDatabase();

        const user = await userDatabase.getUser(data.id);

        res.status(200).send({user: user})
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}