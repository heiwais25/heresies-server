import config from "../config";
import { GraphQLSchema } from "graphql";
import { GraphQLServer } from "graphql-yoga";
import { isAuthenticated } from "../middlewares";
import { Request, request } from "express";

export type Context = {
  request: Request;
  isAuthenticated: () => void;
};

export default (schema: GraphQLSchema) => {
  const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({
      request,
      isAuthenticated: () => isAuthenticated(request)
    })
  });

  return server;
};
