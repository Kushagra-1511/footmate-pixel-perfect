import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy", "How Sarva Australia collects, uses and protects personal information submitted through the FOOTMATE website.", "/privacy"),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "Who we are", p: "This website is operated by Sarva Australia Pty Ltd. We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth)." },
        { h: "What we collect", p: "When you submit an enquiry or sample request we collect the details you provide, such as your name, email, phone, company, state, delivery location and message." },
        { h: "How we use it", p: "We use your information to respond to your enquiry, arrange samples, and manage trade relationships. We don't sell your personal information." },
        { h: "Storage and security", p: "Submissions are stored securely and are not publicly accessible. Access is limited to authorised staff." },
        { h: "Access and correction", p: "You can ask to access or correct the personal information we hold about you by contacting us through the contact page." },
        { h: "Analytics and cookies", p: "Any optional analytics or tracking will only be used in line with applicable consent requirements." },
      ]}
    />
  ),
});
