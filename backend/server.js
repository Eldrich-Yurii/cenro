import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import baseRoutes from "./routes/base.routes.js";
import authRoutes from "./routes/auth.routes.js"
import { createDefaultAdmin } from "./middlewares/auth/auth.createDefaultAdmin.js";

// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser')
// const dotenv = require('dotenv')
// const cors = require('cors');
// const mongoose = require('mongoose')

dotenv.config(); // load variable -- yung nakalagay sa .env

const app = express();

//connection to frontend
// const corsOption = {
//   origin: [ "http://localhost:5173"],
//   credentials: true,
// }
// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);

// app.get('/', (req, res) => {
//     res.send('Hello Welcome to CENRO')
// })

// routes
// require('./routes/base.routes')(app);
// app.use("/api/baseRoute", baseRoutes);
app.use("/api/auth", authRoutes);

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // create default admin
    await createDefaultAdmin();
  }).catch((err) => console.log(err))

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});
