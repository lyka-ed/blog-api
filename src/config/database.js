import mongoose from "mongoose";
import colors from "colors";
import { ENVIRONMENT } from "./environment.js";

export const connectMongoDb = async (DATABASE_URL) => {
  try {
    await mongoose.connect(ENVIRONMENT.DB.URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log(colors.bgGreen("Connected to MongoDB"));
  } catch (err) {
    console.error(colors.bgRed("Error connecting to MongoDB Atlas:", err));
    process.exit(1);
  }
};
