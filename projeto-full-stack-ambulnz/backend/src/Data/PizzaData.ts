import { Pizza, Ingredient} from './../Model/Pizza';
import { CustomError } from '../Error/CustomError';
import { BaseDatabase } from './BaseDatabase';

export class PizzaData extends BaseDatabase {
    createPizza = async (data:Pizza) => {
        try {
            await PizzaData
            .connection(`Ambulnz_Pizza`)
            .insert({
                id: data.getId(),
                name: data.getName(),
                price: data.getPrice(),
                photo_link: data.getPhotoLink()
            });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    createIngredient = async (data:Ingredient) => {
        try {
            await PizzaData
            .connection(`Ambulnz_Ingredient`)
            .insert({
                id: data.getId(),
                name: data.getName()
            });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    addIngredientsToPizza = async (pizza_id:string, ingredient_id:string) => {
        try {
            await PizzaData
            .connection(`Ambulnz_PizzaIngredients`)
            .insert({
                pizza_id,
                ingredient_id
            });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getPizza = async (id:string) => {
        try {
            const pizza = await PizzaData
            .connection(`Ambulnz_Pizza`)
            .select()
            .where({id});
            return pizza[0];
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getPizzaByName = async (name:string) => {
        try {
            const pizza = await PizzaData
            .connection(`Ambulnz_Pizza`)
            .select()
            .where({name});
            return pizza;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getAllPizzas = async () => {
        try {
            const pizzas = await PizzaData
            .connection(`Ambulnz_Pizza`)
            .select();
            return pizzas;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getIngredient = async (id:string) => {
        try {
            const ingredient = await PizzaData
            .connection(`Ambulnz_Ingredient`)
            .select()
            .where({id});
            return ingredient;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getIngredientByName = async (name:string) => {
        try {
            const ingredient = await PizzaData
            .connection(`Ambulnz_Ingredient`)
            .select()
            .where({name});
            return ingredient;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    getAllIngredients = async () => {
        try {
            const ingredients = await PizzaData
            .connection(`Ambulnz_Ingredient`)
            .select();
            return ingredients;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    };

    joinIngredientsAndPizza =async (pizza_id:string) => {
        try {
            const ingredients = await PizzaData
            .connection
            .select(`Ambulnz_Ingredient.name`)
            .from(`Ambulnz_PizzaIngredients`)
            .innerJoin(`Ambulnz_Pizza`, `Ambulnz_Pizza.id`, `Ambulnz_PizzaIngredients.pizza_id`)
            .innerJoin(`Ambulnz_Ingredient`, `Ambulnz_Ingredient.id`, `Ambulnz_PizzaIngredients.ingredient_id`)
            .where(`Ambulnz_Pizza.id`, `=`, `${pizza_id}`);
            const ingredientsNames = [];
            if (ingredients.length>0) {
                for (let ingredient of ingredients) {
                    ingredientsNames.push(ingredient.name)
                }
            }
            return ingredientsNames;
        } catch (error:any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }
}