import express from "express";
import { getUser, getUserFriends, addRemoveFriend} from "../controllers/UserController.js"
import {verifyToken} from "../middleware/AuthMiddleware.js";

const router = express.Router()

//READ ROUTES
router.get(`/:id`, verifyToken, getUser)

router.get(`/:id/friends`, verifyToken, getUserFriends)

//UPDATE ROUTES
router.patch(`/:id/:friendId`, verifyToken, addRemoveFriend)

export default router