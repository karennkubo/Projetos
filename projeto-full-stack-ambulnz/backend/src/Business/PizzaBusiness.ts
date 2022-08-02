import { CustomError } from './../Error/CustomError';
import { InputCreatePizza, isImage, Pizza, Ingredient, InputIngredientsToPizza } from './../Model/Pizza';
import { TokenGenerator } from './../Services/TokenGenerator';
import { IdGenerator } from './../Services/IdGenerator';
import { HashManager } from './../Services/HashManager';
import { PizzaData } from './../Data/PizzaData';
import { response } from 'express';
import { promisify } from 'util';

export class PizzaBusiness {
    constructor(
        private pizzaData: PizzaData,
        private idGenerator: IdGenerator,
    ) { }

    createPizza = async (data: InputCreatePizza) => {
        try {
            const { name, price, photo_link } = data;
            if (!name || !price || !photo_link) {
                throw new CustomError(422, `Name, price and photo_link have to be informed!`);
            };

            if (isNaN(price) || price <= 0) {
                throw new CustomError(401, `Price has to be a number higher than 0`);
            };

            const pizzaExists = await this.pizzaData.getPizzaByName(name);

            if (pizzaExists.length > 0) {
                throw new CustomError(401, `A pizza with this name's already registered`);
            };

            if (!isImage(photo_link)) {
                throw new CustomError(401, `This link does not have an image!`);
            };

            const id = this.idGenerator.generate();

            const newPizza = new Pizza(
                id,
                name,
                price,
                photo_link
            );

            await this.pizzaData.createPizza(newPizza);

            return newPizza;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    createIngredient = async (name: string) => {
        try {
            if (!name) {
                throw new CustomError(422, `Name has to be informed!`);
            };

            const ingredientExists = await this.pizzaData.getIngredientByName(name);
            if (ingredientExists.length > 0) {
                throw new CustomError(401, `An ingredient with this name's already registered`);
            };

            const id = this.idGenerator.generate();

            const newIngredient = new Ingredient(
                id,
                name
            );

            await this.pizzaData.createIngredient(newIngredient);

            return newIngredient;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    addIngredientsToPizza = async (data: InputIngredientsToPizza) => {
        try {
            const { pizza_id, ingredient_id } = data;

            if (!pizza_id || !ingredient_id) {
                throw new CustomError(401, `Pizza_id and ingredient_id have to be informed!`);
            };

            const pizzaExists = await this.pizzaData.getPizza(pizza_id);
            const ingredientExists = await this.pizzaData.getIngredient(ingredient_id);
            if (!pizzaExists || !ingredientExists) {
                throw new CustomError(404, `Pizza or ingredient wasn't found!`);
            };

            await this.pizzaData.addIngredientsToPizza(pizza_id, ingredient_id);

            return data;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    getAllPizzas = async () => {
        try {
            const pizzas = await this.pizzaData.getAllPizzas();

            const addingIngredients = async () => {
                const pizzaWithIngredients = [];

                for (let pizza of pizzas) {
                    const ingredients = await this.pizzaData.joinIngredientsAndPizza(pizza.id)
                        .then((response) => { return response });

                    pizzaWithIngredients.push({
                        id: pizza.id,
                        name: pizza.name,
                        price: pizza.price,
                        photo_link: pizza.photo_link,
                        ingredients: ingredients
                    });
                }
                return pizzaWithIngredients;
            }

            const response = await addingIngredients();
            return response;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    getPizzaById = async (id: string) => {
        try {
            if (!id) {
                throw new CustomError(422, `An id has to be informed!`);
            };

            const pizza = await this.pizzaData.getPizza(id);

            if (!pizza) {
                throw new CustomError(404, `Pizza wasn't found!`);
            };

            const addingIngredients = async () => {

                const pizzaWithIngredients = [];

                const ingredients = await this.pizzaData.joinIngredientsAndPizza(pizza.id)
                    .then((response) => { return response });

                pizzaWithIngredients.push({
                    id: pizza.id,
                    name: pizza.name,
                    price: pizza.price,
                    photo_link: pizza.photo_link,
                    ingredients: ingredients
                });

                return pizzaWithIngredients;
            }
            const response = await addingIngredients();
            return response;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}