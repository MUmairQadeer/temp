import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CardScrollItem from "./CardScrollItem";

import Card1 from "./card-1.png";
import Card2 from "./card-2.png";
import Card4 from "./card-4.jpg";

// --- Card Data ---
const projects = [
  {
    id: 1,
    title: "A Story-Driven Career",
    description: [
      "Andrew Simon is a world public speaking champion, communication strategist, and author of The Art (and Science) of Public Speaking.",
      "For over 20 years, he has helped his clients to find the words, presence, and confidence to express their ideas with impact.",
    ],
    src: Card1,
    color: "#e63946",
  },
  {
    id: 2,
    title: "An Unexpected Beginning",
    description: [
      "Andrew’s journey into public speaking began with an emergency heart valve replacement at 12 years old.",
      "After the surgery, sports competitions were replaced with public speaking contests, as Andrew traded the courts for the stage.",
      "At 14, Andrew won his first international competition. He went on to give over 200 presentations by age 16.",
      "By 18, Andrew won a world championship for Impromptu Public Speaking.",
    ],
    src: Card2,
    color: "#457b9d",
  },
  {
    id: 3,
    title: "A Fulfilling Mission",
    description: [
      "Since then, he has worked with executives, founders, educators, and rising professionals.",
      "Over two decades, he has helped prepare speakers for investor pitches, global stages, media interviews, and elite academic admissions.",
      "His clients trust him when clarity, strategy, and presence matter most.",
    ],
    src: Card4,
    color: "#00b6bd",
  },
];

export default function CardScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#0d0d1a", "#1f3a6c"]);
  const color = useTransform(scrollYProgress, [0, 1], ["#fff", "#fff"]);

  return (
    <motion.section
      className="relative"
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
    >
      {/* Extra top space above heading, before sticky */}
      <div className="pt-16 md:pt-24"></div>

      {/* Sticky heading */}
      <motion.h1
        className="cards-wrapper-title sticky top-0 px-8 py-6 w-full text-4xl md:text-6xl 
                   flex flex-col items-center font-extrabold text-black text-center z-[1000]"
        style={{ backgroundColor: bgColor, color: color }}
      >
        <p>Meet Andrew Simon</p>
        <p className="text-[1rem] leading-normal mt-2 italic max-w-[30rem] md:text-xl md:mt-4 md:max-w-[1200px]">
          Public Speaking Coach - Author - Speechwriter - Communication Strategist
        </p>
      </motion.h1>

      {/* Cards */}
      <div
        id="cards-wrapper"
        className="relative flex flex-col gap-12 items-center py-8 pb-4 md:pb-8"
      >
        {projects.map((project, index) => {
          const targetRange = 1 - (projects.length - index) * 0.05;
          return (
            <CardScrollItem
              project={project}
              key={project.id}
              idx={index}
              progress={scrollYProgress}
              range={[index * 0.06, 1]}
              targetScale={targetRange}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
