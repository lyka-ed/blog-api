import Blog from "./__def__/blog.models.js";

// Create a blog
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

// Fetch all blogs
export const getAllBlogsService = async ({
  order,
  order_by,
  page,
  limit,
  state,
  authorId,
}) => {
  try {
    const query = { author: authorId };
    const skip = (page - 1) * limit;

    if (state) query.state = state;

    const blogs = await Blog.find(query)
      .populate("author")
      .sort([[order_by, order]])
      .skip(skip)
      .limit(limit);
    const allCount = await Blog.countDocuments(query);

    return { blogs, allCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch all published blogs
export const getAllPublishedBlogsService = async (page, limit, order, order_by, searchParams) => {
  try {
    const query = { state: "published" };
    const skip = (page - 1) * limit;

    if (searchParams) {
      if (searchParams.author) {
        const authorIds = await User.find({
          $or: [
            { firstname: { $regex: new RegExp(searchParams.author, "i") } },
            { lastname: { $regex: new RegExp(searchParams.author, "i") } },
          ],
        }).select("_id");

        query.author = { $in: authorIds.map((author) => author._id) };
      }
      if (searchParams.title) query.title = { $regex: new RegExp(searchParams.title, "i") };
      if (searchParams.tags) query.tags = { $in: new RegExp(searchParams.tags, "i") };
    }

    const blogs = await Blog.find(query).populate("author").skip(skip).limit(limit).sort([[order_by, order]]);
    const allCount = await Blog.countDocuments(query);

    return { blogs, allCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

