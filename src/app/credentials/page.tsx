/**
 * @fileoverview Credentials Page Route
 * Dedicated route presenting academic background, degree qualifications, and certified technical credentials.
 * Route: /credentials
 */

import type { Metadata } from "next";
import { Credentials } from "@/components/sections/credentials";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Academic qualifications, professional certifications, and technical achievements.",
  alternates: {
    canonical: "/credentials",
  },
};

export default function CredentialsPage() {
  return (
    <div className="pt-24 pb-16">
      <Credentials />
    </div>
  );
}

