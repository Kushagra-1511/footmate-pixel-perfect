import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {items.map((it, i) => (
        <AccordionItem key={it.q} value={`i${i}`} className="border-border">
          <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">{it.q}</AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-6 text-base leading-relaxed text-muted-foreground">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
