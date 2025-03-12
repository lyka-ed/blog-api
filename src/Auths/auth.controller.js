import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../Users/__def__/user.models.js";
import Token from "./__def__/auth.model.js";

// SIGN UP USER
export const signUp = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      authMethod: "local",
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      newUser,
    });
  } catch (error) {
    console.log("Error during user registration:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

//VERIFY USERS
export const verifyEmail = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(400);
      throw new Error("Invalid link");
    }

    const tokenRecord = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!tokenRecord) {
      res.status(400);
      throw new Error("Invalid or expired link");
    }

    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.findByIdAndDelete(tokenRecord._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400);
    throw new Error("An error occured");
  }
});

// LOGIN USER
// LOGIN
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { accessToken, refreshToken } = generateTokens({ id: user._id });

    // save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1hr",
    // });
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successfull",
      accessToken,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In login API",
      error,
    });
  }
});
