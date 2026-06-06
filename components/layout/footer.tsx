"use client";
import Container from "../ui/container";
import SocialLinks from "../ui/social-links";

const NAV = ["About", "Stack", "Work", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-b1 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono-ui text-[11px] text-t3 transition-colors"
          >
            ● {year}{" "}
            <span className="font-black text-v2 hover:text-v1">fuzail.in</span>{" "}
            - Built With Next.js & ☕
          </button>

          {/* Social Links */}

          <SocialLinks orientation="horizontal" />

          {/* Copyright */}
          <p className="font-mono-ui text-[11px] tracking-[0.14em] text-t3">
            Designed & developed by{" "}
            <span className="text-v3">Mohd Fuzail Ansari</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
