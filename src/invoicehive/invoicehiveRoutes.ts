import { Hono } from "hono";
import invoiceRoutes from "./routes/invoiceRoutes";

const invoicehiveRoutes = new Hono();

/* ### Routes ### */
invoicehiveRoutes.route("/invoices", invoiceRoutes);

export default invoicehiveRoutes;
