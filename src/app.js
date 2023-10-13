const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({
  path: "config.env",
});
require("./db/mongoose");
app.use(express.json());
app.use(cors());
app.use(helmet());

const userRouter = require("./routers/user");
const categoryRouter = require("./routers/category");
const subCategoryRouter = require("./routers/subCategory");
const roomRouter = require("./routers/room");
const orderRouter = require("./routers/order");
app.use(userRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(roomRouter);
app.use(orderRouter);

app.all("*", (req, res, next) => {
  next(new Error(`Con't find this route: ${req.originalUrl}`));
});
const port = process.env.PORT || 8500;
app.listen(port, () => {
  console.log("Server is running");
});
