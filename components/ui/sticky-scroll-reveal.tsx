"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
}

export const StickyScroll: React.FC<StickyScrollProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Background colors for each section
  const backgroundColors: string[] = [
    "#1e293b", // slate-900
    "#000000", // black
    "#171717", // neutral-900
    "#0f172a", // more dark slate
    "#2f4f4f", // dark slate gray
    "#1e293b", // slate-900
  ];

  // Interpolate background color based on scroll progress
  const backgroundColor = useTransform(
    scrollYProgress,
    content.map((_, i) => i / content.length),
    backgroundColors.slice(0, content.length)
  );

  // Update the active card index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollPosition = ref.current.scrollTop;
      const sectionHeight = ref.current.scrollHeight / content.length;
      const index = Math.floor(scrollPosition / sectionHeight);
      setActiveIndex(index);
    };

    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [content.length]);

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className="h-[30rem] overflow-y-auto flex justify-center relative custom-scrollbar space-x-10 rounded-md p-10"
    >
      {/* Left Side Content */}
      <div className="relative flex flex-col items-start px-4 max-w-2xl">
        {content.map((item, index) => (
          <div key={index} className="my-20">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-slate-100"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-slate-300 max-w-sm mt-10"
            >
              {item.description}
            </motion.p>
          </div>
        ))}

      </div>

      {/* Sticky Content (Right Side) */}
      <div className="hidden lg:block h-80 w-[38rem] p-1 rounded-md bg-white sticky top-10 overflow-hidden">
        {content[activeIndex]?.content ?? null}
      </div>
    </motion.div>
  );
};

export default StickyScroll;


