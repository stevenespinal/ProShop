import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import Product from "./models/Product.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(p => {
      return {
        ...p,
        user: adminUser
      }
    });

    await Product.insertMany(sampleProducts);
    console.log(`Data imported successfully`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data destroyed `.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}