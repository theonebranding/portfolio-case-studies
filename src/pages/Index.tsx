
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import PreBuiltSolutions from "@/components/PreBuiltSolutions";
import CommercialSaaS from "@/components/CommercialSaaS";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { applySeo } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    applySeo({
      title: "DIGOL | Custom Software Development, SaaS Solutions & AI Engineering",
      description:
        "Explore Digol case studies for websites, software, and mobile applications.",
      keywords:
        "Digol, portfolio, case studies, website development, software development, mobile app development, branding, digital marketing, Anand Gujarat",
      path: "/",
      type: "website",
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <PreBuiltSolutions />
        <CommercialSaaS />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
