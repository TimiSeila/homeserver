/* ### /invoicehive/invoice ### */
import { Request, Response } from "express";
import express from "express";
const invoiceRoutes = express.Router();

/* ### Create ### */
//Create invoice
invoiceRoutes.post("/", (req: Request, res: Response) => {
  res.send("Get invoice route");
});

/* ### Read ### */
//Get all invoices
invoiceRoutes.get("/", (req: Request, res: Response) => {
  res.send("Get invoice route");
});

//Get invoice by ID
invoiceRoutes.get("/", (req: Request, res: Response) => {
  res.send("Get invoice route");
});

/* ### Update ### */
//Update invoice by ID
invoiceRoutes.put("/", (req: Request, res: Response) => {
  res.send("Get invoice route");
});

/* ### Delete ### */
//Delete invoice by ID
invoiceRoutes.delete("/", (req: Request, res: Response) => {
  res.send("Get invoice route");
});

export default invoiceRoutes;
