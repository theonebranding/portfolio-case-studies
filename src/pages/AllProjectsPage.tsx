import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { projects, Project } from "@/lib/data";
import { applySeo, getProjectSlug } from "@/lib/seo";
import { ArrowRight, ChevronLeft, ExternalLink } from "lucide-react";
import Contact from "@/components/Contact";

type Category = "website" | "software" | "applications";
const categories: Category[] = ["website", "software", "applications"];

const categoryLabel: Record<Category, string> = {
  website: "Website Projects",
  software: "Software Projects",
  applications: "Application Projects",
};

const categoryHeroCopy: Record<Category, { intro: string; highlights: string[] }> = {
  website: {
    intro: "Conversion-focused website projects built for speed, SEO performance, and strong brand storytelling across modern devices.",
    highlights: ["Responsive UI/UX", "Technical SEO structure", "Lead generation pages", "E-commerce solutions", "Content management systems", "Custom web applications"],
  },
  software: {
    intro: "Business software case studies focused on process automation, data visibility, and scalable architecture for growing teams.",
    highlights: ["Workflow automation", "Role-based dashboards", "Secure backend systems"],
  },
  applications: {
    intro: "Mobile application case studies designed for real-world usage with smooth interactions, robust APIs, and long-term maintainability.",
    highlights: ["Cross-platform delivery", "Performance-first UX", "Scalable app backend"],
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const isInternational = project.client?.country !== "India";

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/project/${getProjectSlug(project)}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/project/${getProjectSlug(project)}`)}
      className="relative group overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium ${isInternational ? "bg-emerald-500/90 text-white" : "bg-orange-500/90 text-white"}`}>
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
        <h3 className="text-xl font-bold font-primary text-brand-yellow mb-2">{project.title}</h3>
        <div className="text-base font-secondary mb-3 flex items-center gap-2">
          <span className="text-gray-400">Client from</span>
          <span className={`font-bold underline underline-offset-2 ${isInternational ? "text-emerald-400" : "text-orange-400"}`}>
            {project.client?.country}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} className="ml-1" />
            </a>
          )}
        </div>
        <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-tertiary">{tech}</span>
          ))}
        </div>
        <div className="flex items-center text-brand-yellow mt-auto">
          <span className="text-sm font-medium mr-2">View Details</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

const AllProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    applySeo({
      title: "All Projects | Digol",
      description: "Explore all Digol case studies — websites, software, and mobile applications.",
      keywords: "Digol, portfolio, projects, website, software, applications, case studies",
      path: "/projects",
      type: "website",
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-black/95 text-brand-white">
      <Header />
      <main className="container mx-auto px-6 pt-32 pb-20">

        <Button variant="glass" onClick={() => navigate(-1)} className="mb-10">
          <ChevronLeft size={20} className="mr-1" /> Back
        </Button>

        <div className="space-y-20">
          {categories.map((cat) => {
            const catProjects = projects.filter((p) => p.category === cat);
            if (catProjects.length === 0) return null;
            const { intro, highlights } = categoryHeroCopy[cat];

            return (
              <div key={cat}>
                {/* Category header */}
                <h1 className="text-4xl md:text-5xl font-primary font-bold text-brand-yellow mb-4">
                  {categoryLabel[cat]}
                </h1>
                <p className="text-gray-300 font-secondary mb-4 max-w-3xl">{intro}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-yellow/35 bg-brand-yellow/10 px-3 py-1 text-xs text-brand-yellow font-tertiary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 font-secondary mb-10">
                  Showing all {catProjects.length} {cat} projects.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </main>
      <Contact/>
      <Footer />
    </div>
  );
};

export default AllProjectsPage;
