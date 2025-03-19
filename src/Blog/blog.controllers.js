import { createBlogService, getAllBlogsService, getAllPublishedBlogsService } from "./blog.services.js";

export const createBlog = async (req, res) => {
  try {
    const blog = await createBlogService(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogsService(req.query);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllPublishedBlogs = async (req, res) => {
  try {
    const { page, limit, order, order_by, searchParams } = req.query;
    const blogs = await getAllPublishedBlogsService(page, limit, order, order_by, searchParams);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
