import { Express, Application } from "express";
import logger from "morgan";

export default (express: Application) => {
  express.use(logger("dev"));
};
