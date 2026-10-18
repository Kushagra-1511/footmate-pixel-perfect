import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Use", "Terms governing use of the FOOTMATE by Sarva Australia website.", "/terms"),
  component: () => (
    <LegalPage
      title="Terms of Use"
      sections={[
        { h: "Using this website", p: "By using this website you agree to these terms. The site provides general information about FOOTMATE products and ways to contact Sarva Australia Pty Ltd." },
        { h: "Product information", p: "We aim to keep product information accurate. Where technical values are marked 'Available on request', please contact us for current documentation before relying on them." },
        { h: "Intellectual property", p: "FOOTMATE and Sarva names, logos and content on this site belong to their respective owners and may not be reused without permission." },
        { h: "Your consumer rights", p: "Nothing in these terms excludes, restricts or modifies any rights you have under the Australian Consumer Law." },
        { h: "Changes", p: "We may update these terms from time to time. The current version will always be published on this page." },
      ]}
    />
  ),
});
