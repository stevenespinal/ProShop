import express from "express";
import {getProducts, getProductById, deleteProductById, createProduct, updateProduct} from "../controllers/product.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/:id").get(getProductById).delete(protect, isAdmin, deleteProductById).put(protect, isAdmin, updateProduct);

export default router;