// const express = require('express');
import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteAll,
  deleteOne,
} from "../controllers/base.controller.js";

const router = express.Router();

// create new
router.post("/", create);

// get all
router.get("/", findAll);

// get one via id
router.get("/:id", findOne);

// update one
router.put("/:id", update);

// delete all
router.delete("/", deleteAll);

// delete one via id
router.delete("/:id", deleteOne);

export default router;
