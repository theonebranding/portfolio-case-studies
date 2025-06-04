
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Services />        
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
