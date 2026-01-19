import dotenv from "dotenv";
dotenv.config();

export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  invoicehive_db_url: process.env.INVOICEHIVE_DB_URL,
};
