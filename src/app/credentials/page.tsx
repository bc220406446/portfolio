/**
 * @fileoverview Credentials Page Route
 * Dedicated route presenting academic background, degree qualifications, and certified technical credentials.
 * Route: /credentials
 */

import { Credentials } from "@/components/sections/credentials";

export default function CredentialsPage() {
  return (
    <div className="pt-24 pb-16">
      <Credentials />
    </div>
  );
}

