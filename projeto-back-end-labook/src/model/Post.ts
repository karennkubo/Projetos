import { TYPE } from './../types';
export class Post {
    constructor(
        private id:string,
        private photo:string,
        private description:string,
        private createdAt:Date,
        private type:TYPE,
        private author:string         
    ) {}
}
