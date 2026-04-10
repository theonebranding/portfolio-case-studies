"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MobileFrame } from "@/components/ui/mobile-frame";

export const MobileContainerScroll = ({
  titleComponent,
  imageSrc,
}: {
  titleComponent: string | React.ReactNode;
  imageSrc?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.86, 1] : [0.95, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div
      className="h-[60rem] md:h-[60rem] flex items-center justify-center relative overflow-hidden"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          style={{
            translateY: translate,
          }}
          className="max-w-6xl mx-auto text-center"
        >
          {titleComponent}
        </motion.div>

        <motion.div
          style={{
            rotateX: rotate,
            scale,
            // boxShadow:
            //   "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="max-w-5xl -mt-3 mx-auto h-[30rem] md:h-[38rem] w-full rounded-[30px] flex items-center justify-center"
        >
          <MobileFrame
            src={imageSrc}
            style={{
              maxWidth: isMobile ? "220px" : "320px",
              width: "80%",
              height: "auto",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
