import express from "express";
import {authUser, getAllUsers, getUserProfile, registerUser, updateUserProfile} from "../controllers/user.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getAllUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;