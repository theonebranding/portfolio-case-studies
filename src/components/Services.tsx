import { services } from "@/lib/data";
import { ArrowRight, Cloud, FileText, Globe, MonitorCog, Server, ShoppingCart, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { AnimatedText } from "./ui/animated-underline-text-one";
import ListOfServices from "./ListOfServices";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getServiceSlug } from "@/lib/service-utils";

const ServiceIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "monitor-cog":
      return <MonitorCog className="h-8 w-8 text-brand-yellow" />;
    case "sparkles":
      return <Sparkles className="h-8 w-8 text-brand-yellow" />;
    case "globe":
      return <Globe className="h-8 w-8 text-brand-yellow" />;
    case "file-text":
      return <FileText className="h-8 w-8 text-brand-yellow" />;
    case "shopping-cart":
      return <ShoppingCart className="h-8 w-8 text-brand-yellow" />;
    case "server":
      return <Server className="h-8 w-8 text-brand-yellow" />;
    case "cloud":
      return <Cloud className="h-8 w-8 text-brand-yellow" />;
    case "smartphone":
      return <Smartphone className="h-8 w-8 text-brand-yellow" />;
    case "trending-up":
      return <TrendingUp className="h-8 w-8 text-brand-yellow" />;
    default:
      return <MonitorCog className="h-8 w-8 text-brand-yellow" />;
  }
};

const Services = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="pt-12 pb-0 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedText
          text="Our Services"
          textClassName="text-5xl  md:text-6xl font-bold mb-2 text-brand-yellow"
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={2}
        />
        <p className="text-gray-400 text-center max-w-4xl mx-auto mt-12 mb-16 font-secondary">
          We offer a wide range of services to cater to your needs, from web
          development to mobile app solutions. Our team is dedicated to
          delivering high-quality results that exceed your expectations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const topTechnologies = service.technologies.slice(0, 4);
            const topHighlights = service.features.slice(0, 2);

            return (
            <div
              key={service.id}
              className="service-card bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
            >
              

              <div className="flex items-center justify-between mb-4">
                <ServiceIcon icon={service.icon} />
            
              {/* <div className="mb-4"> */}
                <Link
                  to={`/services/${getServiceSlug(service.title)}`}
                  className="inline-flex items-between gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow hover:text-brand-white transition-colors font-secondary"
                >
                  <span className="hover:underline underline-offset-4">Explore Service</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-yellow font-primary">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-4 text-sm font-secondary">{service.description}</p>

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

              {/* Features */}
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
          )})}
        </div>
      </div>
      <div ref={sectionRef} className="md:block hidden">
        {isInView ? <ListOfServices /> : <div className="h-[350px] w-full" />}
      </div>
    </section>
  );
};

export default Services;