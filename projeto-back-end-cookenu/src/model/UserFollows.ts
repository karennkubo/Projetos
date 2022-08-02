export class UserFollows {
    constructor(
        private id:string,
        private user_id:string,
        private user_followed:string
    ) {};
    
    public getId():string{
        return this.id;
    };
    public getUserId():string{
        return this.user_id;
    };
    public getUserFollowed():string{
        return this.user_followed;
    };
    static toUserFollows(data:any):UserFollows{
        return new UserFollows(data.id, data.user_id, data.user_followed)
    };
}