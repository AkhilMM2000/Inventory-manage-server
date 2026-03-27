import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).trim(),
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6),
  }).strict(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6),
  }).strict(),
});
