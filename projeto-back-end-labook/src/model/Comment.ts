export class Comment {
    constructor(
    private id:string,
    private author_id:string,
    private post_id:string,
    private comment:string){}

    getId ():string {
        return this.id;
    }
    getAuthorId ():string {
        return this.author_id;
    }
    getPostId ():string {
        return this.post_id;
    }
    getComment ():string {
        return this.comment;
    }
   
}