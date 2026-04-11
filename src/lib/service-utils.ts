import { Project, Service } from "@/lib/data";

export const getServiceSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export const getServiceProjectCategories = (serviceTitle: string): Project["category"][] => {
  const title = serviceTitle.toLowerCase();

  if (title.includes("application") || title.includes("mobile")) return ["application"];
  if (title.includes("website") || title.includes("wordpress") || title.includes("e-commerce")) return ["website"];
  if (title.includes("software") || title.includes("backend") || title.includes("cloud") || title.includes("ai")) {
    return ["software", "website"];
  }

  return ["website", "software", "application"];
};

export const getRelatedProjectsForService = (service: Service, allProjects: Project[]) => {
  const categories = getServiceProjectCategories(service.title);
  return allProjects.filter((project) => categories.includes(project.category));
};
