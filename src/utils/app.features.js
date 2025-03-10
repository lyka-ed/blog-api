// Calculate REadinmg Time
export const getReadingTime = (blogContent) => {
  if (!blogContent || typeof blogContent !== "string") {
    throw new Error("Invalid blog content");
  }

  const wordsPerMinute = 200;
  const wordCount = blogContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Wrapper for async functions to catch error and pass them to error handler middleware
export const wrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
