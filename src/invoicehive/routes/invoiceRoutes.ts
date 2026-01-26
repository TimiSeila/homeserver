import { Hono } from "hono";
import {
  createInvoice,
  deleteInvoiceByID,
  getInvoiceByID,
  getInvoices,
} from "../controllers/invoicesControllers";

const invoiceRoutes = new Hono();

/* ### Create ### */
//Create invoice
invoiceRoutes.post("/", createInvoice);

/* ### Read ### */
//Get invoices
invoiceRoutes.get("/", getInvoices);
//Get invoice by ID
invoiceRoutes.get("/:id", getInvoiceByID);

/* ### Delete ### */
//Delete invoice by ID
invoiceRoutes.delete("/:id", deleteInvoiceByID);

export default invoiceRoutes;
