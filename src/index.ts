import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./Presentation/Routes/index.js";
import { initializeMikroORM } from "./Infrastructure/Persistance/Sqlite/MikroORM/mikro-orm.config.js";

const app = express();


initializeMikroORM();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

export default app;
const port = 4000;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
