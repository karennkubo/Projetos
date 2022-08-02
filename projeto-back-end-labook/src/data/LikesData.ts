import { Likes } from './../model/Likes';
import { BaseDatabase } from './BaseData';

export class LikesData extends BaseDatabase {
    protected table_name = "labook_likes"

    like = async (likes: Likes) => {
        try {
            await LikesData
                .connection(this.table_name)
                .insert(likes)

        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    dislike = async (likes: Likes) => {
        try {
            await LikesData
                .connection(this.table_name)
                .delete()
                .where({ author_id: likes.getAuthorId(), post_id: likes.getPostId() })
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findingLikes = async (likes: Likes) => {
        try {
            const link = await LikesData
                .connection(this.table_name)
                .select()
                .where({ author_id: likes.getAuthorId(), post_id: likes.getPostId() })
            return link;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

}