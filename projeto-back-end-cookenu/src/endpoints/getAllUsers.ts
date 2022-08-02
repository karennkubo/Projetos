import { User } from './../model/User';
import { UserDatabase } from './../data/UserDatabase';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

export async function getAllUsers(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const token = req.headers.authorization
        if(!token) {
            errorCode=422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);

        if (data.role !== "ADMIN") {
            errorCode=401;
            throw new Error(`Apenas administradores podem utilizar essa funcionalidade`)
        }

        const userDatabase = new UserDatabase();
        const users = await userDatabase.getAllUsers();

        res.status(200).send({users: users})
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}