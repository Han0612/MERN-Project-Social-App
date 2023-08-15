import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/uesrs.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()

/* READ */
router.get("/:id", getUser)
router.get("/:id/friends", getUserFriends)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router