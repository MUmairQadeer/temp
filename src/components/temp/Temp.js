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
    description: "One-on-One training, coaching and mentorship with a world champion.",
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
    description: "Page-to-stage support, taking you from rough notes to standing ovation",
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

// --- REUSABLE ROBUST VIDEO COMPONENT ---
const VimeoBackground = ({ videoUrl, title, isActive = true }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // 1. Load Vimeo Script Globally Once
  useEffect(() => {
    if (!window.Vimeo) {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.id = "vimeo-script";
      document.body.appendChild(script);
      script.onload = () => setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, []);

  // 2. Initialize Player ONLY when script is ready AND iframe is loaded
  const handleIframeLoad = () => {
    if (!isReady || !iframeRef.current || !window.Vimeo) return;

    // Prevent double init
    if (playerRef.current) return;

    try {
      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player.ready().then(() => {
        player.setVolume(0);
        player.setLoop(true);
        // Force play immediately on ready
        player.play().catch((e) => console.log("Autoplay blocked:", e));
        
        // SAFETY KICK: Check 1 second later if it actually started. 
        // If the browser was slow, this forces it to start.
        setTimeout(() => {
           player.getPaused().then((paused) => {
             if (paused) player.play().catch(() => {});
           });
        }, 1000);
      });
    } catch (err) {
      console.error("Vimeo init failed", err);
    }
  };

  // Watch for script ready state to trigger load if iframe loaded first
  useEffect(() => {
    if (isReady && iframeRef.current) {
        handleIframeLoad();
    }
  }, [isReady]);

  // Handle Active State Pausing (Performance)
  useEffect(() => {
    if (playerRef.current) {
        if(isActive) {
            playerRef.current.play().catch(()=>{});
        }
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
        <iframe
            ref={iframeRef}
            onLoad={handleIframeLoad} // Trigger init when iframe is done loading
            // Added playsinline=1 for iOS cold-load fix
            src={`${videoUrl}&background=1&autoplay=1&loop=1&muted=1&playsinline=1`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title={title}
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
        <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
    </div>
  );
};


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
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useIsMobile();
  const titleHeight = "50px";
  const colors = { lightText: "#F9FAFB" };

  return (
    <div className="flex flex-col items-center w-full bg-[#0d0d19]">
      {isMobile ? (
        <>
          <div className="sticky top-0 z-20 w-full bg-[#0d0d19] py-8 flex justify-center shadow-lg">
            <h2 className="text-4xl font-bold text-white">Our Services</h2>
          </div>
          <MobileStickyScroll services={servicesData} colors={colors} />
        </>
      ) : (
        <>
          <div className="p-4 sm:p-10 w-full flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">Our Services</h2>
          </div>

          <div
            onMouseLeave={() => setActiveIndex(null)}
            className="flex md:flex-row h-auto h-[100vh] md:h-[700px] xl:h-[800px] w-full max-w-7xl md:rounded-2xl md:overflow-hidden md:shadow-2xl"
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
      if (newSection !== activeSection) {
        setActiveSection(newSection);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length, activeSection]);

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

  return (
    <div className="relative w-full h-full bg-black flex flex-col p-4">
      {/* Replaced raw iframe with Robust Component */}
      <VimeoBackground videoUrl={service.hoverVideo} title={service.title} />

      <motion.div
        className="relative z-10 h-full w-full flex flex-col justify-between text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col space-y-4 px-2 pt-10">
          <motion.h3 variants={itemVariants} className="text-2xl font-bold">
            {service.title}
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="w-20 h-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />

          <motion.p variants={itemVariants} className="text-lg font-semibold italic">
            {service.description}
          </motion.p>

          <ul className="list-disc list-outside space-y-8 text-base font-medium ml-4 marker:text-[#764ba2]">
            {service.points.map((point, i) => (
              <motion.li key={i} variants={itemVariants}>
                {point}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.a
          className="font-semibold text-[0.9rem] py-2 px-5 rounded-full shadow-lg self-center mb-10"
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

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? "active" : "inactive"}
      variants={desktopPanelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
    >
      <div className="absolute inset-0 z-0">
         {/* Replaced raw iframe with Robust Component */}
         <VimeoBackground videoUrl={service.hoverVideo} title={service.title} isActive={isActive} />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 text-white h-full flex flex-col py-20"
        style={{ overflowY: "hidden" }}
        variants={desktopContentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h3
          className="text-3xl sm:text-4xl font-bold w-full flex items-center shrink-0 px-6"
          style={{ height: titleHeight }}
        >
          {service.title}
        </h3>

        <motion.div
          className="flex flex-col flex-grow pt-4 px-6 pb-6"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={desktopTextVariants}
        >
          <div className="space-y-6 flex-grow">
            <div
              className="w-32 h-1 rounded-full"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            />

            <p className="text-lg xl:text-xl font-semibold italic">
              {service.description}
            </p>

            <ul className="list-disc list-outside space-y-3 text-lg xl:text-xl font-semibold ml-5 marker:text-[#764ba2]">
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 ">
            <motion.a
              className="font-semibold text-[0.9rem] py-2 px-5 rounded-full shadow-lg inline-block w-fit"
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
      </motion.div>
    </motion.div>
  );
}
