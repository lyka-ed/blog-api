import mongoose from "mongoose";
import { getReadingTime } from "../../utils/app.features";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: [true, "Body is required"],
      unique: true,
    },

    tags: {
      type: [String],
    },

    state: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
    },

    read_count: {
      type: Number,
      default: 0,
    },

    reading_time: {
      type: Number,
      default: 0,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

BlogSchema.pre("save", function (next) {
  if (this.isModified("body")) {
    this.reading_time = getReadingTime(this.body);
  }
  next();
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
