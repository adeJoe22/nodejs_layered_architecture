import { dbConnection } from "./config/db";
import { envVariables } from "./config/envVariable";
import app from "./expressApp";
const PORT = envVariables.port;

export const server = async () => {
  await dbConnection();
  app.listen(PORT, () => {
    console.log("Express listening on " + PORT);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

server().then(() => {
  console.log("Server is live");
});
