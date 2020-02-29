import { Express, Application } from "express";
import logger from "morgan";
import { uploadMiddleware, uploadController } from "../rest/upload";
import { authenticateJwt } from "./passport";

export default (express: Application) => {
  express.use(logger("dev"));

  // Set uploader
  express.use(authenticateJwt);
  express.post("/api/uploadPhoto", uploadMiddleware, uploadController);
};
