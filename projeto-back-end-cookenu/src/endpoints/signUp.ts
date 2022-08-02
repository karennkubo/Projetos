import { HashManager } from './../services/HashManager';
import { UserDatabase } from './../data/UserDatabase';
import { IdGenerator } from "../services/idGenerator";
import {Request, Response} from "express";
import { User } from '../model/User';
import { Authenticator } from '../services/Authenticator';

export async function signUp(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            errorCode=422;
            throw new Error(`Insira as informações corretamente de 'name', 'email', 'password' e 'role'`);
        }
        if(email.length < 6 ){
            throw new Error(`A senha deve possuir mais de 6 caracteres`)
        }
        //Verificar se user já existe no banco de dados.
        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByEmail(email);

        if (user) {
            errorCode=409;
            throw new Error(`E-mail já cadastrado.`)
        }
        if(role !== "ADMIN" && role !== "NORMAL") {
            errorCode=401;
            throw new Error(`Role precisa ser definido como "ADMIN" ou "NORMAL"`)
        }

        //Gerando id para o usuário
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        //Criptografando senhas
        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        //Criando user
        const newUser:User = new User(id, name, email, hashPassword, role);
        await userDatabase.createUser(newUser);

        //authenticator
        const authenticator = new Authenticator();
        const token = authenticator.generate({id,role});
        
        res.status(201).send({message: `Usuário criado com sucesso`, token})

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}