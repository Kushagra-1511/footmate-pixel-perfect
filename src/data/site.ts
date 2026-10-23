/** Company, contact, navigation and resource data — edit here, not in components. */

export const company = {
  legalName: "Sarva Australia Pty Ltd",
  brand: "FOOTMATE",
  parent: "Sarva Foam Industries",
  tagline: "Luxury from the first step.",
  secondaryLine: "Recycled. Repurposed. Redefined.",
  // Only verified details go here. null = not displayed.
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,
  website: null as string | null,
  abn: null as string | null,
};

export const mainNav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/why-underlay", label: "Why Underlay" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/trade", label: "Trade & Professionals" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About Sarva" },
  { to: "/contact", label: "Contact" },
] as const;

export const australianStates = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;

export const businessTypes = [
  "Flooring retailer",
  "Distributor / wholesaler",
  "Installer",
  "Architect / interior designer",
  "Builder / developer",
  "Commercial flooring buyer",
  "Other",
] as const;

export const tradeCategories = [
  "Open a trade discussion",
  "Become a stockist",
  "Request a sample kit",
  "Distribution opportunities",
  "Technical documentation",
  "Private-label manufacturing",
  "Specification support",
] as const;

export const contactCategories = [
  "General Enquiry",
  "Trade & Distribution",
  "Product Samples",
  "Technical Support",
  "Architects & Specifications",
  "Media & Government",
  "Contact My Nearest Agent",
] as const;

export const resourceCategories = [
  "FOOTMATE Range Guide",
  "Technical Data Sheets",
  "Product Comparisons",
  "Installation Guides",
  "Warranty Information",
  "Testing and Compliance",
  "Sustainability Documents",
  "Architect and Specifier Resources",
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  applicableProducts: string[];
  /** Real hosted file. null = not yet published; card shows a notice + enquiry link. */
  fileUrl: string | null;
  fileType: "PDF" | "DOCX" | "XLSX" | null;
  updatedAt: string | null;
  published: boolean;
}

export const TESTING_NOTICE =
  "Independent Australian testing documentation will be added when available.";

export const resources: Resource[] = [
  { id: "r-range", title: "FOOTMATE Range Guide", description: "An overview of Comfort, Cosy, Plush and Serenity — profiles, classifications and positioning.", category: "FOOTMATE Range Guide", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-tds-spring", title: "Comfort technical data sheet", description: "Specification data for FOOTMATE Comfort.", category: "Technical Data Sheets", applicableProducts: ["spring"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-tds-bounce", title: "Cosy technical data sheet", description: "Specification data for FOOTMATE Cosy.", category: "Technical Data Sheets", applicableProducts: ["bounce"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-tds-pulse", title: "Plush technical data sheet", description: "Specification data for FOOTMATE Plush.", category: "Technical Data Sheets", applicableProducts: ["pulse"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-tds-bloom", title: "Serenity technical data sheet", description: "Specification data for FOOTMATE Serenity.", category: "Technical Data Sheets", applicableProducts: ["bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-compare", title: "Range comparison chart", description: "Side-by-side comparison of the four FOOTMATE products.", category: "Product Comparisons", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-install", title: "Installation guide", description: "Recommended handling and installation practice for FOOTMATE underlay.", category: "Installation Guides", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-warranty", title: "Warranty information", description: "Warranty terms for the FOOTMATE range.", category: "Warranty Information", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-testing", title: "Australian testing documentation", description: TESTING_NOTICE, category: "Testing and Compliance", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-sustain", title: "Material recovery overview", description: "How recovered polyurethane foam becomes FOOTMATE underlay.", category: "Sustainability Documents", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
  { id: "r-spec", title: "Specifier pack", description: "Specification wording and product information for architects and designers.", category: "Architect and Specifier Resources", applicableProducts: ["spring", "bounce", "pulse", "bloom"], fileUrl: null, fileType: "PDF", updatedAt: null, published: true },
];
