import { Recipe } from './../model/Recipe';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { RecipeDatabase } from '../data/RecipeDatabase';

export async function modifyRecipe(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const token = req.headers.authorization;
        const id = req.params.id;
        const {title, description} = req.body;
        if(!token) {
            errorCode=422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        if (!id) {
            errorCode=422;
            throw new Error(`Por favor, informe o id corretamente nos parâmetros`)
        }
        if(!title || !description) {
            throw new Error(`Por favor, informe as alterações no body de title e description`)
        }
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);
        if (!data) {
            errorCode=401;
            throw new Error(`Usuário não encontrado!`)
        }

        const recipeDatabase = new RecipeDatabase();
        const createdAt = new Date(Date.now());
        const user_id = data.id;
        const recipe = await recipeDatabase.getRecipeId(id);
        const changedRecipe:Recipe = new Recipe(id, title, description, createdAt, user_id)
        
        if(recipe.user_id !== data.id) {
            errorCode=401;
            throw new Error(`Você não pode alterar uma receita que não criou!`)
        }
        
        const modifiedRecipe = await recipeDatabase.changeRecipe(changedRecipe);

        res.status(200).send({recipe: changedRecipe})
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}