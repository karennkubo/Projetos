import  BefriendingBusiness  from './../business/BefriendingBusiness';
import { InputBefriend } from './../types';
import { Request, Response } from 'express';

export class BefriendingController {
    constructor(
        private befriendingBusiness: BefriendingBusiness
    ) { };
    //befriend
    befriend = async (req: Request, res: Response) => {
        const user_befriended = req.body.user_befriended as string;

        const token = req.headers.authorization as string;

        const input: InputBefriend = {
            user_befriended
        }

        try {
            const post = await this.befriendingBusiness.befriend(input, token);
            res.status(201).send(post)

        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.status(500).send(`Erro na requisição`)
            }
        }
    };
    //split
    split = async (req: Request, res: Response) => {
        const user_befriended = req.body.user_befriended as string;

        const token = req.headers.authorization as string;

        const input: InputBefriend = {
            user_befriended
        }
            try {
                const post = await this.befriendingBusiness.split(input, token)
                res.status(200).send(post);
            } catch (error) {
                if (error instanceof Error) {
                    res.send(error.message)
                } else {
                    res.status(500).send(`Erro no cadastro`)
                }
            }
        };
    //feed
    getFeed = async(req: Request, res: Response) => {

        const token = req.headers.authorization as string;

            try {
                const posts = await this.befriendingBusiness.getFeed(token)
                res.status(200).send(posts);
            } catch (error) {
                if (error instanceof Error) {
                    res.send(error.message)
                } else {
                    res.status(500).send(`Erro no cadastro`)
                }
            }
        };
    }