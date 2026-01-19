/* ### /invoicehive/invoice ### */
import express from "express";
import { invoicehiveDBClient } from "../prisma/client.ts";
const invoiceRoutes = express.Router();

/* ### Create ### */
//Create invoice
invoiceRoutes.post("/", (req: express.Request, res: express.Response) => {
  res.send("Get invoice route");
});

/* ### Read ### */
//Get all invoices
invoiceRoutes.get("/", async (req: express.Request, res: express.Response) => {
  try {
    console.log();
    const result = await invoicehiveDBClient.invoice.findMany();

    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send("Internal server error!");
  }
});

//Get invoice by ID
invoiceRoutes.get("/:id", (req: express.Request, res: express.Response) => {
  res.send("Get invoice route");
});

/* ### Update ### */
//Update invoice by ID
invoiceRoutes.put("/", (req: express.Request, res: express.Response) => {
  res.send("Get invoice route");
});

/* ### Delete ### */
//Delete invoice by ID
invoiceRoutes.delete("/", (req: express.Request, res: express.Response) => {
  res.send("Get invoice route");
});

export default invoiceRoutes;
