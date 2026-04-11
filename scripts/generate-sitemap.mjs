import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://theonebranding.com";
const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src", "lib", "data.ts");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITEMAP_FILE = path.join(PUBLIC_DIR, "sitemap.xml");
const ROBOTS_FILE = path.join(PUBLIC_DIR, "robots.txt");

const toSlug = (title) =>
  title ? title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : "";

const source = fs.readFileSync(DATA_FILE, "utf8");
const projectsSectionStart = source.indexOf("export const projects");

if (projectsSectionStart === -1) {
  throw new Error("Could not find projects export in src/lib/data.ts");
}

const servicesSectionStart = source.indexOf("export const services");
if (servicesSectionStart === -1) {
  throw new Error("Could not find services export in src/lib/data.ts");
}

const servicesSection = source.slice(servicesSectionStart, projectsSectionStart);
const projectsSection = source.slice(projectsSectionStart);
const projectTitleRegex = /"title"\s*:\s*"([^"]+)"/g;
const serviceTitleRegex = /title\s*:\s*"([^"]+)"/g;
const projectSlugs = [];
const serviceSlugs = [];
let match;

while ((match = projectTitleRegex.exec(projectsSection)) !== null) {
  const slug = toSlug(match[1]);
  if (slug) projectSlugs.push(slug);
}

while ((match = serviceTitleRegex.exec(servicesSection)) !== null) {
  const slug = toSlug(match[1]);
  if (slug) serviceSlugs.push(slug);
}

const uniqueProjectSlugs = [...new Set(projectSlugs)];
const uniqueServiceSlugs = [...new Set(serviceSlugs)];
const today = new Date().toISOString().split("T")[0];

const urls = [
  { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
  ...uniqueServiceSlugs.map((slug) => ({
    loc: `${SITE_URL}/services/${slug}`,
    changefreq: "monthly",
    priority: "0.9",
  })),
  ...uniqueProjectSlugs.map((slug) => ({
    loc: `${SITE_URL}/project/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(SITEMAP_FILE, sitemapXml, "utf8");
fs.writeFileSync(ROBOTS_FILE, robotsTxt, "utf8");

console.log(`Generated sitemap with ${urls.length} URLs at ${SITEMAP_FILE}`);
console.log(`Generated robots.txt at ${ROBOTS_FILE}`);