import AuthCard from "@/components/ui/auth-card";

export default function SignIn() {
  return (
    <>
      <AuthCard mode="sign-in" />
      <div id="clerk-captcha" />
    </>
  );
}
