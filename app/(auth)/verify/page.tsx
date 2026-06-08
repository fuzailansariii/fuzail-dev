import { Suspense } from "react";
import VerifyOTP from "@/components/ui/verify-otp";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-mono text-[11px] text-t4 uppercase tracking-widest">
            Loading...
          </p>
        </div>
      }
    >
      <VerifyOTP />
    </Suspense>
  );
}
