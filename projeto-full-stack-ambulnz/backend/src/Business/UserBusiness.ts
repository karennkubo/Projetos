import { PizzaData } from './../Data/PizzaData';
import { CustomError } from './../Error/CustomError';
import { InputSignUp, User, InputLogin, InputOrder, UserOrders } from './../Model/User';
import { TokenGenerator } from './../Services/TokenGenerator';
import { IdGenerator } from './../Services/IdGenerator';
import { HashManager } from './../Services/HashManager';
import { UserData } from './../Data/UserData';

export class UserBusiness {
    constructor(
        private userData: UserData,
        private pizzaData:PizzaData,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator
    ) { }

    signUp = async (data: InputSignUp) => {
        try {
            const { name, email, password } = data;
            if (!name || !email || !password) {
                throw new CustomError(422, `Name, email and password have to be informed!`);
            };

            if (password.length < 10) {
                throw new CustomError(422, "Set Minimum password length to at least a value of 10");
            };
            
            if (!email.includes("@") || !email.includes(".com")) {
                throw new CustomError(422, "Invalid email");
            };

            const user = await this.userData.findUser(email);
            if(user){
                throw new CustomError(401, `This e-mail is already registered!`)
            };

            const id = this.idGenerator.generate();

            const hashPassword = await this.hashManager.hash(password);

            const newUser = new User(
                id,
                name,
                email,
                hashPassword
            )

            await this.userData.signup(newUser);

            const token = this.tokenGenerator.generate({id});

            return token;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    login = async (data: InputLogin) => {
        try {
            const { email, password } = data;
            if (!email || !password) {
                throw new CustomError(422, `Email and password have to be informed!`);
            };

            if (!email.includes("@") || !email.includes(".com")) {
                throw new CustomError(422, "Invalid email");
            };

            const user = await this.userData.findUser(email);
            if(!user){
                throw new CustomError(404, `User not found!`);
            };

            const passwordIsCorrect = await this.hashManager.compareHash(password, user.password);

            if(!passwordIsCorrect) {
                throw new CustomError(401, `Invalid credentials!`);
            };

            const token = this.tokenGenerator.generate({id: user.id});

            return token;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    order = async (data: InputOrder) => {
        try {
            const { token, pizza_id, quantity} = data;
            if (!pizza_id || !quantity) {
                throw new CustomError(422, `pizza_id and quantity have to be informed!`);
            };

            if (!token) {
                throw new CustomError(422, "Token has to be informed on headers as authorization");
            };

            if (isNaN(quantity) || !Number.isInteger(quantity) || quantity<=0) {
                throw new CustomError(401, `Quantity has to be an integer number (higher than 0)`);
            };

            const pizzaExists = await this.pizzaData.getPizza(pizza_id);
            if (!pizzaExists) {
                throw new CustomError(404, `Pizza was not found!`);
            };
            const pizza_name = pizzaExists.name;
            const user = this.tokenGenerator.verify(token);
            if(!user){
                throw new CustomError(404, `User not found!`);
            };
            const user_id = user.id;
            const ordered_at = new Date(Date.now());
            const newOrder = new UserOrders(user_id, pizza_id, quantity, ordered_at, pizza_name);

            await this.userData.order(newOrder);

            return newOrder;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    getOrders = async (token:string) => {
        try {
           
            if (!token) {
                throw new CustomError(422, "Token has to be informed on headers as authorization");
            };

            const user = this.tokenGenerator.verify(token);
            if(!user){
                throw new CustomError(404, `User not found!`);
            };
            const user_id = user.id;
            
            const response = await this.userData.selectAllOrders(user_id);
            if(response.length===0) {
                throw new CustomError(404, `No orders were found!`)
            }
            
            return response;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}