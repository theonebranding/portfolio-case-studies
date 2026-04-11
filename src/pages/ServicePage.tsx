import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { projects, services } from "@/lib/data";
import { applySeo, getProjectSlug, upsertJsonLd } from "@/lib/seo";
import { getRelatedProjectsForService, getServiceProjectCategories, getServiceSlug } from "@/lib/service-utils";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

const ServicePage = () => {
  const { serviceSlug } = useParams();

  const service = useMemo(
    () => services.find((item) => getServiceSlug(item.title) === serviceSlug),
    [serviceSlug]
  );

  const relatedProjects = useMemo(() => {
    if (!service) return [];
    return getRelatedProjectsForService(service, projects);
  }, [service]);

  useEffect(() => {
    if (!service) {
      applySeo({
        title: "Service Not Found | The One Branding",
        description: "The requested service page does not exist.",
        path: `/services/${serviceSlug ?? ""}`,
        noindex: true,
      });
      return;
    }

    const slug = getServiceSlug(service.title);
    const keywords = [service.title, `${service.title} services`, ...service.technologies, "The One Branding"].join(", ");

    applySeo({
      title: `${service.title} | The One Branding`,
      description: service.description,
      keywords,
      path: `/services/${slug}`,
      type: "article",
    });

    upsertJsonLd("service-page-schema", {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "The One Branding",
        url: "https://theonebranding.com",
      },
      areaServed: "IN",
      url: `https://theonebranding.com/services/${slug}`,
      serviceType: service.title,
      keywords,
    });
  }, [service, serviceSlug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-brand-black text-white">
        <Header />
        <main className="container mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="text-4xl font-primary text-brand-yellow mb-4">Service Not Found</h1>
          <p className="text-gray-300 font-secondary mb-8">The service page you requested does not exist.</p>
          <Link to="/#services" className="inline-flex items-center gap-2 text-brand-yellow hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categories = getServiceProjectCategories(service.title);

  return (
    <div className="min-h-screen bg-brand-black text-white overflow-hidden">
      <Header />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-brand-yellow/30 p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <AnimatedGradientBackground
              Breathing={true}
              startingGap={120}
              breathingRange={1}
              animationSpeed={0.08}
              gradientColors={[
                "#000000",
                "#121212",
                "#1C1C1C",
                "#6B5600",
                "#A27F00",
                "#FFC700",
                "#FFC700",
              ]}
              gradientStops={[30, 45, 58, 70, 82, 92, 100]}
              containerClassName="opacity-85"
            />
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10">
            <Link to="/#services" className="inline-flex items-center gap-2 text-sm font-secondary text-gray-300 hover:text-brand-yellow transition-colors mb-6">
              <ArrowLeft size={14} /> Back to Services
            </Link>

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-primary font-bold text-brand-yellow leading-tight">{service.title}</h1>
                <p className="text-gray-200 text-base md:text-lg max-w-3xl mt-4 font-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-7 rounded-2xl border border-gray-800 bg-gray-900/45 p-6 md:p-8">
              <h2 className="text-3xl font-primary text-brand-yellow mb-5">What You Get</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-200 font-secondary">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-yellow shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="xl:col-span-5 rounded-2xl border border-gray-800 bg-gray-900/45 p-6 md:p-8">
              <h2 className="text-3xl font-primary text-brand-yellow mb-5">Technology Stack</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.technologies.map((tech, index) => (
                  <span key={index} className="rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-sm font-tertiary text-gray-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-primary text-brand-yellow">Related Portfolio Projects</h2>
              <p className="text-gray-300 font-secondary mt-2">Real projects delivered in this service direction.</p>
            </div>
            <Link to="/#portfolio" className="hidden md:inline-flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors font-secondary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${getProjectSlug(project)}`}
                  className="group rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-brand-yellow/50 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl text-brand-yellow font-primary mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300 font-secondary line-clamp-3">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-brand-yellow text-sm font-secondary mt-4">
                      View Case Study <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-800 bg-gray-900/45 p-6">
              <p className="text-gray-300 font-secondary">Relevant case studies are being added. Explore our complete portfolio for more examples.</p>
            </div>
          )}
        </section>

        <section className="container mx-auto px-6 mt-16">
          <div className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 px-6 py-8 md:px-10 md:py-10 text-center">
            <h3 className="text-3xl md:text-4xl font-primary text-brand-yellow mb-3">Need {service.title} for Your Business?</h3>
            <p className="text-gray-200 max-w-3xl mx-auto font-secondary leading-relaxed mb-6">
              We can design and deliver a custom solution tailored to your goals, timeline, and budget.
            </p>
            <Button className="bg-brand-yellow text-brand-black hover:bg-brand-white px-8 py-6 text-lg font-secondary">
              <a href="/#contact">Start Your Project</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
