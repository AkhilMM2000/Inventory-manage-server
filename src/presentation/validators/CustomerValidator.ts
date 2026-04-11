import { z } from "zod";

const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const line1Regex = /^[A-Za-z0-9/, ]+$/;
const lettersOnly = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const postalRegex = /^\d{6,7}$/;

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().regex(nameRegex, "Name must contain letters only").trim(),
    mobile: z.string().min(10, "Mobile must be valid"),
    address: z.object({
      line1: z.string().regex(line1Regex, "Address line1 must contain letters/numbers only"),
      city: z.string().regex(lettersOnly, "City must contain letters only"),
      district: z.string().regex(lettersOnly, "District must contain letters only"),
      state: z.string().regex(lettersOnly, "State must contain letters only"),
      country: z.string().regex(lettersOnly, "Country must contain letters only"),
      postalCode: z.string().regex(postalRegex, "Postal code must be 6 or 7 digits"),
    }).strict(),
  }).strict(),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    customerId: z.string().min(1),
  }),
  body: z.object({
    name: z.string().regex(nameRegex, "Name must contain letters only").trim().optional(),
    mobile: z.string().optional(),
    address: z.object({
      line1: z.string().regex(line1Regex, "Address line1 must contain letters/numbers only").optional(),
      city: z.string().regex(lettersOnly, "City must contain letters only").optional(),
      district: z.string().regex(lettersOnly, "District must contain letters only").optional(),
      state: z.string().regex(lettersOnly, "State must contain letters only").optional(),
      country: z.string().regex(lettersOnly, "Country must contain letters only").optional(),
      postalCode: z.string().regex(postalRegex, "Postal code must be 6 or 7 digits").optional(),
    }).optional(),
  }).refine(data => Object.keys(data).length > 0, "At least one field to update must be provided"),
});
