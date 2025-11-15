import React from "react";
import "./CardScroll.css";
import { motion, useTransform } from "framer-motion";

export default function CardScrollItem({
  project,
  idx,
  progress,
  range,
  targetScale,
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="card-container w-full flex justify-center">
      <motion.div
        style={{ top: `calc(-4% + ${idx * 25}px)`, scale: scale }}
        className="card-content relative w-full max-w-4xl h-[350px] md:h-[500px] 
                   rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row 
                   items-center text-white border border-white/10"
      >
        {/* --- Improved text readability overlay --- */}
        <div
          className="absolute inset-0 bg-gradient-to-r 
                     from-black/70 via-black/55 to-black/25 
                     backdrop-blur-sm"
          style={{ zIndex: 0 }}
        ></div>

        {/* --- CARD TEXT --- */}
        <div className="relative w-full md:w-3/5 p-4 md:p-8 flex flex-col justify-center h-full 
                        text-center md:text-left z-10">

          {project.description.map((line, index) => (
            <p
              key={index}
              className="text-sm md:text-lg !leading-normal mb-2 xl:mb-4 
                         xl:text-[1.3rem] xl:!leading-tight drop-shadow-md"
            >
              {line}
            </p>
          ))}

          {/* DEFAULT BUTTON FROM PROJECT DATA */}
          {project.linkText && (
            <motion.a
              className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 
                         shadow-lg inline-block self-center md:self-start"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#F9FAFB",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkText}
            </motion.a>
          )}

          {/* ✅ EXTRA BUTTON ONLY ON 3RD CARD */}
          {idx === 2 && (
            <motion.a
              className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-4 
                         shadow-lg inline-block self-center md:self-start"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#F9FAFB",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://calendly.com/speak-with-simon/discovery-session"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Free Session
            </motion.a>
          )}
        </div>

        {/* --- IMAGE --- */}
        <div className="hidden md:block w-full md:w-2/5 relative h-full overflow-hidden rounded-r-3xl z-10">
          <img
            src={project.src}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1000x500/CCCCCC/000000?text=Image+Not+Found";
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
