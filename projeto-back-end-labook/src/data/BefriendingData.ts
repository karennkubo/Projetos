import { Befriending } from '../model/Befriending';
import { BaseDatabase } from './BaseData';

export class BefriendingData extends BaseDatabase {
    protected table_name = "labook_friendships"

    befriend = async (befriending: Befriending) => {
        try {
            await BefriendingData
                .connection(this.table_name)
                .insert(befriending)
            await BefriendingData
                .connection(this.table_name)
                .insert({ user_id: befriending.getUserBefriended(), user_befriended: befriending.getUserId() })
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    split = async (befriending: Befriending) => {
        try {
            await BefriendingData
                .connection(this.table_name)
                .delete()
                .where(befriending)

            await BefriendingData
                .connection(this.table_name)
                .delete()
                .where({ user_id: befriending.getUserBefriended(), user_befriended: befriending.getUserId() })
            
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findingConnection = async(befriending:Befriending) => {
        try {
            const link = await BefriendingData
                .connection(this.table_name)
                .select()
                .where({ user_id: befriending.getUserId(), user_befriended: befriending.getUserBefriended() })
            return link;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findPostsFromFriends = async(user_id: string): Promise<any[]> => {
        try {   
            const results = await BaseDatabase.connection.select(`labook_posts.id`, `labook_posts.photo`, `labook_posts.description`, `labook_posts.createdAt`, `labook_posts.type`, `labook_posts.author`)
            .from("labook_friendships")
            .innerJoin("labook_users", "labook_users.id", "labook_friendships.user_befriended")
            .innerJoin('labook_posts', 'labook_posts.author', 'labook_friendships.user_befriended')
            .where(`labook_friendships.user_id`, `=`, `${user_id}`)

            return results;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}