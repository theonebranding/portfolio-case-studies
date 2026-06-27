import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { projects, saasProducts } from "@/lib/data";
import { applySeo, getProjectSlug, upsertJsonLd } from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SparklesCore } from "@/components/ui/sparkles";

const getProductSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const ProductPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => saasProducts.find((p) => getProductSlug(p.title) === productSlug),
    [productSlug]
  );

  const relatedProjects = useMemo(() => {
    if (!product) return [];
    const keywords = product.title.toLowerCase().split(/\s+/);
    return projects
      .map((p) => {
        const haystack = [p.title, p.description, ...(p.technologies ?? [])].join(" ").toLowerCase();
        const score = keywords.filter((k) => haystack.includes(k)).length;
        return { p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ p }) => p);
  }, [product]);

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [productSlug]);

  useEffect(() => {
    if (!product) {
      applySeo({ title: "Product Not Found | Digol", description: "The requested product page does not exist.", path: `/products/${productSlug ?? ""}`, noindex: true });
      return;
    }
    const slug = getProductSlug(product.title);
    const keywords = [product.title, "SaaS product", "commercial software", "Digol", ...product.technologies].join(", ");
    applySeo({ title: `${product.title} | Digol`, description: product.description, keywords, path: `/products/${slug}`, type: "article" });
    upsertJsonLd("product-page-schema", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: product.title,
      description: product.description,
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", seller: { "@type": "Organization", name: "Digol", url: "https://digoltech.com" } },
      url: `https://digoltech.com/products/${slug}`,
    });
  }, [product, productSlug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-white">
        <Header />
        <main className="container mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="text-4xl font-primary text-brand-yellow mb-4">Product Not Found</h1>
          <p className="text-gray-300 font-secondary mb-8">The product page you requested does not exist.</p>
          <Link to="/#commercial-saas" className="inline-flex items-center gap-2 text-brand-yellow hover:text-brand-white transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white overflow-hidden">
      <Header />
      <main className="pt-32 pb-20">

        {/* ── Hero banner ── */}
        <section className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-brand-yellow/30 p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            {/* Dark mode */}
            <div className="hidden dark:block absolute inset-0">
              <AnimatedGradientBackground
                Breathing={true} startingGap={120} breathingRange={1} animationSpeed={0.08}
                gradientColors={["#0A1628","#0D2647","#0D47A1","#1565C0","#1E88E5","#42A5F5","#42A5F5"]}
                gradientStops={[30,45,58,70,82,92,100]} containerClassName="opacity-85"
              />
              <div className="absolute inset-0 bg-black/45" />
            </div>
            {/* Light mode — frosted glass */}
            <div className="block dark:hidden absolute inset-0 bg-white/70 backdrop-blur-md border border-brand-yellow/20 rounded-3xl" />

            <div className="relative z-10">
              <Link to="/#commercial-saas" className="inline-flex items-center gap-2 text-sm font-secondary text-brand-coreBlue dark:text-blue-100 hover:text-brand-deepBlue dark:hover:text-white transition-colors mb-6">
                <ArrowLeft size={14} /> Back to Products
              </Link>
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-primary font-bold text-brand-coreBlue dark:text-white leading-tight">{product.title}</h1>
                <p className="text-brand-arcBlue dark:text-blue-50 text-base md:text-lg max-w-3xl mx-auto mt-4 font-secondary leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features + Tech ── */}
        <section className="container mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-7 rounded-2xl border border-gray-800 bg-gray-900/45 p-6 md:p-8">
              <h2 className="text-3xl font-primary text-brand-yellow mb-5 text-center">What You Get</h2>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200 font-secondary">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-yellow shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="xl:col-span-5 rounded-2xl border border-gray-800 bg-gray-900/45 p-6 md:p-8">
              <h2 className="text-3xl font-primary text-brand-yellow mb-5 text-center">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech, i) => (
                  <span key={i} className="rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-sm font-tertiary text-gray-100">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Related projects ── */}
        <section className="container mx-auto px-6 mt-14">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/45 p-6 md:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl md:text-4xl font-primary text-brand-yellow">Related Portfolio Projects</h2>
              <p className="text-gray-300 font-secondary mt-2">Real projects delivered in this product space.</p>
              <Link to="/#portfolio" className="inline-flex mt-4 items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors font-secondary">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
            {relatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((project) => (
                  <div
                    key={project.id}
                    role="link" tabIndex={0}
                    onClick={() => navigate(`/project/${getProjectSlug(project)}`)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/project/${getProjectSlug(project)}`)}
                    className="group rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/45 hover:border-brand-yellow/50 transition-all cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl text-brand-yellow font-primary mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 font-secondary line-clamp-3">{project.description}</p>
                      <span className="inline-flex items-center gap-2 text-brand-yellow text-sm font-secondary mt-4">View Case Study <ArrowRight size={14} /></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-800 bg-gray-900/45 p-6">
                <p className="text-gray-300 font-secondary text-center">Relevant case studies are being added. Explore our complete portfolio for more examples.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container mx-auto px-6 mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-brand-yellow/40 bg-brand-black px-6 py-10 md:px-10 md:py-12 text-center">
            <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-[2px] w-full blur-sm" />
            <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-px w-full" />
            <div className="absolute inset-0">
              <SparklesCore background="transparent" minSize={0.8} maxSize={2.8} particleDensity={260} className="w-full h-full" particleColor="#42A5F5" />
            </div>
            <div className="absolute inset-0 bg-brand-black/65" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-primary text-brand-yellow mb-3">Want {product.title} for Your Business?</h2>
              <p className="text-gray-200 max-w-3xl mx-auto font-secondary leading-relaxed mb-6">
                We'll deploy and customise this SaaS product to match your brand, workflows, and scale requirements.
              </p>
              <Button variant="primary" className="px-8 py-6 text-lg font-secondary">
                <a href="/#contact">Start Your Project</a>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
