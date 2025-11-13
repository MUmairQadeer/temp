import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
} from "framer-motion";

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

  return (
    <div className="flex flex-col items-center w-full bg-[#0d0d19]">
      {isMobile ? (
        <>
          <div className="sticky top-0 z-20 w-full bg-[#0d0d19] p-4 flex justify-center shadow-lg">
            <h2 className="text-4xl font-bold text-white">Our Services</h2>
          </div>
          <MobileStickyScroll services={servicesData} />
        </>
      ) : (
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

// --- MOBILE SCROLL COMPONENT ---
function MobileStickyScroll({ services }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const numSections = services.length;
      const newSection = Math.min(numSections - 1, Math.floor(latest * numSections));
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
            <MobileCard service={services[activeSection]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- MOBILE CARD COMPONENT ---
function MobileCard({ service }) {
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
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          src={`${service.hoverVideo}&autoplay=1&loop=1&muted=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.77vh',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%'
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
          <motion.h3 variants={itemVariants} className="text-4xl font-bold mb-6">
            {service.title}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-xl font-semibold mb-8">
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

// --- DESKTOP PANEL ---
function ServicePanel({ service, isActive, onHover, titleHeight }) {
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
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          src={`${service.hoverVideo}&autoplay=1&loop=1&muted=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.77vh',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%'
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

        <motion.div
          className="space-y-8 pt-2 px-4 pb-4 sm:pt-4 sm:px-6 sm:pb-6"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={desktopTextVariants}
        >
          <p className="text-xl sm:text-2xl font-semibold">{service.description}</p>
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
