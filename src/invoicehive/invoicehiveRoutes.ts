/* ### /invoicehive ### */
import express from "express";
const invoicehiveRoutes = express.Router();

import invoiceRoutes from "./routes/invoiceRoutes.ts";

/* ### Routes ### */
invoicehiveRoutes.use("/invoice", invoiceRoutes);

export default invoicehiveRoutes;
