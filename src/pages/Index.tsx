
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import PreBuiltSolutions from "@/components/PreBuiltSolutions";
import CommercialSaaS from "@/components/CommercialSaaS";
import About from "@/components/About";
import ListOfServices from "@/components/ListOfServices";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { applySeo } from "@/lib/seo";

const Index = () => {
  const [listInView, setListInView] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setListInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (listRef.current) observer.observe(listRef.current);
    return () => { if (listRef.current) observer.unobserve(listRef.current); };
  }, []);
  useEffect(() => {
    applySeo({
      title: "Digol",
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
        <div ref={listRef} className="md:block hidden">
          {listInView ? <ListOfServices /> : <div className="h-[350px] w-full" />}
        </div>
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
