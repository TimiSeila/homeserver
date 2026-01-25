import express from "express";
import { config } from "./config.ts";
import cors from "cors";
const app = express();

import invoicehiveRoutes from "./invoicehive/invoicehiveRoutes.ts";
import { sendError } from "./utils/helpers.ts";

app.use(cors());
app.use(express.json());
app.use("/invoicehive", invoicehiveRoutes);

/* ### Catch rest ### */
app.use((req, res) => {
  return sendError(res, `Endpoint: ${req.url} doesn't exist`, 404);
});

app.listen(config.port, () => {
  console.log(`Home server listening on port: ${config.port}`);
});
