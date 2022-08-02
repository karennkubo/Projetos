import { CommentData } from './../data/CommentData';
import { IdGenerator } from './../services/IdGenerator';
import { LikesData } from './../data/LikesData';
import { InputComments } from './../types';
import { Authenticator } from './../services/Authenticator';
import { PostData } from '../data/PostData';
import { Comment } from '../model/Comment';

export default class CommentBusiness {
    constructor(
        private commentData: CommentData,
        private postData: PostData,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }
    //Comment
    comment = async (inputComment: InputComments, token: string) => {
        const { post_id, comment } = inputComment;

        if (!post_id || !comment) {
            throw new Error(`Preencha o id do post corretamente e o comentário no body!`)
        }

        const postExists = await this.postData.findPostById(post_id);
        if(!postExists) {
            throw new Error(`O post não foi encontrado!`)
        }

        if (!token) {
            throw new Error(`Forneça o token no campo headers corretamente!`)
        }
        const data = this.authenticator.getData(token);

        if (!data) {
            throw new Error(`Usuário não encontrado!`)
        }
        const id = this.idGenerator.generateId();

        const newComment = new Comment(
            id,
            data.id,
            post_id,
            comment
        )

        await this.commentData.comment(newComment);

        return newComment;
    }

}
