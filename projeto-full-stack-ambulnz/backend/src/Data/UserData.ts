import { CustomError } from './../Error/CustomError';
import { User, InputLogin, UserOrders } from './../Model/User';
import { BaseDatabase } from './BaseDatabase';

export class UserData extends BaseDatabase {
    signup = async (input: User) => {
        try {
            await UserData
                .connection(`Ambulnz_User`)
                .insert({
                    id: input.getId(),
                    name: input.getName(),
                    email: input.getEmail(),
                    password: input.getPassword()
                });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    findUser = async (email:string) => {
        try {
            const user = await UserData
                .connection(`Ambulnz_User`)
                .select()
                .where({ email });
            return user[0];
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    order = async (input:UserOrders) => {
        try {
            await UserData
                .connection(`Ambulnz_UserOrders`)
                .insert({
                    user_id: input.getUserId(),
                    pizza_id: input.getPizzaId(),
                    quantity: input.getQuantity(),
                    ordered_at: input.getOrderedAt(),
                    pizza_name: input.getPizzaName()
                });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    selectAllOrders = async (user_id:string) => {
        try {
            const orders = await UserData
                .connection(`Ambulnz_UserOrders`)
                .select()
                .where({user_id});
            return orders;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }
}