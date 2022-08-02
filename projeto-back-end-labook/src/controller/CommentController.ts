import { InputComments } from './../types';
import { Request, Response } from 'express';
import CommentBusiness from '../business/CommentBusiness';

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { };
    //Comment
    comment = async (req: Request, res: Response) => {
        const post_id = req.body.post_id as string;
        const comment = req.body.comment as string;

        const token = req.headers.authorization as string;

        const input: InputComments = {
            post_id,
            comment
        }

        try {
            const post = await this.commentBusiness.comment(input, token);
            res.status(201).send(post)

        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.status(500).send(`Erro na requisição`)
            }
        }
    };
    }