import { Express, Application } from "express";
import logger from "morgan";
import { uploadMiddleware, uploadController } from "../rest/upload";

export default (express: Application) => {
  express.use(logger("dev"));

  // Set uploader
  express.post("/api/uploadPhoto", uploadMiddleware, uploadController);
};
