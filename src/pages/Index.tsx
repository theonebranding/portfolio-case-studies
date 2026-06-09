
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { applySeo } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    applySeo({
      title: "Digol | Portfolio",
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
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
