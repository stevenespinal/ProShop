import express from "express";
import {addOrderItems, getAllOrders, getMyOrders, getOrderId, updateOrderToPaid} from "../controllers/order.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/myorders").get(protect, getMyOrders);
router.route("/").get(protect, isAdmin, getAllOrders).post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderId);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router