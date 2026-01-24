/* ### /invoicehive ### */
import express from "express";
const invoicehiveRoutes = express.Router();

import invoiceRoutes from "./routes/invoiceRoutes.ts";

/* ### Routes ### */
invoicehiveRoutes.use("/invoices", invoiceRoutes);

export default invoicehiveRoutes;
