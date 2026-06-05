import Link from "next/link";
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
          <Link
            href="/"
            className="font-mono-ui text-[13px] font-bold text-t2 transition-colors hover:text-tx"
          >
            fuzail<span className="text-v2">.in</span>
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-6">
            <SocialLinks orientation="horizontal" />
          </div>

          {/* Copyright */}
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-t4">
            ● {year} Fuzail
          </p>
        </div>
      </Container>
    </footer>
  );
}
