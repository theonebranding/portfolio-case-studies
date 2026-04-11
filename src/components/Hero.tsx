'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// import { Mouse } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';


const Hero = () => {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [activeHeadingTextIndex, setActiveHeadingTextIndex] = useState(0);
  const headingRotatingTexts = [
    'Website',
    'Application',
    'Software',
  ];
  const rotatingTexts = [
    'E-commerce Websites',
    'SEO Friendly Websites',
    'Full Stack Web Applications',
    'Custom Software Solutions', 
    'Custom Mobile Applications',
    'AI-Powered Software Solutions',
    'Cross-Platform Mobile Apps',
    'Android Applications',
    'iOS Applications',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((current) => (current + 1) % rotatingTexts.length);
      setActiveHeadingTextIndex((current) => (current + 1) % headingRotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length, headingRotatingTexts.length]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col pt-20 items-center justify-center relative overflow-hidden"
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-black to-black animate-gradient-flow"></div>
  
      <div className="container mx-auto px-4 sm:px-6 z-10 text-center">
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-brand-white font-primary">          
          <span className="inline-block min-w-[9ch] text-right">{headingRotatingTexts[activeHeadingTextIndex]}</span> Case Studies
        </h1>

        <div className="rotating-text mt-6 sm:mt-8 h-16 sm:h-20 md:h-32 mb-8 sm:mb-12 overflow-hidden relative">
          {/* Rotating Text */}
          <div className="absolute inset-0 flex items-center justify-center space-y-6">
            {rotatingTexts.map((text, index) => (
              <div
                key={index}
                className={`rotating-text-item text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-primary font-bold gradient-text z-20 ${
                  index === activeTextIndex ? 'active' : ''
                }`}
              >
                {text}
              </div>
            ))}
          </div>
          <div>
            {/* Gradients */}
            <div className="h-[30rem] sm:h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md z-0 relative">
              <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-[2px] w-full blur-sm" />
              <div className="absolute inset-x-10 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-brand-yellow to-transparent h-px w-full" />
              <div className="absolute inset-x-30 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-[5px] w-3/4 blur-sm" />
              <div className="absolute inset-x-30 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent h-px w-3/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={1}
                maxSize={1.5}
                particleDensity={180}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-brand-black [mask-image:radial-gradient(500px_200px_at_top,transparent_30%,white)] sm:[mask-image:radial-gradient(700px_250px_at_top,transparent_30%,white)]"></div>
            </div>
          </div>
        </div>
        
        {/* <p className="max-w-3xl sm:max-w-5xl mx-auto mb-6 sm:mb-8 -mt-2 sm:-mt-4 text-sm sm:text-base md:text-lg">
          <TypewriterEffectSmooth words={words} className='text-brand-white text-sm sm:text-base md:text-lg' />
        </p> */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button asChild className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-tertiary">
            <a href="#portfolio" className="text-brand-black">View Our Work</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-brand-white text-brand-black hover:bg-gray-200 px-6 py-4 sm:px-10 sm:py-6 text-base sm:text-xl font-tertiary"
          >
            <a href="#contact" className="text-brand-black">Get In Touch</a>
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