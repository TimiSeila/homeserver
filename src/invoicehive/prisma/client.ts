import { config } from "../../config.ts";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
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
