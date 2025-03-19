/*
THIS FILE IS TO LOAD ALL ROYUTES INTO ONE TO 
BE ACCESS IN THE sever.js file @ROOT DIRECTORY.
**/

import express from "express";
import authRoutes from "../src/Auths/auth.routes.js";
import blogRoutes from "../src/Blog/blog.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("blog", blogRoutes);

export default router;
