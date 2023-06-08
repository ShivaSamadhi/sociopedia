import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/PostController.js"
import {verifyToken} from "../middleware/AuthMiddleware.js";

const router = express.Router()


//READ ROUTES
router.get('/', verifyToken, getFeedPosts)
router.get(`/:userID`, verifyToken, getUserPosts)

//UPDATE ROUTES
router.patch(`/:postID/likes`, verifyToken, likePost)

//DELETE ROUTES


export default router