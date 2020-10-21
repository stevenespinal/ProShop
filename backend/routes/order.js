import express from "express";
import {addOrderItems, getOrderId, updateOrderToPaid} from "../controllers/order.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderId);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router