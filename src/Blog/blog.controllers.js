import { createBlogService } from "./blog.services.js";

export const createBlog = async (req, res) => {
  const blog = await createBlogService(req.user.id, req.body);

  if (blog) {
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  }
};
