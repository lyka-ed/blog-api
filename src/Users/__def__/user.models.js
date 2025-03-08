import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [
        function () {
          return this.authMethod === "local";
        },
        "First name is required",
      ],
      trim: true,
    },

    lastName: {
      type: String,
      required: [
        function () {
          return this.authMethod === "local";
        },
        "Last name is required",
      ],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },

    password: {
      type: String,
      trim: true,
      required: [
        function () {
          return this.authMethod === "local";
        },
        "Password is required",
      ],
    },

    authMethod: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
