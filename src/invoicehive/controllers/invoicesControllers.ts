import type { Context } from "hono";
import { invoicehiveDBClient } from "../prisma/client";
import { PrismaClientKnownRequestError } from "../prisma/generated/prisma/internal/prismaNamespace";

export const createInvoice = async (ctx: Context) => {
  const {
    euros,
    cents,
    dueDate,
    datePaid,
    referenceNumber,
    invoicerName,
    ibanValue,
  } = await ctx.req.json();

  try {
    const existingInvoice = await invoicehiveDBClient.invoice.findFirst({
      where: {
        invoicerName,
        referenceNumber,
      },
    });

    if (existingInvoice)
      return ctx.json({ error: "Invoice already added" }, 409);
  } catch (err) {
    return ctx.json({ error: "Internal server error" }, 500);
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
          return ctx.json(
            { error: `IBAN already in use by ${iban.invoicerName}` },
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

    return ctx.json(transactionResult, 201);
  } catch (err) {
    return ctx.json({ error: "Internal server error" }, 500);
  }
};

export const getInvoices = async (ctx: Context) => {
  try {
    const result = await invoicehiveDBClient.invoice.findMany();

    return ctx.json(result, 200);
  } catch (err) {
    return ctx.json({ error: "Internal server error" }, 500);
  }
};

export const getInvoiceByID = async (ctx: Context) => {
  const { id } = ctx.req.param();
  try {
    const result = await invoicehiveDBClient.invoice.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!result)
      return ctx.json({ error: `No invoice found with ID: ${id}` }, 404);

    return ctx.json(result, 200);
  } catch (err) {
    return ctx.json({ error: "Internal server error" }, 500);
  }
};

export const deleteInvoiceByID = async (ctx: Context) => {
  const { id } = ctx.req.param();
  try {
    const result = await invoicehiveDBClient.invoice.delete({
      where: {
        id: id as string,
      },
    });

    return ctx.json(result, 200);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return ctx.json({ error: `No invoice found with ID: ${id}` }, 404);
      }
    }
    return ctx.json({ error: "Internal server error" }, 500);
  }
};
