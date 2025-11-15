import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// --- Vimeo Video URLs ---
const videos = [
  "https://player.vimeo.com/video/1136051482?h=9c2e70107d", // Coaching
  "https://player.vimeo.com/video/1136051434?h=756e01bca2", // Feedback
  "https://player.vimeo.com/video/1136051387?h=adb2fa98d0", // Presentations
  "https://player.vimeo.com/video/1136377910?h=0de8208ea0", // Other Services
];

// --- Service Data ---
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
    hoverVideo: videos[0],
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
    hoverVideo: videos[1],
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
    hoverVideo: videos[2],
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
    hoverVideo: videos[3],
  },
];

// --- Hook to detect mobile ---
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

// --- Main Component ---
export default function Index() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useIsMobile();
  const titleHeight = "120px";
  const colors = {
    lightText: "#F9FAFB",
  };

  return (
    <div className="flex flex-col items-center w-full bg-[#0d0d19]">
      {isMobile ? (
        <>
          <div className="sticky top-0 z-20 w-full bg-[#0d0d19] p-4 flex justify-center shadow-lg">
            <h2 className="text-4xl font-bold text-white">Our Services</h2>
          </div>
          <MobileStickyScroll services={servicesData} colors={colors} />
        </>
      ) : (
        <>
          <div className="p-4 sm:p-10 w-full flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
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
                colors={colors}
              />
            ))}
          </div>
        </>
      )}
      <div className="h-20 md:h-0"></div>
    </div>
  );
}

// --- MOBILE SCROLL COMPONENT ---
function MobileStickyScroll({ services, colors }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const numSections = services.length;
      const newSection = Math.min(
        numSections - 1,
        Math.floor(latest * numSections)
      );
      setActiveSection(newSection);
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${services.length * 100}vh` }}
    >
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <MobileCard service={services[activeSection]} colors={colors} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- MOBILE CARD COMPONENT ---
function MobileCard({ service, colors }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.25 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const iframeRef = useRef(null);

  const toggleVideoPlayback = () => {
    const newPlayState = !isVideoPlaying;
    setIsVideoPlaying(newPlayState);

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const player = new window.Vimeo.Player(iframe);

      if (newPlayState) {
        player.play().catch((error) => {
          console.log("Play failed:", error);
        });
      } else {
        player.pause().catch((error) => {
          console.log("Pause failed:", error);
        });
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black" onClick={toggleVideoPlayback}>
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          src={`${service.hoverVideo}&autoplay=1&loop=1&muted=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "177.77vh",
            height: "100vh",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <motion.div
        className="relative z-10 h-full w-full flex flex-col justify-end text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="h-full overflow-y-auto px-6 py-10">
          <motion.h3 variants={itemVariants} className="text-4xl font-bold mb-2">
            {service.title}
          </motion.h3>

          {/* New line below heading for mobile - NO SCALE */}
          <motion.div
            variants={itemVariants}
            className="w-28 h-1 rounded-full mb-4" // Increased from w-24
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />

          <motion.p
            variants={itemVariants}
            className="text-xl font-semibold italic mb-4"
          >
            {service.description}
          </motion.p>

          {/* Divider line - MOVED & CENTERED */}
          <motion.div
            variants={itemVariants}
            className="w-28 h-1 rounded-full mb-6 mx-auto" // Increased from w-24
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />

          <ul className="list-disc list-outside space-y-5 text-lg font-medium ml-5 pb-6 marker:text-[#764ba2]">
            {service.points.map((point, i) => (
              <motion.li key={i} variants={itemVariants}>
                {point}
              </motion.li>
            ))}
          </ul>
          {/* Button */}
          <motion.a
            className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg inline-block"
            style={{
              backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: colors.lightText,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Free Session
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

// --- DESKTOP PANEL ---
function ServicePanel({ service, isActive, onHover, titleHeight, colors }) {
  const desktopPanelVariants = { inactive: { flex: 1 }, active: { flex: 2.5 } };
  const desktopContentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 },
  };
  const desktopTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const iframeRef = useRef(null);

  const toggleVideoPlayback = () => {
    const newPlayState = !isVideoPlaying;
    setIsVideoPlaying(newPlayState);

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const player = new window.Vimeo.Player(iframe);

      if (newPlayState) {
        player.play().catch((error) => {
          console.log("Play failed:", error);
        });
      } else {
        player.pause().catch((error) => {
          console.log("Pause failed:", error);
        });
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? "active" : "inactive"}
      variants={desktopPanelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      onClick={toggleVideoPlayback}
    >
      <div className="absolute inset-0 z-0">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          src={`${service.hoverVideo}&autoplay=1&loop=1&muted=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "177.77vh",
            height: "100vh",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
          }}
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

        {/* New line below heading for desktop - with scale animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            transformOrigin: "left",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
          className="w-32 h-1 rounded-full mb-4 px-4 sm:px-6 ml-6" // Kept at w-32
        />

        <motion.div
          className="space-y-6 pt-2 px-4 pb-4 sm:pt-4 sm:px-6 sm:pb-6"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={desktopTextVariants}
        >
          <p className="text-xl sm:text-2xl font-semibold italic">{service.description}</p>
          
          {/* Divider line - MOVED & CENTERED */}
          <div
            className="w-32 h-1 rounded-full mx-auto" // Increased from w-24 to w-32
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />

          <ul className="list-disc list-outside space-y-4 text-xl sm:text-2xl font-semibold ml-5 marker:text-[#764ba2]">
            {service.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Button */}
          <motion.a
            className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg inline-block"
            style={{
              backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: colors.lightText,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Free Session
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}