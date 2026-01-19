import { defineConfig } from "prisma/config";
import { config } from "../../config";

export default defineConfig({
  schema: "./",
  migrations: {
    path: "./migrations",
  },
  datasource: {
    url: config.invoicehive_db_url,
  },
});
