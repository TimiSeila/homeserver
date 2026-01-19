import express from "express";
import { config } from "./config";
const app = express();

import invoicehiveRoutes from "./invoicehive/router";

app.use("/invoicehive", invoicehiveRoutes);

app.listen(config.port, () => {
  console.log(`Home server listening on port: ${config.port}`);
});
