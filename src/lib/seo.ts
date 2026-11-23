export const SITE_URL = "https://www.footmate.com.au";

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;
}

export function seo(title: string, description: string, path: string, type = "website", image?: string) {
  const full = `${title} | FOOTMATE by Sarva Australia`;
  const url = absoluteUrl(path);
  const meta: Array<Record<string, string>> = [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "FOOTMATE" },
    { property: "og:locale", content: "en_AU" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: full },
    { name: "twitter:description", content: description },
  ];
  if (image?.startsWith("https://")) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  return { meta, links: [{ rel: "canonical", href: url }] };
}
