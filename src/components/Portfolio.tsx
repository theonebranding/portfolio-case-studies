import { projects } from "@/lib/data";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TechnologySlider from "@/components/TechnologySlider";

const Portfolio = () => {
  const websiteProjects = projects.filter(
    (project) => project.category === "website"
  );
  const softwareProjects = projects.filter(
    (project) => project.category === "software"
  );

  // Function to generate project slug
  const getProjectSlug = (project) => {
    return project.title.toLowerCase().replace(/\s+/g, "-") || project.id;
  };

  return (
    <section id="portfolio" className="pb-24 pt-0 bg-brand-black/90">
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
          <div className="flex justify-center mb-10 mt-8 md:mb-16">
            <TabsList className="bg-gray-900 flex border py-6 px-6 border-brand-black/50 rounded-lg">
              <TabsTrigger
                value="websites"
                className="py-4 px-8 data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black"
              >
                Websites
              </TabsTrigger>
              <TabsTrigger
                value="software"
                className="py-4 px-8 data-[state=active]:bg-brand-yellow data-[state=active]:text-brand-black"
              >
                Software
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="websites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${getProjectSlug(project)}`}
                  className="relative group overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover-card-effect cursor-pointer flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-primary text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3 mb-4 font-secondary">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full font-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-brand-yellow mt-auto">
                      <span className="text-sm font-medium mr-2">View Project</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="software">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${getProjectSlug(project)}`}
                  className="relative group overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover-card-effect cursor-pointer flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-brand-yellow mt-auto">
                      <span className="text-sm font-medium mr-2">View Project</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Portfolio;