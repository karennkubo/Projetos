import { HashManager } from './../services/HashManager';
import { UserDatabase } from './../data/UserDatabase';
import { IdGenerator } from "../services/idGenerator";
import {Request, Response} from "express";
import { User } from '../model/User';
import { Authenticator } from '../services/Authenticator';

export async function login(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const {email, password} = req.body;

        if (!email || !password ) {
            errorCode=422;
            throw new Error(`Insira as informações corretamente de 'name', 'email', 'password' e 'role'`);
        }

        //Verificar se user já existe no banco de dados.
        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByEmail(email);
        if(!user) {
            errorCode=401;
            throw new Error(`Usuário não cadastrado no sistema!`)
        }
        //Criptografando senhas
        const hashManager = new HashManager();
        const hash = user.getPassword();
        const passwordIsCorrect = await hashManager.compare(password, hash);
        console.log(passwordIsCorrect);
        if (!passwordIsCorrect) {
            errorCode=401;
            throw new Error(`Credenciais inválidas!`)
        }

        //authenticator
        const authenticator = new Authenticator();
        const token = authenticator.generate({id:user.getId(), role:user.getRole()});
        
        res.status(201).send({message: `Usuário logado com sucesso`, token})

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}