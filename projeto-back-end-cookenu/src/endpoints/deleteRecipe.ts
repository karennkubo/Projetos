import { Recipe } from './../model/Recipe';
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { RecipeDatabase } from '../data/RecipeDatabase';

export async function deleteRecipe(req:Request, res:Response) {
    let errorCode:number = 400;
    try {
        const token = req.headers.authorization;
        const id = req.params.id;
        
        if(!token) {
            errorCode=422;
            throw new Error(`O endpoint exige uma autorização nos headers`)
        }
        if (!id) {
            errorCode=422;
            throw new Error(`Por favor, informe o id corretamente nos parâmetros`)
        }
        
        const authenticator = new Authenticator();
        const data = authenticator.getTokenData(token);
        if (!data) {
            errorCode=401;
            throw new Error(`Usuário não encontrado!`)
        }
        const recipeDatabase = new RecipeDatabase;
        if (data.role === "ADMIN") {            
            await recipeDatabase.delete(id);
        } else {
            const recipe = await recipeDatabase.getRecipeId(id);
            if(recipe.user_id !== data.id) {
                errorCode=401;
                throw new Error(`Você não pode alterar uma receita que não criou!`)
            }
            await recipeDatabase.delete(id);
        }
        res.status(200).send(`Receita ${id} deletada com sucesso!`)
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}