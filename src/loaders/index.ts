import graphqlServer from "./graphql";
import schemaLoader from "./schema";
import expressLoader from "./express";

export default () => {
  const schema = schemaLoader();

  const server = graphqlServer(schema);
  console.log("🔥 Graphql server is prepared");

  expressLoader(server.express);
  console.log("🔥 Express Server is prepared");

  return server;
};
