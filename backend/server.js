import express from "express";
import dotenv from "dotenv";
import colors from "colors";
const port = process.env.PORT || 5000;
import connectDb from "./config/db.js";
import product from "./routes/product.js";
import user from "./routes/user.js"
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/products", product);
app.use("/api/users", user);
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));