/**
 * @fileoverview Capabilities Page Route
 * Dedicated route presenting the full-stack technology layers and tools.
 * Route: /capabilities
 */

import { Capabilities } from "@/components/sections/capabilities";

export default function CapabilitiesPage() {
  return (
    <div className="pt-24 pb-16">
      <Capabilities />
    </div>
  );
}

