import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("❌ Couldn't find .env file");
}

const requiredFields = [
  "JWT_SCRET",
  "PRISMA_ENDPOINT",
  "AWS_KEY",
  "AWS_SECRET",
  "SENDGRID_USERNAME",
  "SENDGRID_PASSWORD",
  "ADMIN_EMAIL"
];

const checkValidConfig = () => {
  if (requiredFields.some(field => !process.env[field])) {
    console.log(`Required fields ${requiredFields}`);
    throw new Error("Invalid Configuration");
  }
};

checkValidConfig();

export default {
  port: parseInt(process.env.PORT || "4000"),
  jwtSecret: process.env.JWT_SCRET || "",
  accessKeyId: process.env.AWS_KEY || "",
  secretAccessKey: process.env.AWS_SECRET || "",
  sendgridUsername: process.env.SENDGRID_USERNAME || "",
  sendgridPassword: process.env.SENDGRID_PASSWORD || "",
  adminMail: process.env.ADMIN_EMAIL || ""
};
