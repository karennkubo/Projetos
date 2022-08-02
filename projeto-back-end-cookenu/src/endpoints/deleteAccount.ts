import { UserDatabase } from './../data/UserDatabase';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { RecipeDatabase } from '../data/RecipeDatabase';


export async function deleteAccount(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const token = req.headers.authorization;
        const id = req.params.id;
        
        if(!token) {
            errorCode=422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        if (!id) {
            errorCode=422;
            throw new Error(`Por favor, informe o id corretamente nos parâmetros`)
        }
        
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);
        if (!data) {
            errorCode=401;
            throw new Error(`Usuário não encontrado!`)
        }
        const userDatabase = new UserDatabase;
        if (data.role === "ADMIN") {            
            await userDatabase.delete(id);
        } else {
            const user = await userDatabase.getUserId(id);
            if(user.id !== data.id) {
                errorCode=401;
                throw new Error(`Você não pode excluir uma conta que não seja a sua!`)
            }
            await userDatabase.delete(id);
        }
        res.status(200).send(`Seu usuário ${id} foi deletado com sucesso!`)
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}