import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/consumer-law")({
  head: () => seo("Australian Consumer Law", "Information about your rights under the Australian Consumer Law when purchasing FOOTMATE products.", "/consumer-law"),
  component: () => (
    <LegalPage
      title="Australian Consumer Law"
      sections={[
        { h: "Consumer guarantees", p: "Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage." },
        { h: "Minor failures", p: "You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure." },
        { h: "Warranties", p: "Any FOOTMATE warranty is in addition to your rights under the Australian Consumer Law. Warranty details will be published once confirmed." },
        { h: "More information", p: "Visit the ACCC website for more about consumer guarantees, or contact us through the contact page." },
      ]}
    />
  ),
});
