import { projects } from "@/lib/data";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TechnologySlider from "@/components/TechnologySlider";
import { getProjectSlug } from "@/lib/seo";

type ProjectCategory = "website" | "software" | "application";

const getTopProjects = (category: ProjectCategory) =>
  projects.filter((project) => project.category === category).slice(0, 3);

const SectionHeader = ({
  title,
  category,
}: {
  title: string;
  category: ProjectCategory;
}) => (
  <div className="mb-6 flex items-center justify-between gap-4">
    <h2 className="text-3xl md:text-4xl font-bold text-brand-yellow font-primary">{title}</h2>
    <Link
      to={`/project/${category}`}
      className="group inline-flex items-center gap-2 rounded-lg border border-brand-yellow/40 px-4 py-2 text-sm font-semibold text-brand-yellow transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-black"
    >
      View All
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);

const ProjectGrid = ({ category }: { category: ProjectCategory }) => {
  const categoryProjects = getTopProjects(category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryProjects.map((project) => {
        const isInternational = project.client?.country !== "India";

        return (
          <Link
            key={project.id}
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
                  <span
                    className={`font-bold underline underline-offset-2 ${
                      isInternational ? "text-emerald-400" : "text-orange-400"
                    }`}
                  >
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
                {project.technologies.slice(0, 4).map((tech, index) => (
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
      })}
    </div>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="pb-24 pt-12 bg-brand-black/90">
      <div className="container mx-auto px-6">
        <AnimatedText
          text="Technologies We Use"
          textClassName="text-6xl font-bold mb-2 text-brand-yellow"
          underlinePath="M 0,10 Q 50,20 300,10 Q 250,0 400,10"
          underlineHoverPath="M 0,10 Q 150,20 300,10 Q 250,0 450,10"
          underlineDuration={2}
        />
        <div className="relative z-20 mb-20">
          <p className="text-center text-gray-300 my-8 font-secondary">Our expertise spans across a wide range of modern technologies.</p>
          <div className="w-full overflow-hidden bg-gray-800 rounded-lg shadow-lg">
            <TechnologySlider />
          </div>
        </div>

        <AnimatedText
          text="Our Portfolio"
          textClassName="text-7xl font-bold mb-2 text-brand-yellow"
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={2}
        />

        <p className="text-gray-200 text-center max-w-3xl mx-auto mt-8 mb-16 font-secondary">
          Explore our featured work across websites, software, and applications.
        </p>

        <div className="space-y-16">
          <div>
            <SectionHeader title="Website" category="website" />
            <ProjectGrid category="website" />
          </div>

          <div>
            <SectionHeader title="Software" category="software" />
            <ProjectGrid category="software" />
          </div>

          <div>
            <SectionHeader title="Application" category="application" />
            <ProjectGrid category="application" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
