'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type BlurInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

const BlurIn = ({ children, delay = 0, duration = 0.6, className = '' }: BlurInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ delay, duration, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

const SplitText = ({ text, className = '', delay = 0 }: SplitTextProps) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * 0.08,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const rotatingTexts = [
    'E-commerce Websites',
    'SEO Friendly Websites',
    'FullStack Softwares',
    'Android Applications',
    'iOS Applications',
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
      className="relative h-screen w-full overflow-hidden bg-[#070612]"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover origin-left scale-[1.2] ml-[80px] md:ml-[140px] lg:ml-[200px]"
      >
        <source src="/assets/bg-video.mp4" type="video/mp4" />
        <source
          src="https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8"
          type="application/x-mpegURL"
        />
      </video>

      <div className="absolute bottom-0 left-0 z-10 h-40 w-full bg-gradient-to-t from-[#070612] to-transparent" />
      <div className="absolute inset-0 z-10 bg-[#070612]/55" />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-12">
        <div className="flex w-full flex-col items-center gap-12 text-center">
          <div className="flex w-full flex-col items-center gap-6">
            <BlurIn duration={0.6}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
                <span className="text-lg font-medium font-secondary text-white/80">
                The One Branding - Crafting Digital Excellence
                </span>
              </div>
            </BlurIn>

            <h1 className="w-full text-center text-[clamp(1rem,4.25vw,5.1rem)] font-medium leading-relaxed text-white font-primary whitespace-nowrap">
              <SplitText text="Our Web & Software Case Studies" />
            </h1>

            <BlurIn delay={0.4} duration={0.6}>
              <p className="mx-auto max-w-3xl text-xl md:text-2xl font-normal leading-relaxed text-white/80 font-inter text-center">
                We build high-impact digital products, from conversion-ready websites
                to scalable software and mobile applications.
              </p>
              <div className="mt-6 mx-auto inline-flex h-14 min-w-[300px] items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={rotatingTexts[activeTextIndex]}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="text-base md:text-lg text-white font-secondary tracking-wide"
                  >
                    {rotatingTexts[activeTextIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </BlurIn>
          </div>

          <BlurIn delay={0.6} duration={0.6}>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded-full px-6 py-3.5 h-auto min-h-0 bg-white text-[#070612] hover:bg-white/90 font-tertiary text-base md:text-lg"
              >
                <a href="#portfolio" className="inline-flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="h-4.5 w-4.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full px-9 py-3.5 h-auto min-h-0 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 font-tertiary text-base md:text-lg"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </BlurIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;