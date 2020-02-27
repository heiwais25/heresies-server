import graphqlServer from "./graphql";
import schemaLoader from "./schema";
import expressLoader from "./express";

export default () => {
  const schema = schemaLoader();

  const server = graphqlServer(schema);

  expressLoader(server.express);

  return server;
};
