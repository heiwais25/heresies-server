import { Request } from "express";

export const isAuthenticated = (request: Request) => {
  if (!request || !request.user) {
    throw Error("You need to log in to perform this action");
  }
  return;
};
