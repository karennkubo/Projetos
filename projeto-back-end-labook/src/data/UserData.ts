import { InputLogin } from './../types';
import { User } from './../model/User';
import { BaseDatabase } from "./BaseData";

export class UserData extends BaseDatabase {
    protected table_name = "labook_users"

    insert = async (user: User): Promise<void> => {
        try {
            await UserData
                .connection(this.table_name)
                .insert(user)
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findAccountByEmail = async (email: string) => {
        try {
            const account = await UserData
                .connection(this.table_name)
                .select()
                .where({ email })
            return account;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }

    findAccountById = async (id: string) => {
        try {
            const account = await UserData
                .connection(this.table_name)
                .select()
                .where({ id })
            return account;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
}