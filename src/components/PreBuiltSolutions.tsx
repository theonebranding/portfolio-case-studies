import { Link } from "react-router-dom";
import { Activity, ArrowRight, Building2, Users } from "lucide-react";
import { AnimatedText } from "./ui/animated-underline-text-one";
import { solutions } from "@/lib/data";

const getSolutionSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const SolutionIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "activity":  return <Activity  className="h-8 w-8 text-brand-yellow" />;
    case "building2": return <Building2 className="h-8 w-8 text-brand-yellow" />;
    case "users":     return <Users     className="h-8 w-8 text-brand-yellow" />;
    default:          return <Building2 className="h-8 w-8 text-brand-yellow" />;
  }
};

const PreBuiltSolutions = () => {
  // Show all 3 solutions on the home page
  const visibleSolutions = solutions.slice(0, 3);

  return (
    <section id="pre-built-solutions" className="pt-12 pb-16 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedText
          text="Pre-Built Solutions"
          textClassName="text-5xl md:text-6xl font-bold mb-2 text-brand-yellow"
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={2}
        />
        <p className="text-gray-400 text-center max-w-4xl mx-auto mt-12 mb-16 font-secondary">
          Ready-to-deploy platforms built for real industries — launch faster with a proven foundation and customise it to fit your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleSolutions.map((solution) => {
            const topTechnologies = solution.technologies.slice(0, 4);
            const topHighlights = solution.features.slice(0, 2);

            return (
              <div
                key={solution.id}
                className="service-card bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <SolutionIcon icon={solution.icon} />
                  <Link
                    to={`/solutions/${getSolutionSlug(solution.title)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow hover:text-brand-white transition-colors font-secondary"
                  >
                    <span className="hover:underline underline-offset-4">Explore Solution</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <h3 className="text-xl font-bold mb-2 text-brand-yellow font-primary">
                  {solution.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm font-secondary">{solution.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm text-gray-100 font-semibold mb-2 font-secondary">TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {topTechnologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-800/70 text-gray-300 text-xs px-2 py-1 rounded-full font-tertiary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-sm text-gray-100 font-semibold mb-2 font-secondary">KEY HIGHLIGHTS</h4>
                  <ul className="space-y-2">
                    {topHighlights.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-brand-yellow mr-2">•</span>
                        <span className="text-gray-400 text-sm font-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreBuiltSolutions;
