import express from "express";
import {
  createBlog,
  getAllBlogs,
  getAllPublishedBlogs,
} from "./blog.controllers.js";
import { wrapper } from "../utils/app.features.js";

const router = express.Router();

router.get("/create", wrapper(createBlog));
router.get("/all", wrapper(getAllBlogs));
router.get("/published", wrapper(getAllPublishedBlogs));

export default router;
