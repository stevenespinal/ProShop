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

  const createdProduct = newProduct.save();
  res.json(createdProduct);
  //
  // if (newProduct) {
  //   res.status(201).json({
  //     user: newProduct.user,
  //     name: newProduct.name,
  //     image: newProduct.image,
  //     brand: newProduct.brand,
  //     category: newProduct.category,
  //     description: newProduct.description,
  //     price: newProduct.price,
  //     reviews: newProduct.reviews,
  //     rating: newProduct.rating,
  //     numReviews: newProduct.numReviews,
  //     countInStock: newProduct.countInStock
  //   });

});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {name, image, brand, category, description, price, countInStock} = req.body;
  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(400);
    throw new Error("Invalid product data.");
  }
});

export const createReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({message: "Review Added."});

  } else {
    res.status(404);
    throw new Error("Invalid product data.");
  }
});

export const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      alreadyReviewed.remove();
      res.status(200);
    } else {
      res.status(404);
      throw new Error("Review not found")
    }

    product.numReviews = product.reviews.length;
    if (product.numReviews === 0) {
      product.rating = 0;
    } else {
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    }
    await product.save();
    res.status(201).json({message: "Review Removed."});

  } else {
    res.status(404);
    throw new Error("Invalid product data.");
  }
});