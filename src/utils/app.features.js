export const getReadingTime = (blogContent) => {
  if (!blogContent || typeof blogContent !== "string") {
    throw new Error("Invalid blog content");
  }

  const wordsPerMinute = 200;
  const wordCount = blogContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
