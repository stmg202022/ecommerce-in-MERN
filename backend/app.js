const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(cors());
app.use(cookieParser());

const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

const errorMiddleware = require("./middleware/error");
app.use(express.json());

//routes Import
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRoute");
const paymentRouter = require("./routes/paymentRoute");

//app connecting with routes
app.use("/api/v1", productRouter.router);
app.use("/api/v1", userRouter.router);
app.use("/api/v1", orderRouter.router);
app.use("/api/v1", paymentRouter.router);

//middleWare for Errors
app.use(errorMiddleware);

module.exports = app;
