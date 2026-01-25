import z from "zod";

export const createInvoiceSchema = z.object({
  euros: z
    .int({ error: "Euros must be an integer" })
    .nonnegative({ error: "Euros may not be negative!" }),
  cents: z
    .int({ error: "Cents must be an integer" })
    .max(99, { error: "Max amount for cents is 99!" })
    .nonnegative({ error: "Cents may not be negative!" }),
  dueDate: z.coerce.date({ error: "Due date required!" }),
  datePaid: z.coerce.date().optional(),
  referenceNumber: z
    .string({ error: "Reference number must be a string!" })
    .trim()
    .nonempty({ error: "Reference number required!" })
    .transform((value) => {
      return value.replace(/\s+/g, "").toUpperCase();
    }),
  invoicerName: z
    .string({ error: "Invoicer name must be a string!" })
    .nonempty({ error: "Invoicer required!" }),
  ibanValue: z
    .string({ error: "IBAN must be a string!" })
    .trim()
    .nonempty({ error: "IBAN required!" })
    .transform((value) => {
      return value.replace(/\s+/g, "").toUpperCase();
    }),
});
