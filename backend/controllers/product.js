import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({message: "Product removed."});
  } else {
    res.status(404);
    throw new Error("Product does not exist.");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const {name, image, brand, category, description, price, reviews, rating, numReviews, countInStock} = req.body;
  const newProduct = await Product.create({
    user,
    name,
    image,
    brand,
    category,
    description,
    price,
    reviews,
    rating,
    numReviews,
    countInStock
  });

  if (newProduct) {
    res.status(201).json({
      user: newProduct.user,
      name: newProduct.name,
      image: newProduct.image,
      brand: newProduct.brand,
      category: newProduct.category,
      description: newProduct.description,
      price: newProduct.price,
      reviews: newProduct.reviews,
      rating: newProduct.rating,
      numReviews: newProduct.numReviews,
      countInStock: newProduct.countInStock
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data.");
  }

})