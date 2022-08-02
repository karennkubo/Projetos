import { Comment } from './../model/Comment';
import { BaseDatabase } from './BaseData';

export class CommentData extends BaseDatabase {
    protected table_name = "labook_comments"

    comment = async (comment: Comment) => {
        try {
            await CommentData
                .connection(this.table_name)
                .insert(comment)

        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

}