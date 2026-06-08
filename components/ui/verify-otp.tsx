"use client";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/input";
import { OTPData, otpSchema } from "@/lib/validation/validation.auth";
import { useSignIn, useSignUp, useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function VerifyOTP() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") ?? "";
  const modeParam = params.get("mode");

  const mode =
    modeParam === "sign-in" || modeParam === "sign-up" ? modeParam : "sign-in";

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { setActive } = useClerk();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleCodeVerification = async ({ code }: OTPData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (mode === "sign-up") {
        await signUp?.verifications.verifyEmailCode({ code });

        if (signUp?.status === "complete") {
          await signUp.finalize({
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) return;
              const url = decorateUrl("/");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
        } else {
          setError("Verification incomplete. Please try again.");
        }
      } else {
        // sign-in
        await signIn?.emailCode.verifyCode({ code });
        if (signIn?.status === "complete") {
          await setActive?.({ session: signIn.createdSessionId });
          router.push("/");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid code";
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
          <h2 className="font-heading font-extrabold text-[1.6rem] tracking-[-0.03em] leading-[1.1] text-tx">
            Check your email.
          </h2>
          <p className="font-mono text-[12px] text-t3 mt-1.5">
            We sent a 6-digit code to <span className="text-v3">{email}</span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 font-mono text-[11px] text-red-400 border border-red-400/20 bg-red-400/5 rounded px-3 py-2">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(handleCodeVerification)} noValidate>
          <div className="mb-4">
            <FormInput
              autoFocus
              label="One-time code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              error={errors.code?.message}
              {...register("code")}
            />
          </div>
          <Button
            title={isLoading ? "Verifying..." : "Verify Code"}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5"
          />
        </form>

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push(`/${mode}`)}
          disabled={isLoading}
          className="w-full mt-3 font-mono text-[11px] text-t4 hover:text-t2 transition-colors"
        >
          ← Use a different email
        </button>
      </div>
    </div>
  );
}
