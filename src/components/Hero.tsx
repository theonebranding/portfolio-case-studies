'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// import { Mouse } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';


const Hero = () => {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const rotatingTexts = [
    'Custom Web | App | Software Development Solution',
    'Ai | Machine learning Solution',
    'SaaS Builder | E-commerce | Cloud Dev Solution',
    'SaaS Products for Your Digital Business Growth',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((current) => (current + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col pt-20 items-center justify-center relative overflow-hidden"
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-black to-brand-black animate-gradient-flow"></div>
  
      <div className="container mx-auto px-4 sm:px-6 z-10 text-center">
        <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold text-brand-white font-primary text-center leading-tight whitespace-nowrap px-2">
          Your Business Goal - We Design, Build &amp; Scale
        </h1>

        <h1 className="rotating-text mt-6 sm:mt-8 h-16 sm:h-20 md:h-32 mb-8 sm:mb-12 overflow-hidden relative text-center">
          {/* Rotating Text */}
          <div className="absolute inset-0 flex items-center justify-center space-y-6">
            {rotatingTexts.map((text, index) => (
              <span
                key={index}
                className={`rotating-text-item text-lg sm:text-2xl md:text-3xl lg:text-4xl font-primary font-bold gradient-text z-20 px-4 leading-tight ${
                  index === activeTextIndex ? 'active' : ''
                }`}
              >
                {text}
              </span>
            ))}
          </div>
          <div>
            {/* Gradients */}
            <div className="h-[30rem] sm:h-[40rem] w-full bg-brand-black flex flex-col items-center justify-center overflow-hidden rounded-md z-0 relative">
              <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-[2px] w-full blur-sm" />
              <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-px w-full" />
              <div className="absolute inset-x-30 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[5px] w-3/4 blur-sm" />
              <div className="absolute inset-x-30 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent h-px w-3/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={1}
                maxSize={1.5}
                particleDensity={180}
                className="w-full h-full"
                particleColor="#42A5F5"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-brand-black [mask-image:radial-gradient(500px_200px_at_top,transparent_30%,white)] sm:[mask-image:radial-gradient(700px_250px_at_top,transparent_30%,white)]"></div>
            </div>
          </div>
        </h1>
        
        {/* <p className="max-w-3xl sm:max-w-5xl mx-auto mb-6 sm:mb-8 -mt-2 sm:-mt-4 text-sm sm:text-base md:text-lg">
          <TypewriterEffectSmooth words={words} className='text-brand-white text-sm sm:text-base md:text-lg' />
        </p> */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button asChild variant="primary" className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-tertiary">
            <a href="#portfolio" className="text-white">View Our Work</a>
          </Button>
          <Button
            asChild
            variant="glass"
            className="px-6 py-4 sm:px-10 sm:py-6 text-base sm:text-xl font-tertiary"
          >
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
      </div>

      {/* <a
        href="#portfolio"
        className="absolute bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 text-brand-yellow animate-bounce"
      >
        <Mouse size={40} />
      </a> */}
    </section>
  );
};

export default Hero;
