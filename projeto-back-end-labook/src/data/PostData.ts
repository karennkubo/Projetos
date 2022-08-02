import { Post } from './../model/Post';
import { BaseDatabase } from "./BaseData";

export class PostData extends BaseDatabase {
    protected table_name = "labook_posts"

    insert = async (post: Post): Promise<void> => {
        try {
            await PostData
                .connection(this.table_name)
                .insert(post)
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findPostById = async (id: string) => {
        try {
            const post = await PostData
                .connection(this.table_name)
                .select()
                .where({ id })
            return post;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    getPostsByType = async (type: string) => {
        try {
            const posts = await PostData
                .connection(this.table_name)
                .select()
                .where({ type })
            return posts;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    pagination = async(size:number, offset:number) => {
        try {
            const posts = await PostData
            .connection(this.table_name)
            .select()
            .limit(size)
            .offset(offset);
            return posts;
        } catch (error:any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
}