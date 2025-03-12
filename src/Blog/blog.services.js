import Blog from "./__def__/blog.models.js";

export const createBlogService = async (userId, data) => {
  try {
    const newBlog = await new Blog({ ...data, author: userId }).populate(
      "author"
    );
    await newBlog.save();
    return newBlog;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Blog already exists");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllBlogService = async ({
  order = "desc", 
  order_by = "createdAt", 
  page = 1,
  limit = 10, 
  state,
  authorId
}) => {
  try {
    const query = {}
    if()
  }
}