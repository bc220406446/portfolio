/**
 * @fileoverview Contact Page Route
 * Dedicated route presenting the project enquiry form, direct contact channels, and file upload capabilities.
 * Route: /contact
 */

import { Contact } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-16 pb-8 sm:pb-16">
      <Contact />
    </div>
  );
}

