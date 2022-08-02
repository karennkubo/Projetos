export class User {
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string
    ) {}
    public getId = ():string => {
        return this.id;
    };
    public getName = ():string => {
        return this.name;
    };
    public getEmail = ():string => {
        return this.email;
    };
    public getPassword = ():string => {
        return this.password;
    };
};

export class UserOrders {
    constructor(
        private user_id:string,
        private pizza_id:string,
        private quantity:number,
        private ordered_at:Date,
        private pizza_name:string
    ) {}
    public getUserId = ():string => {
        return this.user_id;
    };
    public getPizzaId = ():string => {
        return this.pizza_id;
    };
    public getPizzaName = ():string => {
        return this.pizza_name;
    };
    public getQuantity = ():number => {
        return this.quantity;
    };
    public getOrderedAt = ():Date => {
        return this.ordered_at;
    };
};

export type InputLogin = {
    email:string,
    password:string
}

export type InputSignUp = {
    name:string,
    email:string,
    password:string
}

export type InputOrder = {
    token:string,
    pizza_id:string,
    quantity:number
}