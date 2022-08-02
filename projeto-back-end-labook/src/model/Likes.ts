export class Likes {

    constructor(
        private author_id: string,
        private post_id: string,
        private liked:boolean
    ) { }

    public getAuthorId(): string {
        return this.author_id;
    }
    public getPostId(): string {
        return this.post_id;
    }
    public getLiked(): boolean {
        return this.liked;
    }

}
