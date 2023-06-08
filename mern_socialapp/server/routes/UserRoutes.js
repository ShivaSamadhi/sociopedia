import express from "express";
import { getUser, getUserFriends, addRemoveFriend} from "../controllers/UserController.js"
import {verifyToken} from "../middleware/AuthMiddleware.js";

const router = express.Router()

//READ ROUTES
router.get(`/:userID`, verifyToken, getUser)

router.get(`/:userID/friends`, verifyToken, getUserFriends)

//UPDATE ROUTES
router.patch(`/:userID/:friendID`, verifyToken, addRemoveFriend)

// router.patch(`/:id/password`, verifyToken, updatePassword)

export default router