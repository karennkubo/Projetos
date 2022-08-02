export class Befriending {

    constructor(
        private user_id: string,
        private user_befriended: string
    ) { }

    public getUserId(): string {
        return this.user_id;
    }
    public getUserBefriended(): string {
        return this.user_befriended;
    }
}
