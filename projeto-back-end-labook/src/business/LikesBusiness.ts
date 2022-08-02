import { LikesData } from './../data/LikesData';
import {InputLike } from './../types';
import { Authenticator } from './../services/Authenticator';
import { Likes } from '../model/Likes';
import { PostData } from '../data/PostData';

export default class LikesBusiness {
    constructor(
        private likesData: LikesData,
        private postData: PostData,
        private authenticator: Authenticator
    ) { }
    //Like
    like = async (inputLike: InputLike, token: string) => {
        const { post_id } = inputLike;

        if (!post_id) {
            throw new Error(`Preencha o id do post corretamente no body!`)
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
        const liked = true;

        const connection = new Likes(
            data.id,
            post_id,
            liked
        )

        const postIsLiked = await this.likesData.findingLikes(connection);
        if (postIsLiked.length>0) {
            throw new Error(`Você não pode dar like novamente.`)
        }

        await this.likesData.like(connection);

        return connection;
    }
    //Dislike
    dislike =  async (inputLike: InputLike, token: string) => {
        const { post_id } = inputLike;

        if (!post_id) {
            throw new Error(`Preencha o id do post corretamente no body!`)
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
        const liked = false;

        const connection = new Likes(
            data.id,
            post_id,
            liked
        )

        const [postIsLiked] = await this.likesData.findingLikes(connection);
        console.log(postIsLiked)
        if (!postIsLiked) {
            throw new Error(`Você não curtiu o post.`)
        }

        await this.likesData.dislike(connection);

        return connection;
    }
}
