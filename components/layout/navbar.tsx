"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import StatusIndicator from "../ui/status-indicator";
import Button from "../ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import Model from "../ui/model";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [projectModal, setProjectModal] = useState<boolean>(false);

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const isAdmin = isLoaded && user?.publicMetadata.role === "admin";

  useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  const navLinks = ["About", "Stack", "Work", "Contact"];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
        fixed top-0 left-0 right-0 z-100
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-b1 bg-bg/88 backdrop-blur-md"
            : menuOpen
              ? ""
              : "bg-transparent"
        }
            `}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono-ui text-[15px] font-bold relative z-120"
          >
            fuzail
            <span className="text-v2">.in</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((nav) => (
              <Link
                key={nav}
                href={`#${nav.toLowerCase()}`}
                className="font-mono-ui text-[11px] uppercase tracking-widest text-t3 transition-colors duration-200 hover:text-tx"
              >
                {nav}
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          {isLoaded && isAdmin ? (
            <div className="hidden md:flex items-center gap-3">
              <Button
                title="Add Project"
                variant="ghost"
                onClick={() => setProjectModal(true)}
              />
              <Button
                title="Sign Out"
                variant="primary"
                onClick={() => signOut()}
              />
            </div>
          ) : (
            <StatusIndicator className="hidden md:flex text-[11px] uppercase" />
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-110"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-tx transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-tx transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-tx transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>
      </motion.header>
      {/* Mobile Overlay */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-bg backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((nav, i) => (
              <motion.div
                key={nav}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, delay: i * 0.06 }}
              >
                <Link
                  href={`#${nav.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono-ui text-[15px] uppercase tracking-[0.18em] text-t2 hover:text-tx transition-colors duration-200"
                >
                  {nav}
                </Link>
              </motion.div>
            ))}

            {/* Available status in mobile menu */}
            {isLoaded && isAdmin ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, delay: 0.3 }}
                className="md:hidden flex flex-col items-center gap-8"
              >
                <Button
                  title="Add Project"
                  variant="ghost"
                  className="border-none text-[15px]"
                  onClick={() => {
                    setMenuOpen(false);
                    setProjectModal(true);
                  }}
                />
                <Button
                  title="Sign Out"
                  variant="primary"
                  className="text-[15px]"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                />
              </motion.div>
            ) : (
              <StatusIndicator
                animate
                animationDelay={navLinks.length * 0.06 + 0.1}
                className="absolute bottom-12 text-[10px] text-t3 uppercase"
              />
            )}
          </motion.div>
        )}
        {projectModal && (
          <Model onClose={() => setProjectModal(false)} mode="create" />
        )}
      </AnimatePresence>
    </>
  );
}
