"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./input";
import Button from "./button";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { AuthData, authSchema } from "@/lib/validation/validation.auth";
import Link from "next/link";

interface AuthCardProps {
  mode: "sign-in" | "sign-up";
}

export default function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === "sign-up";

  // react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "" },
  });

  const handleEmailSubmit = async ({ email }: AuthData) => {
    try {
      setIsLoading(true);
      setError(null);
      if (isSignUp) {
        await signUp?.create({ emailAddress: email });
        await signUp?.verifications.sendEmailCode();
      } else {
        await signIn?.emailCode.sendCode({
          emailAddress: email,
        });
      }
      const query = new URLSearchParams({
        email,
        mode,
      });

      router.push(`/verify?${query.toString()}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mx-auto items-center w-full md:max-w-[420px]">
      <div className="bg-s1 border border-b1 rounded-xl p-8 w-full mx-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-t3 mb-3">
            <span className="bg-gr size-2 rounded-full animate-pulse" />
            fuzail.in / admin
          </div>
          <h2>{isSignUp ? "Create account." : "Welcome back."}</h2>

          <p>
            {isSignUp
              ? "Create an admin account"
              : "Sign in to manage your portfolio"}
          </p>
        </div>

        {/* error */}
        {error && (
          <p className="mb-4 font-mono text-[11px] text-red-400 border border-red-400/20 bg-red-400/5 rounded px-3 py-2">
            {error}
          </p>
        )}

        {/* form */}
        <form onSubmit={handleSubmit(handleEmailSubmit)} noValidate>
          <div className="mb-4">
            <FormInput
              label="Email"
              type="email"
              placeholder="hello@fuzail.in"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Button
            title={isLoading ? "Sending..." : "Send Code"}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5"
          />
        </form>
        {/* switch */}
        <p className="mt-4 font-mono text-[11px] text-t4 text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="text-v3 hover:text-v2 transition-colors"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
