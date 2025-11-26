import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Player from "@vimeo/player";

/* -------------------------    Colors & Data    ------------------------- */
const colors = {
  primaryBlue: "#0d0d1a",
  lightText: "#F9FAFB",
  headText: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const vimeoParams =
  "&autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&quality=540p";

const featureData = [
  {
    title: "Faster",
    bullets: [
      "Our VIP service means your needs and deadlines receive our undivided attention.",
      "No wasted time. Every minute is focused entirely on you—your challenges, your goals, and your dream outcome.",
      "Speeches ready in days, not weeks.",
    ],
    videoSrc: `https://player.vimeo.com/video/1136412073?h=e3fff402ff${vimeoParams}`,
  },
  {
    title: "Simpler",
    bullets: [
      "Every step of the process is designed to eliminate stress, anxiety, and wasted time.",
      "Friendly, personal VIP care that supports you every step of the way.",
      "Nothing left to chance—clear, actionable advice on your content, clarity, deliverable, and more.",
    ],
    videoSrc: `https://player.vimeo.com/video/1136412134?h=dee998938d${vimeoParams}`,
  },
  {
    title: "Better",
    bullets: [
      "Take advantage of 20+ years of public speaking and speech writing experience.",
      "1-on-1 VIP service means speeches and solutions specifically tailored to your style, personality, audience, and goals.",
      "Combining real-time expert feedback with extensive tools and resources for truly transformative results.",
    ],
    videoSrc: `https://player.vimeo.com/video/1136403150?h=9a15a820f6${vimeoParams}`,
  },
];

/* -------------------------    Animation Variants    ------------------------- */
const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* -------------------------    Hero Section    ------------------------- */
function HeroSection() {
  return (
    <div
      className="w-full text-center"
      style={{ backgroundColor: colors.primaryBlue, color: colors.lightText }}
    >
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold"
          style={{
            backgroundImage: colors.headText,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Better Results.
          <br />
          <span className="inline-block mt-3 sm:mt-4 md:mt-5">Less Time.</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl mt-6 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Public speaking coaching, speech writing services, and last-minute tune-ups. Providing you
          the fully personalized, 1-on-1 concierge service you deserve.
        </motion.p>
      </div>
    </div>
  );
}

/* -------------------------    Sticky Scroll Feature    ------------------------- */
function StickyScrollFeature() {
  const [activeSection, setActiveSection] = useState(0);
  const [isClickScrolling, setIsClickScrolling] = useState(false);
  const scrollRef = useRef(null);
  const iframeRefs = useRef([]);
  const players = useRef([]);
  const scrollTimeout = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start 0.1", "end 1"] });

  // map scroll to section
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (isClickScrolling) return;
      const numSections = featureData.length;
      const newSection = Math.min(numSections - 1, Math.floor(latest * numSections));
      setActiveSection(newSection);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isClickScrolling]);

  // initialize player
  const initPlayer = (index) => {
    const iframe = iframeRefs.current[index];
    if (!iframe) return;
    if (players.current[index]) return;

    try {
      const p = new Player(iframe, { autopause: false });
      p.setVolume(0).catch(() => { });
      players.current[index] = p;

      if (index === activeSection) {
        p.play().catch(() => { });
      }
    } catch (err) {
      console.warn("Vimeo Player init error:", err);
    }
  };

  // play/pause logic
  useEffect(() => {
    players.current.forEach((p, i) => {
      if (!p) return;
      if (i === activeSection) {
        p.play().catch(() => { });
      } else {
        p.pause().catch(() => { });
      }
    });
  }, [activeSection]);

  // click heading to scroll
  const handleHeadingClick = (index) => {
    setActiveSection(index);
    setIsClickScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    if (scrollRef.current) {
      const numSections = featureData.length;
      const fraction = numSections > 1 ? index / (numSections - 1) : 0;
      const containerScrollHeight = scrollRef.current.scrollHeight - window.innerHeight;
      const scrollPos = scrollRef.current.offsetTop + containerScrollHeight * fraction;

      window.scrollTo({ top: scrollPos, behavior: "smooth" });

      scrollTimeout.current = setTimeout(() => setIsClickScrolling(false), 900);
    }
  };

  const togglePlayPauseActive = async () => {
    const p = players.current[activeSection];
    if (!p) return;
    try {
      const isPaused = await p.getPaused();
      if (isPaused) await p.play();
      else await p.pause();
    } catch (e) {
      try { await p.play(); } catch { }
    }
  };

  const setIframeRef = (el, i) => {
    iframeRefs.current[i] = el;
  };

  return (
    <div ref={scrollRef} className="relative" style={{ height: `${featureData.length * 100}vh` }}>
      <div
        className="sticky w-full min-h-screen h-auto md:h-[90vh] md:overflow-hidden overflow-visible"
        style={{
          backgroundColor: colors.primaryBlue, color: colors.lightText, top: "10vh",
        }}
      >
        <div className="max-w-7xl mx-auto h-full md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-24 md:items-center px-4 md:px-6 lg:px-8">
          
          {/* LEFT COLUMN (Headings) */}
          <div className="flex flex-col justify-center py-8 md:h-[80vh] md:col-span-1">
            {/* Added left padding alignment */}
            <div className="flex flex-col h-full justify-between pl-4 sm:pl-8 md:pl-0 lg:pl-12">
              <div className="space-y-6 sm:space-y-10 w-fit">
                {featureData.map((item, index) => (
                  <h2
                    key={index}
                    className="text-3xl sm:text-4xl xl:text-5xl font-extrabold cursor-pointer transition-all duration-300"
                    style={{
                      color: activeSection === index ? colors.lightText : "rgba(249, 250, 251, 0.5)",
                      opacity: activeSection === index ? 1 : 0.7,
                    }}
                    onClick={() => handleHeadingClick(index)}
                  >
                    {item.title}
                  </h2>
                ))}
              </div>

              {/* Desktop Button */}
              <div className="hidden md:block w-fit">
                <p className="text-xs text-gray-300">All services supported by our money-back 100% satisfaction guarantee.</p>
                <motion.a
                  className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg inline-block whitespace-nowrap"
                  style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: colors.lightText }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://calendly.com/speak-with-simon/discovery-session"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Free Session
                </motion.a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Video Card) */}
          <div className="md:col-span-2 w-full flex md:h-[80vh] items-center md:justify-center">
            {/* Height set to 60vh on mobile to ensure room for text */}
            <div className="w-full sm:w-[90%] md:w-full lg:w-[90%] min-h-[500px] h-[60vh] sm:h-[65vh] md:h-full rounded-2xl overflow-hidden shadow-2xl mx-auto relative">
              
              {/* VIDEO LAYER */}
              <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
                {featureData.map((item, index) => (
                  <iframe
                    key={index}
                    ref={(el) => setIframeRef(el, index)}
                    src={item.videoSrc}
                    title={`vimeo-${index}`}
                    allow="autoplay; fullscreen; muted; loop; playsinline"
                    frameBorder="0"
                    loading="eager"
                    onLoad={() => initPlayer(index)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      // AGGRESSIVE SCALING FIX:
                      // 400% width and height forces the iframe to cover the container
                      // regardless of aspect ratio (tall/wide), effectively behaving like object-fit: cover
                      width: "400%", 
                      height: "400%",
                      pointerEvents: "none",
                      opacity: activeSection === index ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                ))}
              </div>

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-black opacity-50 z-10" aria-hidden="true"></div>
              <div
                className="absolute inset-0 z-30"
                style={{ cursor: "pointer" }}
                onClick={() => togglePlayPauseActive()}
                aria-hidden={false}
              />

              {/* BULLET TEXT LAYER */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  className="relative w-full h-full z-20 pointer-events-none" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* PADDING FIX: px-8 on mobile, px-12 on tablet to squeeze text in */}
                  <motion.ul
                    className="flex flex-col h-full justify-evenly px-8 sm:px-12 md:p-8 lg:p-12 text-white"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {featureData[activeSection].bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        variants={itemVariants}
                        className="text-sm md:text-base lg:text-xl font-extrabold flex items-start leading-relaxed break-words"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-full h-full">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                              fill="#764ba2"
                            />
                          </svg>
                        </div>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="inline-block md:hidden pt-6 pb-20 flex flex-col items-center w-full">
            <p className="text-xs text-gray-300 px-4 text-center">All services supported by our money-back 100% satisfaction guarantee.</p>
            <motion.a
              className="font-semibold text-sm sm:text-base py-3 px-8 rounded-full mt-4 shadow-lg w-auto min-w-[200px] text-center whitespace-nowrap"
              style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: colors.lightText }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://calendly.com/speak-with-simon/discovery-session"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Free Session
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Better() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primaryBlue }}>
      <HeroSection />
      <StickyScrollFeature />
    </div>
  );
}
