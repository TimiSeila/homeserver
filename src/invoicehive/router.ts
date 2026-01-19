/* ### /invoicehive ### */
import express from "express";
const invoicehiveRoutes = express.Router();

import invoiceRoutes from "./invoice/router.ts";

/* ### Routes ### */
invoicehiveRoutes.use("/invoice", invoiceRoutes);

export default invoicehiveRoutes;
