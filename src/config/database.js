import mongoose from "mongoose";
import colors from "colors";

export const connectMongoDb = async (DATABASE_URL) => {
  if (!DATABASE_URL) {
    console.log(colors.bgYellow("DATABASE_URL not provided"));
    process.exit(1);
  }

  try {
    await mongoose.connect(DATABASE_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log(colors.bgGreen("Connected to MongoDB"));
  } catch (err) {
    console.error(colors.bgRed("Error connecting to MongoDB Atlas:", err));
    process.exit(1);
  }
};
