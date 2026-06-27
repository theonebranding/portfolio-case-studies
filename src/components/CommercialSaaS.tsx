import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimatedText } from "./ui/animated-underline-text-one";
import { saasProducts } from "@/lib/data";

const getProductSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const ProductIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "message-circle": return <MessageCircle className="h-8 w-8 text-brand-yellow" />;
    default:               return <MessageCircle className="h-8 w-8 text-brand-yellow" />;
  }
};

const CommercialSaaS = () => (
  <section id="commercial-saas" className="pt-12 pb-16 bg-brand-black overflow-hidden">
    <div className="container mx-auto px-6">
      <AnimatedText
        text="Commercial SaaS Products"
        textClassName="text-5xl md:text-6xl font-bold mb-2 text-brand-yellow"
        underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
        underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
        underlineDuration={2}
      />
      <p className="text-gray-400 text-center max-w-4xl mx-auto mt-12 mb-16 font-secondary">
        Production-ready SaaS products you can license, white-label, or deploy for your business — built on modern stacks and designed for real-world scale.
      </p>

      <div className="flex justify-center">
        {saasProducts.map((product) => {
          const topTech       = product.technologies.slice(0, 4);
          const topHighlights = product.features.slice(0, 2);

          return (
            <div
              key={product.id}
              className="service-card bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <ProductIcon icon={product.icon} />
                <Link
                  to={`/products/${getProductSlug(product.title)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-2 text-sm text-brand-yellow hover:text-brand-white transition-colors font-secondary"
                >
                  <span className="hover:underline underline-offset-4">Explore Product</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <h3 className="text-xl font-bold mb-2 text-brand-yellow font-primary">{product.title}</h3>
              <p className="text-gray-400 mb-4 text-sm font-secondary">{product.description}</p>

              <div className="mb-4">
                <h4 className="text-sm text-gray-100 font-semibold mb-2 font-secondary">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {topTech.map((tech, i) => (
                    <span key={i} className="bg-gray-800/70 text-gray-300 text-xs px-2 py-1 rounded-full font-tertiary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-100 font-semibold mb-2 font-secondary">KEY HIGHLIGHTS</h4>
                <ul className="space-y-2">
                  {topHighlights.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand-yellow mr-2">•</span>
                      <span className="text-gray-400 text-sm font-secondary">{f}</span>
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

export default CommercialSaaS;
