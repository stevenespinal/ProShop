import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice} = req.body;
  if (orderItems && orderItems.length ===0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems, shippingPrice, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, user: req.user._id
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

export const getOrderId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});
