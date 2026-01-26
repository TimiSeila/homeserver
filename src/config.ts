declare module "bun" {
  interface Env {
    INVOICEHIVE_DB_URL: string;
  }
}

export const config = {
  node_env: Bun.env.NODE_ENV,
  port: Bun.env.PORT,
  invoicehive_db_url: Bun.env.INVOICEHIVE_DB_URL,
};
