import { z } from "zod";

// DTO Schema for Adding an Item
export const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name must be at least 1 character long").trim(),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative("Quantity must be greater than or equal to 0"),
    price: z.number().nonnegative("Price must be greater than or equal to 0"),
  }),
});

// Define TS Type from Zod Schema
export type CreateItemDTO = z.infer<typeof createItemSchema>["body"];

// DTO Schema for Updating an Item
export const updateItemSchema = z.object({
  params: z.object({
    itemId: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1).trim().optional(),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative().optional(),
    price: z.number().nonnegative().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: "At least one field to update must be provided",
  }),
});

export type UpdateItemDTO = z.infer<typeof updateItemSchema>["body"];
