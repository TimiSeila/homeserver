import { Hono } from "hono";
import { config } from "./config";
import invoicehiveRoutes from "./invoicehive/invoicehiveRoutes";

const app = new Hono();
app.get("/", (c) => c.text("Hello Bun!"));

/* ### App specific routes ### */
app.route("/invoicehive", invoicehiveRoutes);

/* ### 404 Fallback ### */
app.notFound((ctx) => {
  return ctx.json({
    success: false,
    error: { message: `Endpoint: ${ctx.req.path} not found` },
  });
});

export default {
  port: config.port,
  fetch: app.fetch,
};
