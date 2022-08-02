import { Befriending } from './../model/Befriending';
import { UserData } from './../data/UserData';
import { BefriendingData } from './../data/BefriendingData';
import { InputBefriend } from './../types';
import { Authenticator } from './../services/Authenticator';

export default class BefriendingBusiness {
    constructor(
        private befriendingData: BefriendingData,
        private userData: UserData,
        private authenticator: Authenticator
    ) { }
    //Befriending
    befriend = async (inputBefriend: InputBefriend, token: string) => {
        const { user_befriended } = inputBefriend;

        if (!user_befriended) {
            throw new Error(`Preencha o id da pessoa a ser seguida corretamente!`)
        }

        if (!token) {
            throw new Error(`Forneça o token no campo headers corretamente!`)
        }
        const data = this.authenticator.getData(token);

        if (!data) {
            throw new Error(`Usuário não encontrado!`)
        }

        const findingUserToBefriend = await this.userData.findAccountById(user_befriended);
        if (!findingUserToBefriend) {
            throw new Error(`Usuário a ser seguido não encontrado`)
        }

        const newFriendship = new Befriending(
            data.id,
            user_befriended
        )

        const connectionExists = await this.befriendingData.findingConnection(newFriendship)
        if(connectionExists.length>0) {
            throw new Error(`Você já segue essa pessoa!`)
        }

        await this.befriendingData.befriend(newFriendship);

        return newFriendship;
    }
    //Split
    split = async (inputBefriend: InputBefriend, token: string) => {
        const { user_befriended } = inputBefriend;

        if (!user_befriended) {
            throw new Error(`Preencha o id da pessoa a ser deixada de seguir corretamente!`)
        }

        if (!token) {
            throw new Error(`Forneça o token no campo headers corretamente!`)
        }
        const data = this.authenticator.getData(token);

        if (!data) {
            throw new Error(`Usuário não encontrado!`)
        }
        const cancellingFriendship = new Befriending(
            data.id,
            user_befriended
        )
        const findingUserToBefriend = await this.befriendingData.findingConnection(cancellingFriendship);

        if (findingUserToBefriend.length===0) {
            throw new Error(`Usuário a ser deixado de seguir não encontrado`)
        }        

        const connectionExists = await this.befriendingData.findingConnection(cancellingFriendship)
        if(!connectionExists) {
            throw new Error(`Você não seguiu essa pessoa!`)
        }

        await this.befriendingData.split(cancellingFriendship);

        return cancellingFriendship;
    }

    //get feed from friends
    getFeed = async(token:string) => {
        if (!token) {
            throw new Error(`Forneça o token no campo headers corretamente!`)
        }
        const data = this.authenticator.getData(token);

        if (!data) {
            throw new Error(`Usuário não encontrado!`)
        }

        const feed = await this.befriendingData.findPostsFromFriends(data.id);

        return feed;
    }
}
