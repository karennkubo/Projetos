export class Pizza {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private photo_link: string
    ) { };
    public getId = (): string => {
        return this.id;
    };
    public getName = (): string => {
        return this.name;
    };
    public getPrice = (): number => {
        return this.price;
    };
    public getPhotoLink = (): string => {
        return this.photo_link;
    };
};

export class Ingredient {
    constructor(
        private id: string,
        private name: string
    ) { }
    public getId = (): string => {
        return this.id;
    };
    public getName = (): string => {
        return this.name;
    };
};

export class PizzaIngredients {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private photo_link: string,
        private ingredients: string[]        
    ) { };
    public getId = (): string => {
        return this.id;
    };
    public getName = (): string => {
        return this.name;
    };
    public getPrice = (): number => {
        return this.price;
    };
    public getIngredients = (): string[] => {
        return this.ingredients;
    };
    public getPhotoLink = (): string => {
        return this.photo_link;
    };
};

export type InputCreatePizza = {
    name: string,
    price: number,
    photo_link: string
};

export type InputIngredientsToPizza = {
    pizza_id: string,
    ingredient_id: string
};

export function isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
