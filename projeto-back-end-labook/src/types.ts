export enum TYPE {
    NORMAL = "NORMAL",
    EVENTO = "EVENTO"
}

export type InputSignUp = {
    name:string,
    email:string,
    password:string
}

export type InputLogin = {
    email:string,
    password:string
}

export type InputCreatePost = {
    photo:string,
    description:string,
    createdAt:string,
    type:TYPE
}

export type InputBefriend = {
    user_befriended:string
}

export type InputLike = {
    post_id:string
}

export type InputComments = {
    post_id:string,
    comment:string
}
