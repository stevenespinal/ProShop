import express from "express";
import {authUser, getUserProfile, registerUser} from "../controllers/user.js";
import {protect} from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const user = await User.find({})
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("No users found.");
  }
})
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;