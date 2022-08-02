import { UserDatabase } from './../data/UserDatabase';
import { IdGenerator } from "../services/idGenerator";
import { Request, Response } from "express";
import { Authenticator } from '../services/Authenticator';
import { UserFollows } from '../model/UserFollows';

export async function unfollowUser(req: Request, res: Response) {
    let errorCode: number = 400;
    try {
        const { user_followed } = req.body;
        const token = req.headers.authorization;

        if (!token) {
            errorCode = 422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        if (!user_followed) {
            errorCode = 422;
            throw new Error(`Insira as informações corretamente de 'user_followed' no body!`);
        }

        //Achando usuário
        const userDatabase = new UserDatabase();
        const user = userDatabase.findUserById(user_followed);
        if (!user) {
            errorCode = 404;
            throw new Error(`Id do usuário a ser unfollowed está inválido!`)
        }

        //Pegando id do usuário que irá seguir
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);

        if (!data) {
            errorCode = 404;
            throw new Error(`Usuário não encontrado!`)
        }
        //ID do usuário que irá seguir alguém
        const user_id = data.id;

        //Verificando se usuário já foi seguido ou se ele quer seguir a si mesmo
        const allUsersFollowed = await userDatabase.getFollowersFromUser(user_id);
        const userIsFollowed = allUsersFollowed.find(user=>user===user_followed);
        if (userIsFollowed===undefined) {
            errorCode=409;
            throw new Error(`Você não seguiu esse usuário!`)
        }
        if (user_id===user_followed) {
            errorCode=409;
            throw new Error(`Não é permitido se dar unfollow!`)
        }

        //Pegando ID da requisição
        const allIds = await userDatabase.getFollowersFromUserById(user_id);
        
        const id = allIds.find((result) => {
            if (result.user_followed === user_followed) {
                return result.id
            }
        })
        await userDatabase.unfollow(id.id);

        res.status(201).send({ message: `Usuário ${id.id} unfollowed com sucesso` })
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
}