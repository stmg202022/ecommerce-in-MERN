const express = require("express");
const app = express();
// const errorMiddleware = require("./middleware/error")
app.use(express.json())

//routes Import 
const productRouter = require("./routes/productRoute")

//app connecting with routes
app.use("/api/v1", productRouter.router)

//middleWare for Errors
// app.use(errorMiddleware);


module.exports = app;