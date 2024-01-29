import { z } from "zod";

export const signUpSchema = z
    .object({
        username: z.string().min(1, "Username is Required").max(100),
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password minimal have 8 character")
            .max(20),
        confirmPassword: z.string().min(1, "Password confirmation is required"),
        image: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password do not match",
    });

export const signInSchema = z
    .object({
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password minimal have 8 character")
            .max(20),
    })