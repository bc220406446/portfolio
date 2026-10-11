/**
 * @fileoverview Contact Page Route
 * Dedicated route presenting the project enquiry form, direct contact channels, and file upload capabilities.
 * Route: /contact
 */

import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muhammad Kamran for full-stack engineering, web application, and AI development projects.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-16 pb-8 sm:pb-16">
      <Contact />
    </div>
  );
}

