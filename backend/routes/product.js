import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview,
  deleteReview
} from "../controllers/product.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/:id").get(getProductById).delete(protect, isAdmin, deleteProductById).put(protect, isAdmin, updateProduct);
router.route("/:id/review").post(protect, createReview).delete(protect, deleteReview);
export default router;