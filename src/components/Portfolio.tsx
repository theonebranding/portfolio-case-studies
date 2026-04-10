import { projects } from "@/lib/data";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppWindow, ArrowRight, ExternalLink, Globe, MonitorCog } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TechnologySlider from "@/components/TechnologySlider";

const Portfolio = () => {
  const websiteProjects = projects.filter(
    (project) => project.category === "website"
  );
  const softwareProjects = projects.filter(
    (project) => project.category === "software"
  );
  const applicationProjects = projects.filter(
    (project) => project.category === "application"
  );
  const tabsTriggerClassName =
    "group relative inline-flex items-center justify-center gap-2 rounded-xl border border-transparent px-5 py-3 text-sm md:text-base font-semibold text-gray-200 transition-all duration-300 data-[state=active]:border-brand-yellow/60 data-[state=active]:bg-gradient-to-b data-[state=active]:from-brand-yellow data-[state=active]:to-yellow-300 data-[state=active]:text-brand-black data-[state=active]:shadow-[0_10px_30px_rgba(250,204,21,0.25)] hover:text-brand-yellow hover:border-brand-yellow/30 hover:bg-white/5";

  // Function to generate project slug
  const getProjectSlug = (project) => {
    return project.title.toLowerCase().replace(/\s+/g, "-") || project.id;
  };

  return (
    <section id="portfolio" className="pb-24 pt-12 bg-brand-black/90">
      <div className="container mx-auto px-6">
        <div className="relative z-20 mb-20">
          <h2 className="text-center text-5xl font-bold text-brand-yellow mb-4 font-primary">Technologies We Work With</h2>
          <p className="text-center text-gray-300 mb-8 font-secondary">Our expertise spans across a wide range of modern technologies.</p>
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
    
        <p className="text-gray-200 text-center max-w-3xl mx-auto mt-8 font-secondary">
          Explore our diverse collection of projects across websites and software
          solutions, showcasing our expertise and creative approach.
        </p>

        <Tabs defaultValue="websites" className="w-full">
          <div className="mb-10 mt-8 md:mb-16">
            <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-2 rounded-2xl bg-black backdrop-blur-xl sm:grid-cols-3">
              <TabsTrigger
                value="websites"
                className={tabsTriggerClassName}
              >
                <Globe size={17} className="transition-transform duration-300 group-data-[state=active]:scale-105" />
                <span className="relative z-10">Websites</span>
              </TabsTrigger>
              <TabsTrigger
                value="software"
                className={tabsTriggerClassName}
              >
                <MonitorCog size={17} className="transition-transform duration-300 group-data-[state=active]:scale-105" />
                <span className="relative z-10">Software</span>
              </TabsTrigger>
              <TabsTrigger
                value="application"
                className={tabsTriggerClassName}
              >
                <AppWindow size={17} className="transition-transform duration-300 group-data-[state=active]:scale-105" />
                <span className="relative z-10">Application</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="websites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {websiteProjects.map((project) => {
                const isInternational = project.client?.country !== 'India';
                
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
                      <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium ${
                        isInternational 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-orange-500/90 text-white'
                      }`}>
                        {isInternational ? (
                          <span className="flex items-center">
                            <img src="../assets/icon/global-icon.png" alt="Global Client" width={16} height={16} className="mr-1" />
                            International Client
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <img src="../assets/icon/india-icon.png" alt="Indian Client" width={16} height={16} className="mr-1" />
                            Indian Client
                          </span>
                        )}        
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4 flex flex-col items-start">
                        <h3 className="text-xl font-bold font-primary text-brand-yellow mb-2">
                          {project.title}
                        </h3>
                        <div className="text-base font-secondary mb-1 flex items-center gap-2">
                          <span className="text-gray-400">Client from </span>
                          <span className={`font-bold underline-offset-2 underline ${isInternational ? 'text-emerald-400' : 'text-orange-400'}`}>
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
                      <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-tertiary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-brand-yellow">
                          <span className="text-sm font-medium mr-2">View Details</span>
                          <ArrowRight size={16} />
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mr-1">Open Project</span>
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="software">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {softwareProjects.map((project) => {
                const isInternational = project.client?.country !== 'India';
                
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
                      <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium ${
                        isInternational 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-orange-500/90 text-white'
                      }`}>
                        {isInternational ? (
                          <span className="flex items-center">
                            <img src="../assets/icon/global-icon.png" alt="Global Client" width={16} height={16} className="mr-1" />
                            International Client
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <img src="../assets/icon/india-icon.png" alt="Indian Client" width={16} height={16} className="mr-1" />
                            Indian Client
                          </span>
                        )}        
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4 flex flex-col items-start">
                        <h3 className="text-xl font-bold font-primary text-brand-yellow mb-2">
                          {project.title}
                        </h3>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="mr-1">Open Project <ExternalLink size={14} className="ml-1" /></span>
                             
                            </a>
                          )}
                        <div className="text-base font-secondary mb-1 flex items-center gap-2">
                          <span className="text-gray-400">Client from </span>
                          <span className={`font-bold underline-offset-2 underline ${isInternational ? 'text-emerald-400' : 'text-orange-400'}`}>
                            {project.client?.country}
                          </span>
                        </div>
                      </div> 
                      <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-tertiary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-brand-yellow">
                          <span className="text-sm font-medium mr-2">View Details</span>
                          <ArrowRight size={16} />
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mr-1">Open Project</span>
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="application">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {applicationProjects.map((project) => {
                const isInternational = project.client?.country !== 'India';

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
                      <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium ${
                        isInternational
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-orange-500/90 text-white'
                      }`}>
                        {isInternational ? (
                          <span className="flex items-center">
                            <img src="../assets/icon/global-icon.png" alt="Global Client" width={16} height={16} className="mr-1" />
                            International Client
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <img src="../assets/icon/india-icon.png" alt="Indian Client" width={16} height={16} className="mr-1" />
                            Indian Client
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4 flex flex-col items-start">
                        <h3 className="text-xl font-bold font-primary text-brand-yellow mb-2">
                          {project.title}
                        </h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mr-1">Open Project <ExternalLink size={14} className="ml-1" /></span>

                          </a>
                        )}
                        <div className="text-base font-secondary mb-1 flex items-center gap-2">
                          <span className="text-gray-400">Client from </span>
                          <span className={`font-bold underline-offset-2 underline ${isInternational ? 'text-emerald-400' : 'text-orange-400'}`}>
                            {project.client?.country}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-tertiary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-brand-yellow">
                          <span className="text-sm font-medium mr-2">View Details</span>
                          <ArrowRight size={16} />
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mr-1">Open Project</span>
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Portfolio;
