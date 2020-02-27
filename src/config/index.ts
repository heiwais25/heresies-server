import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("❌ Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT || "4000"),
  jwtSecret: process.env.JWT_SCRET
};
