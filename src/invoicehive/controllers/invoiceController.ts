import type { Request, Response } from "express";
import { invoicehiveDBClient } from "../prisma/client.ts";
import { sendError, sendSuccess } from "../../utils/helpers.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

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

    if (existingInvoice) return sendError(res, "Invoice already added", 409);
  } catch (err) {
    return sendError(res, "Internal server error", 500);
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
          return sendError(
            res,
            `IBAN already in use by ${iban.invoicerName}`,
            409
          );
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

    return sendSuccess(res, transactionResult, 201);
  } catch (err) {
    return sendError(res, "Internal server error", 500);
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const result = await invoicehiveDBClient.invoice.findMany();

    return sendSuccess(res, result, 200);
  } catch (err) {
    return sendError(res, "Internal server error", 500);
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

    if (!result) return sendError(res, `No invoice found with ID: ${id}`, 404);

    return sendSuccess(res, result, 200);
  } catch (err) {
    return sendError(res, "Internal server error", 500);
  }
};

export const deleteInvoiceByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await invoicehiveDBClient.invoice.delete({
      where: {
        id: id as string,
      },
    });

    return sendSuccess(res, result, 200);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return sendError(res, `No invoice found with ID: ${id}`);
      }
    }
    return sendError(res, "Internal server error", 500);
  }
};
