import { z } from "zod";
import { emailSchema } from "./validation.contact";

// auth
export const authSchema = z.object({
  email: emailSchema,
});

// OTP
export const otpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

export type AuthData = z.infer<typeof authSchema>;
export type OTPData = z.infer<typeof otpSchema>;
