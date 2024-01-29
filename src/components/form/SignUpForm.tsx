"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/schema";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff, Info, Loader2, Sparkles, icons } from "lucide-react";
import Link from "next/link";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  type SignUpSchemaType = z.infer<typeof signUpSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    console.log(values.username, values.email, values.password);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      console.log("Created Account Success");
      setIsLoading(false);
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <section className="border border-neutral-200  p-5 rounded-lg lg:col-start-5 lg:col-span-4 col-start-1 col-span-6 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex gap-2 items-center mb-5">
        <Sparkles className="w-12 h-12 border border-neutral-200 p-2 rounded-md dark:border-neutral-800" />
        <div>
          <h3 className="font-bold text-xl">Create an account</h3>
          <p className="text-sm">
            already have account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              sign in
            </Link>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 ">
          <label className="text-sm">Username</label>
          <input
            placeholder="username"
            className="border border-neutral-300 dark:border-neutral-800 p-2 rounded-md outline-blue-300 dark:outline-blue-300 dark:bg-transparent"
            type="name"
            {...register("username")}
          />

          {errors.username && (
            <span className="bg-red-300 rounded-md px-3 py-2 font-semibold text-red-900 text-xs flex gap-2 items-center">
              <Info className="w-3 h-3" />
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            placeholder="email"
            className="border border-neutral-300 dark:border-neutral-800 p-2 rounded-md outline-blue-300 dark:outline-blue-300 dark:bg-transparent"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="bg-red-300 rounded-md px-3 py-2 font-semibold text-red-900 text-xs flex gap-2 items-center">
              <Info className="w-3 h-3" />
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <div className="border border-neutral-300 dark:border-neutral-800 p-2 rounded-md focus-within:outline outline-1 outline-blue-300 relative">
            <input
              placeholder="password"
              className="w-[90%] outline-none dark:bg-transparent group:"
              type={showPassword ? "password" : "text"}
              {...register("password")}
            />
            <button
              className="absolute top-2 right-3 bg-white dark:bg-neutral-900"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-neutral-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          </div>

          {errors.password && (
            <span className="bg-red-300 rounded-md px-3 py-2 font-semibold text-red-900 text-xs flex gap-2 items-center">
              <Info className="w-3 h-3" />
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative border border-neutral-300 dark:border-neutral-800 p-2 rounded-md focus-within:outline outline-1 outline-blue-300">
            <input
              className="w-[90%] outline-none dark:bg-transparent"
              placeholder="confirmPassword"
              type={showPassword ? "password" : "text"}
              {...register("confirmPassword")}
            />
            <button
              className="absolute top-2 right-3 bg-white dark:bg-neutral-900"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-neutral-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="bg-red-300 rounded-md px-3 py-2 font-semibold text-red-900 text-xs flex gap-2 items-center">
              <Info className="w-3 h-3" />
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          variant={"outline"}
          aria-disabled={isLoading}
          disabled={isLoading}
          className="aria-disabled:bg-neutral-800 gap-2 mt-3 dark:hover:bg-neutral-700"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignUpForm;
