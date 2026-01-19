import { config } from "../../config.ts";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: config.invoicehive_db_url,
});

const getPrisma = () =>
  new PrismaClient({
    adapter,
  });

const globalForInvoicehiveDBClient = global as unknown as {
  invoicehiveDBClient: ReturnType<typeof getPrisma>;
};

export const invoicehiveDBClient =
  globalForInvoicehiveDBClient.invoicehiveDBClient || getPrisma();

if (config.node_env !== "production")
  globalForInvoicehiveDBClient.invoicehiveDBClient = invoicehiveDBClient;
