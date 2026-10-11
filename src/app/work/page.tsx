/**
 * @fileoverview Work Page Route
 * Dedicated route presenting the portfolio of client applications, SaaS projects, and open-source contributions.
 * Route: /work
 */

import type { Metadata } from "next";
import { Work } from "@/components/sections/work";

export const metadata: Metadata = {
  title: "Work & Projects",
  description: "Featured engineering projects, open-source applications, and production systems.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="pt-24 pb-16">
      <Work />
    </div>
  );
}

