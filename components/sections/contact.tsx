"use client";

import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import FormInput from "../ui/input";
import SectionLabel from "../ui/section-label";
import Container from "../ui/container";
import { Divider } from "../ui/divider";
import Link from "next/link";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: replace with your API route
      console.log("Contact Form Data", data);
      reset();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-[0.07] blur-[120px]" />

      <Container>
        {/* Section label */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionLabel count="04" label="Contact" />

            {/* Heading */}
            <h2 className="font-heading font-extrabold text-[clamp(2rem,5vw,4.5rem)] tracking-[-0.035em] leading-[1.1]">
              Let&apos;s build{" "}
              <span className="bg-linear-to-br from-white via-v4 to-v1 bg-clip-text text-transparent">
                something great.
              </span>
            </h2>

            {/* Paragraph */}
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-[13px] leading-[1.9] text-t2 mt-4"
            >
              I&apos;m currently open to new opportunities — freelance,
              full-time, or interesting side projects. If you have something in
              mind, I&apos;d love to hear about it.
            </motion.p>

            {/* Email link */}
            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono font-bold text-[clamp(1rem,2.5vw,1.5rem)] text-tx border-b border-b2 pb-0.5 inline-block my-4 hover:text-v3 hover:border-v1 transition-all"
            >
              <Link href="mailto:fuzailansarisecret@gmail.com">
                fuzailansarisecret@gmail.com
              </Link>
            </motion.h2>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-s1 border border-b1 rounded-xl p-8 text-left"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Name"
                  placeholder="Fuzail Ansari"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="your@email.in"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <FormInput
                  label="Subject"
                  placeholder="Project inquiry / Full-time role / Just saying hi"
                  error={errors.subject?.message}
                  {...register("subject", { required: "Subject is required" })}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <FormInput
                  label="Message"
                  placeholder="Tell me what you're building..."
                  error={errors.message?.message}
                  textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 20,
                      message: "Message must be at least 20 characters",
                    },
                  })}
                />
              </div>

              {/* Success message */}
              {isSubmitSuccessful && (
                <p className="mb-4 font-mono text-[11px] text-gr tracking-[0.06em]">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-mono text-[11px] uppercase tracking-[0.08em] py-3.5 rounded bg-v1 text-white hover:bg-[#6d28d9] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(124,58,237,0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
