const express = require("express");
const cookiesParser = require("cookie-parser");
const app = express();
app.use(cookiesParser());

const errorMiddleware = require("./middleware/error");
app.use(express.json());

//routes Import
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRouter");
//app connecting with routes
app.use("/api/v1", productRouter.router);
app.use("/api/v1", userRouter.router);

//middleWare for Errors
app.use(errorMiddleware);

module.exports = app;
