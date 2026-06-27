import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { projects, Project } from "@/lib/data";
import { applySeo, getProjectSlug, upsertJsonLd } from "@/lib/seo";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

type ProjectCategory = "website" | "software" | "applications";

interface ProjectCategoryPageProps {
  category: ProjectCategory;
}

const categoryTitleMap: Record<ProjectCategory, string> = {
  website: "Website Projects",
  software: "Software Projects",
  applications: "Application Projects",
};

const categoryDescriptionMap: Record<ProjectCategory, string> = {
  website: "Explore all website case studies delivered by Digol across industries.",
  software: "Explore all software case studies built by Digol for business operations.",
  applications: "Explore all mobile application case studies created by Digol.",
};

const categoryHeroCopy: Record<ProjectCategory, { intro: string; highlights: string[] }> = {
  website: {
    intro:
      "Conversion-focused website projects built for speed, SEO performance, and strong brand storytelling across modern devices.",
    highlights: ["Responsive UI/UX", "Technical SEO structure", "Lead generation pages", "E-commerce solutions", "Content management systems", "Custom web applications"],
  },
  software: {
    intro:
      "Business software case studies focused on process automation, data visibility, and scalable architecture for growing teams.",
    highlights: ["Workflow automation", "Role-based dashboards", "Secure backend systems"],
  },
  applications: {
    intro:
      "Mobile application case studies designed for real-world usage with smooth interactions, robust APIs, and long-term maintainability.",
    highlights: ["Cross-platform delivery", "Performance-first UX", "Scalable app backend"],
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const isInternational = project.client?.country !== "India";

    useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    
    <Link
      to={`/project/${getProjectSlug(project)}`}
      className="relative group overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute bottom-3 left-3 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium ${
            isInternational ? "bg-emerald-500/90 text-white" : "bg-orange-500/90 text-white"
          }`}
        >
          {isInternational ? (
            <span className="flex items-center">
              <img src="/assets/icon/global-icon.png" alt="Global Client" width={16} height={16} className="mr-1" />
              International Client
            </span>
          ) : (
            <span className="flex items-center">
              <img src="/assets/icon/india-icon.png" alt="Indian Client" width={16} height={16} className="mr-1" />
              Indian Client
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 flex flex-col items-start">
          <h3 className="text-xl font-bold font-primary text-brand-yellow mb-2">{project.title}</h3>
          <div className="text-base font-secondary mb-1 flex items-center gap-2">
            <span className="text-gray-400">Client from</span>
            <span className={`font-bold underline underline-offset-2 ${isInternational ? "text-emerald-400" : "text-orange-400"}`}>
              {project.client?.country}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} className="ml-1" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 6).map((tech, index) => (
            <span key={index} className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-tertiary">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center text-brand-yellow mt-auto">
          <span className="text-sm font-medium mr-2">View Details</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

const ProjectCategoryPage = ({ category }: ProjectCategoryPageProps) => {
  const navigate = useNavigate();
  const categoryProjects = projects.filter((project) => project.category === category);

  useEffect(() => {
    const title = `${categoryTitleMap[category]} | Digol`;
    const description = categoryDescriptionMap[category];
    const keywords = [
      `${category} projects`,
      `${category} case studies`,
      `${category} portfolio`,
      "Digol",
      "Anand Gujarat",
      "website development",
      "software development",
      "application development",
    ].join(", ");

    applySeo({
      title,
      description,
      keywords,
      path: `/project/${category}`,
      type: "website",
    });

    upsertJsonLd("project-category-schema", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `https://digoltech.com/project/${category}`,
      isPartOf: {
        "@type": "WebSite",
        name: "Digol",
        url: "https://digoltech.com",
      },
      about: categoryTitleMap[category],
      keywords,
      numberOfItems: categoryProjects.length,
    });
  }, [category, categoryProjects.length]);

  return (
    <div className="min-h-screen bg-brand-black/95 text-brand-white">
      <Header />
      <section className="container mx-auto px-6 pt-32 pb-20">
        <Button
          variant="glass"
          onClick={() => navigate(-1)}
          className="mb-10"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Button>

        <h1 className="text-4xl md:text-5xl font-primary font-bold text-brand-yellow mb-4">{categoryTitleMap[category]}</h1>
        <p className="text-gray-300 font-secondary mb-4 max-w-3xl">
          {categoryHeroCopy[category].intro}
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {categoryHeroCopy[category].highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-brand-yellow/35 bg-brand-yellow/10 px-3 py-1 text-xs text-brand-yellow font-tertiary"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-gray-300 font-secondary mb-10">
          Showing all {categoryProjects.length} {category} projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectCategoryPage;
