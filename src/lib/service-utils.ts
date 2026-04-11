import { Project, Service } from "@/lib/data";

export const getServiceSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export const getServiceProjectCategories = (serviceTitle: string): Project["category"][] => {
  const slug = getServiceSlug(serviceTitle);

  if (slug.includes("application")) return ["application"];
  if (slug.includes("wordpress") || slug.includes("website") || slug.includes("ecommerce")) return ["website"];
  if (slug.includes("backend") || slug.includes("cloud") || slug.includes("software") || slug.includes("ai")) return ["software"];

  return ["website", "software"];
};

const serviceKeywordMap: Record<string, string[]> = {
  "software-solutions": ["software", "system", "platform", "management", "dashboard", "automation"],
  "application-development": ["app", "application", "mobile", "android", "ios", "react native"],
  "ai-custom-software": ["ai", "automation", "intelligent", "assistant", "prediction", "analytics"],
  "custom-website-development": ["website", "web", "responsive", "frontend", "ui", "landing"],
  "ecommerce-website-development": ["ecommerce", "e-commerce", "shop", "store", "product", "checkout"],
  "backend-development": ["backend", "api", "server", "database", "integration", "auth"],
  "cloud-development": ["cloud", "deployment", "scalable", "infrastructure", "devops", "hosting"],
  "wordpress-website-development": ["wordpress", "cms", "plugin", "theme", "website"],
};

export const getRelatedProjectsForService = (service: Service, allProjects: Project[]) => {
  const slug = getServiceSlug(service.title);
  const categories = getServiceProjectCategories(service.title);
  const keywords = serviceKeywordMap[slug] || service.title.toLowerCase().split(/\s+/);

  const scoredProjects = allProjects
    .filter((project) => categories.includes(project.category))
    .map((project) => {
      const haystack = [
        project.title,
        project.description,
        project.problem_statement,
        project.results,
        ...(project.technologies || []),
        ...(project.features || []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      keywords.forEach((keyword) => {
        if (haystack.includes(keyword)) score += 2;
      });

      if (project.category === categories[0]) score += 1;
      return { project, score };
    })
    .sort((a, b) => b.score - a.score);

  const strongMatches = scoredProjects.filter((item) => item.score > 0).map((item) => item.project);
  if (strongMatches.length > 0) return strongMatches.slice(0, 4);

  return scoredProjects.map((item) => item.project).slice(0, 4);
};
