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

export const createTweetSchema = z.object({
    userId: z.number(),
    tweet: z.string().min(1, "tweet is required").max(300)
})



export const tweetSchema = z.array(
    z.object({
      tweetId: z.number(),
      userId: z.number(),
      tweet: z.string(),
      createdAt: z.date(), // Convert date to string
      updatedAt: z.date(), // Convert date to string
      user: z.object({
        userId: z.number(),
        email: z.string(),
        username: z.string(),
        password: z.string(),
        createdAt: z.date(),
        image: z.string()
      })
    })
  )
  