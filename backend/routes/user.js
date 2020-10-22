import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser
} from "../controllers/user.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/").get(protect, isAdmin, getAllUsers);
router.route("/").post(registerUser);
router.route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);
router.post("/login", authUser);

export default router;