import { InputSignUp, InputLogin } from './../types';
import { Authenticator } from './../services/Authenticator';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserData } from './../data/UserData';
import { User } from '../model/User';


export class UserBusiness {
    constructor(
        private userData:UserData,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator
    ){}
//SIGN UP
    signup = async(inputSignUp:InputSignUp) => {
        const {name, email, password} = inputSignUp;

        if (!name || !email || !password) {
            throw new Error (`Preencha os campos corretamente!`)
        }

        const accountExists = await this.userData.findAccountByEmail(email);
        if (accountExists.length>0) {
            throw new Error (`Email já consta no nosso banco de dados.`)
        }

        if(password.length<=6) {
            throw new Error(`A senha deve ter mais que 6 caracteres`)
        }
        
        const id = this.idGenerator.generateId();

        const hashedPassword = await this.hashManager.hash(password);

        const user = new User (
            id,
            name,
            email,
            hashedPassword
        )

        await this.userData.insert(user);

        const token = this.authenticator.generateToken({id});

        return token;
    }
//LOGIN
    login = async(inputLogin:InputLogin) => {
        const {email, password} = inputLogin;

        if (!email || !password) {
            throw new Error (`Preencha os campos corretamente!`)
        }

        const [accountExists] = await this.userData.findAccountByEmail(email);
        if (!accountExists) {
            throw new Error (`Usuário não existe no nosso banco de dados.`)
        }
        const compare = this.hashManager.compare(password, accountExists.password);

        if (!compare) {
            throw new Error(`Campos incorretos!`)
        }

        const {id} = accountExists;

        const token = this.authenticator.generateToken({id});
        
        return token;
    }
}