import { z } from "zod";

export const createSaleSchema = z.object({
  body: z.object({
    customerId: z.string().min(1, "Customer ID is required"),
    customerName: z.string().min(1, "Customer Name is required"),
    paymentType: z.enum(["Cash", "Credit"]),
    items: z.array(z.object({
      itemId: z.string().min(1, "Item ID is required"),
      name: z.string().min(1, "Item name is required"),
      quantity: z.number().int().positive("Quantity must be at least 1"),
      unitPrice: z.number().nonnegative("Unit price must be 0 or greater"),
    })).min(1, "At least one item must be added to the sale"),
  }).strict(),
});

export type CreateSaleDTO = z.infer<typeof createSaleSchema>["body"];
