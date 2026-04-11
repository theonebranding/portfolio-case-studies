const SITE_URL = "https://theonebranding.com";
const DEFAULT_IMAGE = "/assets/favicon/android-chrome-512x512.png";

type SeoConfig = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

const getAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
};

const upsertMeta = (key: "name" | "property", value: string, content: string) => {
  let tag = document.head.querySelector(`meta[${key}="${value}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

type SlugSource = string | { title?: string; id?: number | string };

export const getProjectSlug = (source: SlugSource, fallbackId?: number | string) => {
  const title = typeof source === "string" ? source : source?.title ?? "";
  const id = typeof source === "string" ? fallbackId : source?.id ?? fallbackId;
  const slug = title ? title.toLowerCase().replace(/\s+/g, "-") : "";
  return slug || String(id ?? "");
};

export const applySeo = ({
  title,
  description,
  keywords,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}: SeoConfig) => {
  if (typeof document === "undefined") return;

  const url = getAbsoluteUrl(path);
  const imageUrl = getAbsoluteUrl(image);

  document.title = title;

  upsertMeta("name", "description", description);
  if (keywords) upsertMeta("name", "keywords", keywords);
  upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  upsertMeta("name", "googlebot", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("property", "og:type", type);

  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", imageUrl);

  upsertCanonical(url);
};

export const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  if (typeof document === "undefined") return;

  let script = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};