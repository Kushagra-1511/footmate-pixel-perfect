import { createFileRoute } from "@tanstack/react-router";
import { productSlugs } from "@/data/products";

const paths = ["/", "/products", ...productSlugs.map((s) => `/products/${s}`), "/products/compare", "/why-underlay", "/sustainability", "/trade", "/resources", "/about", "/contact", "/request-samples", "/privacy", "/terms", "/consumer-law"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(body, { headers: { "content-type": "application/xml" } });
      },
    },
  },
});
