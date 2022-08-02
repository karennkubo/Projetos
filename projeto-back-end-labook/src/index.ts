import { CommentController } from './controller/CommentController';
import { LikesController } from './controller/LikesController';
import { LikesData } from './data/LikesData';
import { BefriendingController } from './controller/BefriendingController';
import  BefriendingBusiness  from './business/BefriendingBusiness';
import { PostController } from './controller/PostController';
import { PostData } from './data/PostData';
import { PostBusiness } from './business/PostBusiness';
import { UserController } from './controller/UserController';
import { IdGenerator } from './services/IdGenerator';
import { UserBusiness } from './business/UserBusiness';
import { app } from "./app";
import { UserData } from './data/UserData';
import { HashManager } from './services/HashManager';
import { Authenticator } from './services/Authenticator';
import { BefriendingData } from './data/BefriendingData';
import LikesBusiness from './business/LikesBusiness';
import CommentBusiness from './business/CommentBusiness';
import { CommentData } from './data/CommentData';
//USER
const userBusiness = new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
);
const userController = new UserController(
    userBusiness
);
app.post("/user/signup", userController.signUp)
app.post("/user/login", userController.login)
//POST
const postBusiness = new PostBusiness(
    new PostData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
)
const postController = new PostController(
    postBusiness
)
app.post("/post", postController.post)
app.get("/post/:id", postController.getPostById)
app.get("/posts/:type", postController.getPostByType)
app.get("/posts", postController.getPostsPerPage)
//FRIENDS
const befriendingBusiness = new BefriendingBusiness(
    new BefriendingData(),
    new UserData(),
    new Authenticator()
)
const befriendingController = new BefriendingController (
    befriendingBusiness
)
app.post("/user/connections", befriendingController.befriend)
app.delete("/user/connections", befriendingController.split)
app.get("/user/feed", befriendingController.getFeed)
//LIKES
const likesBusiness = new LikesBusiness(
    new LikesData(),
    new PostData(),
    new Authenticator()
)
const likesController = new LikesController(
    likesBusiness
)
app.post("/user/like", likesController.like)
app.delete("/user/like", likesController.dislike)
//COMMENTS
const commentBusiness = new CommentBusiness(
    new CommentData(),
    new PostData(),
    new Authenticator(),
    new IdGenerator()
)
const commentController = new CommentController(
    commentBusiness
)
app.post("/post/comments", commentController.comment)
