import express from "express";
import { config } from "./config.ts";
const app = express();

import invoicehiveRoutes from "./invoicehive/router.ts";

app.use("/invoicehive", invoicehiveRoutes);

app.listen(config.port, () => {
  console.log(`Home server listening on port: ${config.port}`);
});
