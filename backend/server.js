const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");

const cloudinary = require("cloudinary");

//Handling Uncaught Exception //Error handler
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connect DataBase
connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(youtube);

app.listen(process.env.PORT, (req, res) => {
  console.log(
    `SERVER SUCCESSFULLY RUN on http://localhost:${process.env.PORT} `
  );
});

///======================================================

// const server = app.listen(process.env.PORT, (req, res) =>{
//   console.log(`SERVER SUCCESSFULLY RUN on http://localhost:${process.env.PORT} `)
// });

// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
// console.log("Shutting down the server due to unhandled Promise Rejections");
//   server.close(() =>{
//     process.exit(1);
//   })
// })
