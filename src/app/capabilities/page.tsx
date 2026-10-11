/**
 * @fileoverview Capabilities Page Route
 * Dedicated route presenting the full-stack technology layers and tools.
 * Route: /capabilities
 */

import type { Metadata } from "next";
import { Capabilities } from "@/components/sections/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Technical capabilities, architecture principles, and core technologies used across modern web development.",
  alternates: {
    canonical: "/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <div className="pt-24 pb-16">
      <Capabilities />
    </div>
  );
}

