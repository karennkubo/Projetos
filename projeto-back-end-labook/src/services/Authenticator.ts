import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../model/AuthenticationData";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
    
    generateToken = (input:AuthenticationData):string => {
        const token = jwt.sign(
            {
                id:input.id
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        );
        return token;
    }

    getData = (token:string):AuthenticationData => {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const result = {
            id: payload.id
        };
        return result;
    }
}