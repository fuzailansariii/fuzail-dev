import Link from "next/link";
import Container from "../ui/container";

const NAV = ["About", "Stack", "Work", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-b1 py-10">
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
            {NAV.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-t4 transition-colors hover:text-t2"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-t4">
            &copy; {year} Fuzail
          </p>
        </div>
      </Container>
    </footer>
  );
}
