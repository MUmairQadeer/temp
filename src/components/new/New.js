import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Player from '@vimeo/player';

// --- COLOR PALETTE ---
const colors = {
  primaryBlue: '#0d0d1a',
  accentGold: '#D4AF37',
  lightText: '#F9FAFB',
  darkText: '#1F2937',
  headText: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

// --- FEATURE DATA ---
const vimeoBaseParams =
  '&autoplay=1&muted=1&loop=1&playsinline=1&controls=0&title=0&byline=0&portrait=0';

const featureData = [
  {
    title: 'Faster',
    bullets: [
      'Our VIP service means your needs and deadlines receive our undivided attention.',
      'No wasted time. Every minute is focused entirely on you—your challenges, your goals, and your dream outcome.',
      'Speeches ready in days, not weeks.',
    ],
    videoSrc: `https://player.vimeo.com/video/1136412073?h=e3fff402ff${vimeoBaseParams}`,
  },
  {
    title: 'Simpler',
    bullets: [
      'Every step of the process is designed to eliminate stress, anxiety, and wasted time.',
      'Friendly, personal VIP care that supports you every step of the way.',
      'Nothing left to chance—clear, actionable advice on your content, clarity, deliverable, and more.',
    ],
    videoSrc: `https://player.vimeo.com/video/1136403548?h=dee998938d${vimeoBaseParams}`,
  },
  {
    title: 'Better',
    bullets: [
      'Take advantage of 20+ years of public speaking and speech writing experience.',
      '1-on-1 VIP service means speeches and solutions specifically tailored to your style, personality, audience, and goals.',
      'Combining real-time expert feedback with extensive tools and resources for truly transformative results.',
    ],
    videoSrc: `https://player.vimeo.com/video/1136403150?h=9a15a820f6${vimeoBaseParams}`,
  },
];

// --- ANIMATION VARIANTS ---
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- HERO SECTION ---
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
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
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

// --- STICKY SCROLL FEATURE ---
function StickyScrollFeature() {
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const scrollRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start 0.1', 'end 1'] });

  // --- Section Scroll Tracking ---
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (isClickScrolling) return;
      const numSections = featureData.length;
      const newSection = Math.min(numSections - 1, Math.floor(latest * numSections));
      setActiveSection(newSection);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isClickScrolling]);

  // --- Vimeo Player Initialization ---
  useEffect(() => {
    if (iframeRef.current) {
      if (playerRef.current) playerRef.current.destroy();
      const newPlayer = new Player(iframeRef.current);
      newPlayer.setVolume(0);
      newPlayer.play();
      playerRef.current = newPlayer;
      setIsPlaying(true);
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [activeSection]);

  // --- Toggle Play ---
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.pause();
    else playerRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // --- Click Heading Scroll ---
  const handleHeadingClick = (index) => {
    setActiveSection(index);
    setIsClickScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    if (scrollRef.current) {
      const numSections = featureData.length;
      const containerScrollHeight = scrollRef.current.scrollHeight - window.innerHeight * 0.9;
      const sectionScrollTop = (containerScrollHeight / numSections) * index;
      const containerTop = scrollRef.current.offsetTop;
      const scrollPos = containerTop + sectionScrollTop;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      scrollTimeout.current = setTimeout(() => setIsClickScrolling(false), 1000);
    }
  };

  return (
    <div ref={scrollRef} className="relative" style={{ height: `${featureData.length * 100}vh` }}>
      <div
        className="sticky w-full overflow-hidden"
        style={{
          backgroundColor: colors.primaryBlue,
          color: colors.lightText,
          top: '10vh',
          height: '90vh',
        }}
      >
        <div className="max-w-7xl mx-auto h-full overflow-y-auto md:grid md:grid-cols-3 gap-6 md:gap-12 lg:gap-24 md:items-center px-6 md:px-8">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center py-8 md:h-[80vh] md:col-span-1">
            <div className="flex flex-col h-full justify-between md:pl-24">
              <div className="space-y-10 w-fit">
                {featureData.map((item, index) => (
                  <h2
                    key={index}
                    className="text-4xl xl:text-5xl font-extrabold cursor-pointer transition-all duration-300"
                    style={{
                      color: activeSection === index ? colors.lightText : 'rgba(249, 250, 251, 0.5)',
                      opacity: activeSection === index ? 1 : 0.7,
                    }}
                    onClick={() => handleHeadingClick(index)}
                  >
                    {item.title}
                  </h2>
                ))}
              </div>

              <div className="hidden md:block w-fit">
                <p className="text-xs text-gray-300">
                  All services supported by our money-back 100% satisfaction guarantee.
                </p>
                <motion.button
                  className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: colors.lightText,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Your Free Session
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 w-full flex md:h-[80vh] items-center md:justify-center">
            <div className="w-full md:w-[80%] h-[45vh] md:h-full rounded-2xl overflow-hidden shadow-2xl mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  className="relative w-full h-full flex flex-col justify-start md:justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* --- VIDEO DISPLAY: AGGRESSIVE COVER --- */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    aria-hidden="true"
                    style={{ zIndex: 0 }}
                  >
                    {/*
                      Strategy:
                      - Place iframe absolutely centered (top:50% left:50%), translate(-50%,-50%)
                      - Force rendered iframe dimensions to be larger than the container (150%),
                        ensuring it always overflows and covers the card regardless of aspect ratio.
                      - Use minWidth/minHeight to handle extremes.
                    */}
                    <iframe
                      ref={iframeRef}
                      key={featureData[activeSection].videoSrc}
                      src={featureData[activeSection].videoSrc}
                      title="vimeo-player"
                      allow="autoplay; fullscreen; muted"
                      frameBorder="0"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '150%',        // aggressively larger than container
                        height: '150%',       // aggressively larger than container
                        minWidth: '150%',
                        minHeight: '150%',
                        maxWidth: '300%',
                        maxHeight: '300%',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* overlay / click-to-toggle */}
                  <div
                    className="absolute inset-0 bg-black/80 cursor-pointer"
                    onClick={togglePlay}
                    role="button"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    style={{ zIndex: 10 }}
                  >
                    <AnimatePresence>
                      {!isPlaying && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <svg
                            className="w-16 h-16 text-white opacity-75"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4.018 15.59a.75.75 0 001.127.643l10.455-6.036a.75.75 0 000-1.286L5.145 2.767a.75.75 0 00-1.127.643v12.18z" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.ul
                    className="relative z-20 flex flex-col px-6 pt-12 sm:p-8 md:p-12 text-white"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    key={`list-${activeSection}`}
                  >
                    {featureData[activeSection].bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl font-extrabold mb-6 md:mb-20 last:mb-0 flex items-start"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                      >
                        <div className="w-7 h-7 md:w-8 md:h-8 mr-3 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="w-full h-full"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                              fill="#764ba2"
                            ></path>
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
          <div className="block md:hidden pt-10 pb-16">
            <p className="text-xs text-gray-300">
              All services supported by our money-back 100% satisfaction guarantee.
            </p>
            <motion.button
              className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 shadow-lg w-full"
              style={{
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: colors.lightText,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Free Session
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function New() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primaryBlue }}>
      <HeroSection />
      <StickyScrollFeature />
    </div>
  );
}
