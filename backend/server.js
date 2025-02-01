import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import baseRoutes from "./routes/base.routes.js";

// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser')
// const dotenv = require('dotenv')
// const cors = require('cors');
// const mongoose = require('mongoose')

dotenv.config(); // load variable -- yung nakalagay sa .env

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//     res.send('Hello Welcome to CENRO')
// })

// routes
// require('./routes/base.routes')(app);
app.use("/api/baseRoute", baseRoutes);

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error", err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});
