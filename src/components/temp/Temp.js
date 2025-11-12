import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence, // <-- 1. IMPORT ADDED
} from "framer-motion";

// --- Remote Videos ---
import video1 from "./1.mp4";
import video2 from "./2.mp4";
import video3 from "./3.mp4";
import video4 from "./4.mp4";

// --- Service Data (Unchanged) ---
const servicesData = [
  {
    id: 1,
    title: "Coaching",
    description:
      "One-on-One training, coaching and mentorship with a world champion.",
    points: [
      "Fully customized for your goals, challenges, and opportunities",
      "Each session provides actionable tools and techniques you can apply immediately.",
      "Focus on storytelling, clarity, emotional engagement, persuasion, delivery, and more.",
    ],
    hoverVideo: video1,
  },
  {
    id: 2,
    title: "Feedback",
    description: "Get expert feedback before your next big presentation",
    points: [
      "Book as much or as little time as you need",
      "Totally custom - focus on your top priorities",
      "Perfect for improving delivery, refining your message, and sharpening stories",
    ],
    hoverVideo: video2,
  },
  {
    id: 3,
    title: "Presentations",
    description:
      "Page-to-stage support, taking you from rough notes to standing ovation",
    points: [
      "All-in VIP service combining refining your message, writing your speech, and perfecting your delivery.",
      "Proven systems = rapid turnaround times",
      "Perfect for TEDx talks, keynotes, award speeches, and other high-stakes presentations.",
    ],
    hoverVideo: video3,
  },
  {
    id: 4,
    title: "Other Services",
    description: "Looking to improve your communication in other areas?",
    points: [
      "1-on-1 support for interpersonal communication, clarity, and confidence.",
      "Master high-stakes interviews, persuasion, and influence.",
      "Communicate your unique value—from pitches to online profiles.",
    ],
    hoverVideo: video4,
  },
];

// --- Hook to detect mobile (Unchanged) ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

// --- Main Component (Modified) ---
export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useIsMobile();
  const titleHeight = "120px"; // Used for desktop panel

  return (
    <div className="flex flex-col items-center w-full bg-[#0d0d19]">
      {isMobile ? (
        // --- ✅ MOBILE RENDER (CHANGED) ---
        <>
          <div className="sticky top-0 z-20 w-full bg-[#0d0d19] p-4 flex justify-center shadow-lg">
            <h2 className="text-4xl font-bold text-white">Our Services</h2>
          </div>
          {/* This component handles the NEW mobile scroll effect */}
          {/* 2. REPLACED MobileScrollCards with MobileStickyScroll */}
          <MobileStickyScroll services={servicesData} />
        </>
      ) : (
        // --- 🖥️ DESKTOP RENDER (Unchanged) ---
        <>
          <div className="p-4 sm:p-10 w-full flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 sm:mb-10">
              Our Services
            </h2>
          </div>
          <div
            onMouseLeave={() => setActiveIndex(null)}
            className="flex md:flex-row h-auto md:h-[700px] xl:h-[850px] w-full max-w-7xl md:rounded-2xl md:overflow-hidden md:shadow-2xl"
          >
            {servicesData.map((service, index) => (
              <ServicePanel
                key={service.id}
                service={service}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                titleHeight={titleHeight}
              />
            ))}
          </div>
        </>
      )}
      <div className="h-20 md:h-0"></div>
    </div>
  );
}

// --- 3. NEW MOBILE SCROLL COMPONENT ---
// This component replaces the old `MobileScrollCards`
function MobileStickyScroll({ services }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Set up the scroll listener on the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Map scroll from container top to container bottom
  });

  // Update activeSection based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const numSections = services.length;
      // Calculate which section is active (0, 1, 2, or 3)
      const newSection = Math.min(
        numSections - 1,
        Math.floor(latest * numSections)
      );
      setActiveSection(newSection);
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length]);

  return (
    // Main scroll container (takes up height of 4 * 100vh)
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Sticky container (holds the single card that changes) */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden">
        {/* AnimatePresence handles the fade transition between cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection} // Use the index as a key to trigger AnimatePresence
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {/* Render only the *one* active card */}
            <MobileCard service={services[activeSection]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- MOBILE CARD COMPONENT (Slightly Modified) ---
function MobileCard({ service }) {
  const videoRef = useRef(null);
  useEffect(() => {
    // This effect runs when the card is mounted by AnimatePresence
    videoRef.current?.play();
  }, []); // Runs once when component mounts

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.25 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Video Background (Unchanged) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={service.hoverVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* 4. MODIFICATION: Changed 'whileInView' to 'animate' */}
      <motion.div
        className="relative z-10 h-full w-full flex flex-col justify-end text-white"
        initial="hidden"
        animate="visible" // <-- CHANGED (from whileInView)
        // viewport prop is no longer needed
        variants={containerVariants}
      >
        <div className="h-full overflow-y-auto px-6 py-10">
          <motion.h3
            variants={itemVariants}
            className="text-4xl font-bold mb-6"
          >
            {service.title}
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-xl font-semibold mb-8"
          >
            {service.description}
          </motion.p>
          <ul className="list-disc list-outside space-y-5 text-lg font-medium ml-5 pb-20">
            {service.points.map((point, i) => (
              <motion.li key={i} variants={itemVariants}>
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// --- DESKTOP PANEL (Unchanged) ---
function ServicePanel({ service, isActive, onHover, titleHeight }) {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPaused) videoRef.current.play();
      else videoRef.current.pause();
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    if (!isActive) {
      setIsPaused(false);
      videoRef.current?.load();
    }
  }, [isActive]);

  const desktopPanelVariants = { inactive: { flex: 1 }, active: { flex: 2.5 } };
  const desktopContentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 },
  };
  const desktopTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? "active" : "inactive"}
      variants={desktopPanelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      onClick={() => isActive && setIsPaused((p) => !p)}
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={service.hoverVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 text-white h-full flex flex-col"
        style={{ overflowY: "hidden" }}
        variants={desktopContentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h3
          className="text-3xl sm:text-4xl font-bold w-full flex items-center shrink-0 px-4 sm:px-6"
          style={{ height: titleHeight }}
        >
          {service.title}
        </h3>

        <motion.div
          className="space-y-8 pt-2 px-4 pb-4 sm:pt-4 sm:px-6 sm:pb-6"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={desktopTextVariants}
        >
          <p className="text-xl sm:text-2xl font-semibold">
            {service.description}
          </p>
          <ul className="list-disc list-outside space-y-12 text-xl sm:text-2xl font-semibold ml-5">
            {service.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}