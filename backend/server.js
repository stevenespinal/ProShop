import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

const port = process.env.PORT || 5000;
import connectDb from "./config/db.js";
import product from "./routes/product.js";
import user from "./routes/user.js"
import order from "./routes/order.js"
import path from "path";
import upload from "./routes/upload.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();

const app = express();
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/api/products", product);
app.use("/api/users", user);
app.use("/api/orders", order);
app.use("/api/upload", upload);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
const __dirname = path.resolve();

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));