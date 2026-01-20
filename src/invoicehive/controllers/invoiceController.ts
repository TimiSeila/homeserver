import type { Request, Response } from "express";
import { invoicehiveDBClient } from "../prisma/client.ts";

export const createInvoice = async (req: Request, res: Response) => {
  const {
    euros,
    cents,
    dueDate,
    datePaid,
    referenceNumber,
    invoicerName,
    ibanValue,
  } = req.body;

  try {
    const existingInvoice = await invoicehiveDBClient.invoice.findFirst({
      where: {
        invoicerName,
        referenceNumber,
      },
    });

    if (existingInvoice) return res.status(409).send("Invoice already added!");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }

  try {
    const transactionResult = await invoicehiveDBClient.$transaction(
      async (tx) => {
        const invoicer = await tx.invoicer.upsert({
          where: {
            name: invoicerName,
          },
          update: {},
          create: {
            name: invoicerName,
          },
        });

        const iban = await tx.iban.upsert({
          where: {
            value: ibanValue,
          },
          update: {},
          create: {
            value: ibanValue,
            invoicerName: invoicer.name,
          },
        });

        if (iban.invoicerName !== invoicer.name) {
          return res
            .status(409)
            .send(`IBAN already in use by ${iban.invoicerName}!`);
        }

        const result = await tx.invoice.create({
          data: {
            euros,
            cents,
            dueDate,
            datePaid,
            referenceNumber,
            invoicer: {
              connect: { name: invoicer.name },
            },
            iban: {
              connect: { value: iban.value },
            },
          },
        });

        return result;
      }
    );

    return res.status(201).send({ data: transactionResult });
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const result = await invoicehiveDBClient.invoice.findMany();

    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

export const getInvoiceByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await invoicehiveDBClient.invoice.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!result) return res.status(404).send("No invoice found!");

    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};
