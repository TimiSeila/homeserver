/* ### /invoicehive/invoice ### */
import express from "express";
import { validateData } from "../middleware/validationMiddleware.ts";
import { createInvoiceSchema } from "../schemas/invoiceSchemas.ts";
import {
  createInvoice,
  getInvoiceByID,
  getInvoices,
} from "../controllers/invoiceController.ts";
const invoiceRoutes = express.Router();

/* ### Create ### */
//Create invoice
invoiceRoutes.post("/", validateData(createInvoiceSchema), createInvoice);

/* ### Read ### */
//Get invoices
invoiceRoutes.get("/", getInvoices);
//Get invoice by ID
invoiceRoutes.get("/:id", getInvoiceByID);

export default invoiceRoutes;
