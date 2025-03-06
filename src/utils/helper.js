import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//GENERATE ACCESS TOKEN
export function generateAccessToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured in .env file");
  }
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    algorithm: "HS256",
  });
}

// VERIFY ACCESS TOKEN
export function verifyAccessToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured in .env file");
  }
  return jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Access token expired, please refresh your token");
      }
      throw new Error("Invalid access token");
    }
    return decoded;
  });
}


