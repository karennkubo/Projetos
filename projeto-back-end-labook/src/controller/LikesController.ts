import { InputLike } from './../types';
import { Request, Response } from 'express';
import LikesBusiness from '../business/LikesBusiness';

export class LikesController {
    constructor(
        private likesBusiness: LikesBusiness
    ) { };
    //like
    like = async (req: Request, res: Response) => {
        const post_id = req.body.post_id as string;

        const token = req.headers.authorization as string;

        const input: InputLike = {
            post_id
        }

        try {
            const post = await this.likesBusiness.like(input, token);
            res.status(201).send(post)

        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.status(500).send(`Erro na requisição`)
            }
        }
    };
    //dislike
    dislike = async (req: Request, res: Response) => {
        const post_id = req.body.post_id as string;

        const token = req.headers.authorization as string;

        const input: InputLike = {
            post_id
        }
            try {
                const post = await this.likesBusiness.dislike(input, token)
                res.status(200).send(post);
            } catch (error) {
                if (error instanceof Error) {
                    res.send(error.message)
                } else {
                    res.status(500).send(`Erro no cadastro`)
                }
            }
        };
    }