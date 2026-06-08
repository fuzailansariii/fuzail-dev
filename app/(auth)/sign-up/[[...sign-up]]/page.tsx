import AuthCard from "@/components/ui/auth-card";

export default function SignUp() {
  return (
    <>
      <AuthCard mode="sign-up" />
      <div id="clerk-captcha" />
    </>
  );
}
