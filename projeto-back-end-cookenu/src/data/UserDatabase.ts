import { Recipe } from './../model/Recipe';
import { UserFollows } from '../model/UserFollows';
import { User } from './../model/User';
import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
    public async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await BaseDatabase.connection(`USER`).select(`*`).where({ email })

            return user[0] && User.toUserModel(user[0]);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findUserById(id: string): Promise<User> {
        try {
            const user = await BaseDatabase.connection(`USER`).select(`*`).where({ id })

            return user[0] && User.toUserModel(user[0]);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(`USER`).insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await BaseDatabase.connection(`USER`).select('id', 'name', 'email', 'role');
            return users.map(user => User.toUserModel(user));
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }

    }

    public async getUser(id: string): Promise<User[]> {
        try {
            const user = await BaseDatabase.connection(`USER`).select('id', 'name', 'email').where({ id });
            return user.map(user => User.toUserModel(user));
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }

    }

    public async getFollowersFromUser(user_id: string): Promise<string[]> {
        try {
            const results = await BaseDatabase.connection(`USER_FOLLOWS`).select(`user_followed`).where({ user_id });
            const usersFollowed = results.map(result => result.user_followed)
            return usersFollowed;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getFollowersFromUserById(user_id: string): Promise<any[]> {
        try {
            const results = await BaseDatabase.connection(`USER_FOLLOWS`).select(`id`, `user_followed`).where({ user_id });
            // const usersFollowed = results.map(result => { result.id, result.user_followed })
            return results;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async follow(userFollows: UserFollows): Promise<void> {
        try {
            await BaseDatabase.connection(`USER_FOLLOWS`).insert({
                id: userFollows.getId(),
                user_id: userFollows.getUserId(),
                user_followed: userFollows.getUserFollowed()
            })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async unfollow(id: string): Promise<void> {
        try {
            await BaseDatabase.connection(`USER_FOLLOWS`).del().where({ id })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    
    public async findRecipesFromUsers(user_id: string): Promise<any[]> {
        try {   
            const result = await BaseDatabase.connection.select(`RECIPE.id`, `RECIPE.title`, `RECIPE.description`, `RECIPE.createdAt`, `RECIPE.user_id`, `USER.name`)
            .from("USER_FOLLOWS")
            .innerJoin("USER", "USER.id", "USER_FOLLOWS.user_followed")
            .innerJoin('RECIPE', 'RECIPE.user_id', 'USER_FOLLOWS.user_followed')
            .where(`USER_FOLLOWS.user_id`, `=`, `${user_id}`)

            return result;
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserId(id:string):Promise<any> {
        try {
            const [user] = await BaseDatabase.connection(`USER`).select(`id`).where({id})

            return user;
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async delete(id:string):Promise<void> {
        try {
            await BaseDatabase.connection(`USER`).where({id}).delete();
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}