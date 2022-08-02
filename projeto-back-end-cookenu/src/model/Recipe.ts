export class Recipe {
    constructor(
        private id:string,
        private title:string,
        private description:string,
        private createdAt:Date,
        private user_id: string
    ) {};
    
    public getId():string{
        return this.id;
    };
    public getTitle():string{
        return this.title;
    };
    public getDescription():string{
        return this.description;
    };
    public getCreatedAt():Date{
        return this.createdAt;
    };
    public getUserId():string{
        return this.user_id;
    };
    static toRecipeModel(data:any):Recipe{
        return new Recipe(data.id, data.title, data.description, data.createdAt, data.user_id)
    };
}