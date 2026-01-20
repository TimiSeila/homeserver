import z from "zod";

export const invoiceCreationSchema = z.object({
  euros: z.int().nonnegative(),
  cents: z.int().min(0).max(99),
  dueDate: z.coerce.date({ error: "Due date required!" }),
  datePaid: z.coerce.date().optional(),
  referenceNumber: z
    .string()
    .trim()
    .nonempty({ error: "Reference number required!" })
    .transform((value) => {
      return value.replace(/\s+/g, "").toUpperCase();
    }),
  invoicerName: z.string().nonempty({ error: "Invoicer required!" }),
  ibanValue: z
    .string()
    .trim()
    .nonempty({ error: "IBAN required!" })
    .transform((value) => {
      return value.replace(/\s+/g, "").toUpperCase();
    }),
});
