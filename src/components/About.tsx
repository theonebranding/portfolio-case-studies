'use client';

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { Code2, Layers, BrainCircuit } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Custom Engineering",
    body: "Bespoke software, web, and mobile platforms built precisely to your requirements — no templates, no shortcuts.",
  },
  {
    icon: Layers,
    title: "Turnkey SaaS & Cloud",
    body: "Ready-to-launch SaaS products and cloud / DevOps infrastructure that let you go to market faster without sacrificing quality.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    body: "Intelligent automation, predictive analytics, and AI-powered platforms that turn your data into a competitive advantage.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

const About = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <section id="about" ref={ref} className="py-20 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Section title ── */}
        <AnimatedText
          text="About Company"
          textClassName="text-5xl md:text-6xl font-bold mb-2 text-brand-yellow"
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={2}
        />

        {/* ── Main copy card with sparkle background ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-brand-yellow/25 p-10 md:p-16 mt-12 mb-16 text-center"
        >
          {/* Sparkle layer */}
          <div className="absolute inset-0 z-0">
            <SparklesCore
              background="transparent"
              minSize={0.6}
              maxSize={1.6}
              particleDensity={120}
              className="w-full h-full"
              particleColor="#42A5F5"
            />
          </div>

          {/* Gradient overlay so sparkles feel layered, not harsh */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-black/10 via-brand-black/40 to-brand-black/80 dark:from-brand-black/20 dark:via-brand-black/50 dark:to-brand-black/90" />

          {/* Top accent line */}
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow to-transparent z-[2]" />
          <div className="absolute inset-x-16 top-0 h-[2px] blur-sm bg-gradient-to-r from-transparent via-brand-yellow to-transparent z-[2]" />

          <div className="relative z-[3]">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-primary text-brand-white leading-tight mb-6 max-w-4xl mx-auto">
              From idea to impact —{" "}
              <span className="text-brand-yellow">DIGOL</span> is your technology partner.
            </h2>

            {/* Body paragraphs */}
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto font-secondary leading-relaxed mb-5">
              From custom software engineering to turnkey SaaS solutions and AI-powered platforms — DIGOL is the technology partner that takes your goal from idea to impact.
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto font-secondary leading-relaxed">
              Whether you need a custom software platform, a ready-to-launch SaaS product, cloud and DevOps infrastructure, or an AI and machine learning solution — DIGOL designs it with precision, builds it with expertise, and scales it without limits.
            </p>

            {/* Tag line */}
            <p className="mt-8 text-brand-yellow font-primary font-semibold text-lg md:text-xl tracking-wide">
              One partner. Three pillars. Infinite possibilities for your business.
            </p>
          </div>
        </motion.div>

        {/* ── Three pillar cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 1}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 hover:border-brand-yellow/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-yellow/5 to-transparent rounded-2xl" />

              <div className="relative z-10">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-yellow/10 border border-brand-yellow/20">
                  <pillar.icon className="h-7 w-7 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold font-primary text-brand-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 font-secondary text-sm leading-relaxed">{pillar.body}</p>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
