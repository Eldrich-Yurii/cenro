import express from "express";
import { getFaqs } from "../controllers/getFaqs.controller.js";

const router = express.Router();

router.get("/get-faqs", getFaqs)

export default router;