import serverLoader from "./loaders";
import config from "./config";

async function startServer() {
  const server = serverLoader();
  server.start({ port: config.port }, () => {
    console.log(
      `🔥  Server running on the port http://localhost:${config.port}`
    );
  });
}

startServer();
