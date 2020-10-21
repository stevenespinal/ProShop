import express from "express";
import {addOrderItems, getOrderId} from "../controllers/order.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderId)

export default router