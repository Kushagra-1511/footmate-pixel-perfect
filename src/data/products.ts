/**
 * FOOTMATE product range — the single source of truth.
 * Every product card, detail page, comparison, filter and the selector read from here.
 * Leave a value as null until it is verified by supplied documentation.
 */
import foamTexture from "@/assets/foam-texture.jpg";

export type ProductSlug = "spring" | "bounce" | "pulse" | "bloom";
export type DensityCategory = "HD+" | "UHD";
export type Thickness = 9 | 11;
export const RATING_MAX = 6;
export type Rating = number | null; // out of RATING_MAX, from the finalised booklet only

export interface ProductDocument {
  kind: "data-sheet" | "installation" | "warranty" | "testing";
  label: string;
  /** Real hosted file URL. null = not yet available, no download button shown. */
  url: string | null;
}

export interface TechnicalSpec {
  label: string;
  value: string | null; // null renders "Available on request"
}

export interface Product {
  id: string;
  slug: ProductSlug;
  name: string;
  thicknessMm: Thickness;
  densityCategory: DensityCategory;
  colourName: string;
  /** CSS colour token, e.g. var(--spring) */
  accentColour: string;
  /** Tailwind token name for the accent (bg-spring, text-spring…) */
  accentToken: ProductSlug;
  shortDescription: string;
  fullDescription: string;
  productImage: string;
  textureImage: string;
  comfortRating: Rating;
  durabilityRating: Rating;
  bounceRating: Rating;
  keyBenefits: string[];
  /** Only verified application suitability. Empty = confirm with our team. */
  suitableApplications: string[];
  /** true / false when verified, null when not yet confirmed */
  staircaseSuitability: boolean | null;
  thermalInformation: string | null;
  soundInformation: string | null;
  technicalSpecifications: TechnicalSpec[];
  downloadableDocuments: ProductDocument[];
  sustainabilityInformation: string;
  status: "active" | "coming-soon";
}

const baseSpecs = (thickness: Thickness, density: DensityCategory): TechnicalSpec[] => [
  { label: "Nominal thickness", value: `${thickness} mm` },
  { label: "Density classification", value: density },
  { label: "Material", value: "Rebonded polyurethane foam" },
  { label: "Measured density (kg/m³)", value: null },
  { label: "Roll dimensions", value: null },
  { label: "Roll coverage", value: null },
  { label: "Thermal resistance (R-value)", value: null },
  { label: "Acoustic performance", value: null },
  { label: "Australian standards testing", value: null },
  { label: "Warranty", value: null },
];

const baseDocs: ProductDocument[] = [
  { kind: "data-sheet", label: "Product data sheet", url: null },
  { kind: "installation", label: "Installation guide", url: null },
  { kind: "warranty", label: "Warranty information", url: null },
  { kind: "testing", label: "Testing documentation", url: null },
];

const sustainability =
  "Made from post-consumer waste, as stated in the finalised FOOTMATE booklet. Verified recycled-content percentages are available on request.";

export const products: Product[] = [
  {
    id: "fm-spring",
    slug: "spring",
    name: "Comfort",
    thicknessMm: 11,
    densityCategory: "HD+",
    colourName: "Teal",
    accentColour: "var(--spring)",
    accentToken: "spring",
    shortDescription: "Balanced everyday performance with excellent cushioning.",
    fullDescription:
      "COMFORT brings a generous 11 mm of cushioning to everyday living spaces. Its HD+ classification balances a soft, welcoming feel underfoot with the support a carpet needs day after day — a dependable all-rounder for the home.",
    productImage: foamTexture,
    textureImage: foamTexture,
    comfortRating: 5,
    durabilityRating: 4,
    bounceRating: 5,
    keyBenefits: [
      "Heat insulation",
      "Lasting durability",
      "Sound absorption",
      "Made from post-consumer waste",
    ],
    suitableApplications: [],
    staircaseSuitability: null,
    thermalInformation: "Heat insulation — booklet feature; measured R-value available on request",
    soundInformation: "Sound absorption — booklet feature; acoustic test data available on request",
    technicalSpecifications: baseSpecs(11, "HD+"),
    downloadableDocuments: baseDocs,
    sustainabilityInformation: sustainability,
    status: "active",
  },
  {
    id: "fm-bounce",
    slug: "bounce",
    name: "Cosy",
    thicknessMm: 9,
    densityCategory: "HD+",
    colourName: "Lime green",
    accentColour: "var(--bounce)",
    accentToken: "bounce",
    shortDescription: "Responsive comfort in a practical profile, including staircase applications.",
    fullDescription:
      "COSY offers responsive comfort in a practical 9 mm profile. Its HD+ classification and slimmer build make it a considered choice where a neat finish matters — including staircase applications.",
    productImage: foamTexture,
    textureImage: foamTexture,
    comfortRating: 4,
    durabilityRating: 4,
    bounceRating: 4,
    keyBenefits: [
      "Heat insulation",
      "Ideal for staircases",
      "Eco friendly — booklet feature",
      "Made from post-consumer waste",
    ],
    suitableApplications: ["Staircases"],
    staircaseSuitability: true,
    thermalInformation: "Heat insulation — booklet feature; measured R-value available on request",
    soundInformation: null,
    technicalSpecifications: baseSpecs(9, "HD+"),
    downloadableDocuments: baseDocs,
    sustainabilityInformation: sustainability,
    status: "active",
  },
  {
    id: "fm-pulse",
    slug: "pulse",
    name: "Plush",
    thicknessMm: 11,
    densityCategory: "UHD",
    colourName: "Deep purple",
    accentColour: "var(--pulse)",
    accentToken: "pulse",
    shortDescription: "Premium cushioning and support for rooms where comfort matters most.",
    fullDescription:
      "PLUSH is the most luxurious expression of the range: a full 11 mm profile in the UHD classification, developed for bedrooms, lounges and the rooms where comfort matters most.",
    productImage: foamTexture,
    textureImage: foamTexture,
    comfortRating: 5,
    durabilityRating: 5,
    bounceRating: 6,
    keyBenefits: [
      "Heat insulation",
      "Lasting durability",
      "Sound absorption",
      "Made from post-consumer waste",
    ],
    suitableApplications: [],
    staircaseSuitability: null,
    thermalInformation: "Heat insulation — booklet feature; measured R-value available on request",
    soundInformation: "Sound absorption — booklet feature; acoustic test data available on request",
    technicalSpecifications: baseSpecs(11, "UHD"),
    downloadableDocuments: baseDocs,
    sustainabilityInformation: sustainability,
    status: "active",
  },
  {
    id: "fm-bloom",
    slug: "bloom",
    name: "Serenity",
    thicknessMm: 9,
    densityCategory: "UHD",
    colourName: "Coral pink",
    accentColour: "var(--bloom)",
    accentToken: "bloom",
    shortDescription: "High-density performance in a refined, versatile profile.",
    fullDescription:
      "SERENITY pairs the UHD classification with a refined 9 mm profile — high-density performance that stays versatile across a wide range of carpet installations.",
    productImage: foamTexture,
    textureImage: foamTexture,
    comfortRating: 5,
    durabilityRating: 5,
    bounceRating: 5,
    keyBenefits: [
      "Heat insulation",
      "Ideal for staircases",
      "Eco friendly — booklet feature",
      "Made from post-consumer waste",
    ],
    suitableApplications: ["Staircases"],
    staircaseSuitability: true,
    thermalInformation: "Heat insulation — booklet feature; measured R-value available on request",
    soundInformation: null,
    technicalSpecifications: baseSpecs(9, "UHD"),
    downloadableDocuments: baseDocs,
    sustainabilityInformation: sustainability,
    status: "active",
  },
];

export const productSlugs = products.map((p) => p.slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const UNVERIFIED = "Technical data available on request";
export const ON_REQUEST = "Available on request";

/** Tailwind classes per accent so class names stay statically discoverable. */
export const accentClasses: Record<ProductSlug, { bg: string; text: string; border: string; ring: string }> = {
  spring: { bg: "bg-spring", text: "text-spring", border: "border-spring", ring: "ring-spring" },
  bounce: { bg: "bg-bounce", text: "text-bounce", border: "border-bounce", ring: "ring-bounce" },
  pulse: { bg: "bg-pulse", text: "text-pulse", border: "border-pulse", ring: "ring-pulse" },
  bloom: { bg: "bg-bloom", text: "text-bloom", border: "border-bloom", ring: "ring-bloom" },
};
