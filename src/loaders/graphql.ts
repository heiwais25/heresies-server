import config from "../config";
import { GraphQLSchema } from "graphql";
import { GraphQLServer } from "graphql-yoga";

export default (schema: GraphQLSchema) => {
  const server = new GraphQLServer({
    schema
  });

  return server;
};
