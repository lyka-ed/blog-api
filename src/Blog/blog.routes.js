import express from "express";
import { createBlog } from "./blog.controllers.js";
import { wrapper } from "../utils/app.features.js";

const router = express.Router();

router.get("/create", wrapper(createBlog));

export default router;
