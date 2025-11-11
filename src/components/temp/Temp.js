import React from 'react';
// --- All necessary hooks are imported ---
import { useState, useRef, useEffect } from 'react';
// --- ADDED useScroll and useTransform ---
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- IMPORT YOUR LOCAL VIDEOS ---
import video1 from './1.mp4';
import video2 from './2.mp4';
import video3 from './3.mp4';
import video4 from './4.mp4';

// --- Data for the service panels ---
const servicesData = [
  {
    id: 1,
    title: "Coaching",
    description: "One-on-One training, coaching and mentorship with a world champion.",
    points: [
      "Fully customized for your goals, challenges, and opportunities",
      "Each session provides actionable tools and techniques you can apply immediately.",
      "Focus on storytelling, clarity, emotional engagement, persuasion, delivery, and more."
    ],
    hoverVideo: video1
  },
  {
    id: 2,
    title: "Feedback",
    description: "Get expert feedback before your next big presentation",
    points: [
      "Book as much or as little time as you need",
      "Totally custom - focus on your top priorities",
      "Perfect for improving delivery, refining your message, and sharpening stories"
    ],
    hoverVideo: video2
  },
  {
    id: 3,
    title: "Presentations",
    description: "Page-to-stage support, taking you from rough notes to standing ovation",
    points: [
      "”All-in” VIP service that combines refining your message, writing/rewriting your speech, and perfecting your delivery.",
      "Proven systems and processes = rapid turnaround times",
      "Perfect for TEDx talks, keynotes, award speeches, pitches, and other high-stakes presentations."
    ],
    hoverVideo: video3
  },
  {
    id: 4,
    title: "Other Services",
    description: "Looking to improve your communication in other areas?",
    points: [
      "1-on-1 support with Interpersonal communication, presenting yourself with clarity and confidence and more.",
      "Enhancing critical skills: mastering high-stakes interviews, enhancing your persuasion and influence",
      "Communicating your unique value proposition—from investment pitches to online dating profiles.",
    ],
    hoverVideo: video4
  }
];

// --- A simple hook to detect mobile screen size ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false); // Default to false for SSR
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}


// --- Main App Component ---
export default function App() {
  // State for desktop expanding panels
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useIsMobile();

  // --- Desktop: Hover handler to open/close panels ---
  const handleDesktopHover = (index) => {
    setActiveIndex(index);
  };

  const titleHeight = "120px"; // Desktop panel still needs this

  return (
    <div className="flex flex-col items-center w-full bg-[#0d0d19]">
      <div className="p-4 sm:p-10 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 sm:mb-10">Our Services</h2>
      </div>
      
      <div
        // --- CHANGE: Added onMouseLeave handler for desktop hover ---
        onMouseLeave={() => handleDesktopHover(null)}
        className="flex flex-col md:flex-row h-auto md:h-[700px] w-full max-w-7xl md:rounded-2xl md:overflow-hidden md:shadow-2xl"
      >
        {isMobile ? (
            // --- MOBILE RENDER (Vertical Scroll Sticky Carousel) ---
            <MobileStickyCarousel services={servicesData} />
          ) : (
            // --- DESKTOP RENDER (Original Panels) ---
            servicesData.map((service, index) => (
              <ServicePanel
                key={service.id}
                service={service}
                isActive={activeIndex === index}
                // --- CHANGE: Pass onHover prop ---
                onHover={() => handleDesktopHover(index)}
                titleHeight={titleHeight}
              />
            ))
          )}
      </div>
      <div className="h-20 md:h-0"></div> 
    </div>
  );
}

// --- NEW Component: MobileStickyCarousel ---
function MobileStickyCarousel({ services }) {
  const targetRef = useRef(null);
  const numCards = services.length;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const stickTime = 1 / numCards;
  const animationRange = 1 - stickTime;

  const x = useTransform(
    scrollYProgress,
    [0, animationRange], 
    ["0%", `-${100 * (numCards - 1)}%`]
  );

  return (
    <div ref={targetRef} className={`relative h-[${numCards * 100}vh] w-full`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {services.map((service) => (
            <MobileServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}


// --- NEW Component: MobileServiceCard ---
function MobileServiceCard({ service }) {
  const videoRef = useRef(null);
  // --- CHANGE: Added isPaused state for mobile ---
  const [isPaused, setIsPaused] = useState(false);

  // Play the video when the component mounts
  useEffect(() => {
    videoRef.current?.play();
  }, []);

  // --- CHANGE: Added effect for play/pause on click ---
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused]);

  // --- CHANGE: Added click handler ---
  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div 
      className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black"
      // --- CHANGE: Added onClick handler ---
      onClick={handleClick}
    >
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

      {/* Content has internal padding and scrolling */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white overflow-y-auto">
        <h3 className="text-4xl font-bold">{service.title}</h3>
        
        {/* --- CHANGE: Increased spacing (my-8) --- */}
        <p className="text-xl font-semibold my-8">{service.description}</p>
        
        {/* --- CHANGE: Increased spacing (space-y-5, pb-20) --- */}
        <ul className="list-disc list-outside space-y-5 text-lg font-medium ml-5 pb-20">
          {service.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// --- ServicePanel Component (for Desktop) ---
// --- CHANGES: Added play/pause logic and restored hover ---
function ServicePanel({ service, isActive, onHover, titleHeight }) {
  
  const videoRef = useRef(null);
  // --- CHANGE: Added isPaused state for desktop ---
  const [isPaused, setIsPaused] = useState(false);
  
  // --- CHANGE: Updated video logic to handle isActive AND isPaused ---
  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPaused]); 

  // --- CHANGE: Added effect to reset pause state on mouse leave ---
  useEffect(() => {
    if (!isActive) {
      setIsPaused(false); // Reset pause state when panel is no longer active
      videoRef.current?.load(); // Optional: reset video to first frame
    }
  }, [isActive]);

  // --- CHANGE: Added click handler for play/pause ---
  const handleClick = () => {
    if (isActive) { // Only allow pause if panel is active
      setIsPaused(!isPaused);
    }
  };


  // --- DESKTOP Animation Variants ---
  const desktopPanelVariants = {
    inactive: { flex: 1 },
    active: { flex: 2.5 }
  };
  const desktopContentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 }
  };
  const desktopTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
  };
  
  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? 'active' : 'inactive'}
      variants={desktopPanelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      // --- CHANGE: Reverted to onHover and onClick ---
      onMouseEnter={onHover}
      onClick={handleClick}
    >
      {/* Video Background */}
      <div
        className="absolute inset-0 z-0"
      >
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

      {/* Text Content Container (Slides up) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 text-white h-full flex flex-col"
        style={{ overflowY: 'hidden' }}
        variants={desktopContentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Heading */}
        <h3 
          className="text-3xl sm:text-4xl font-bold w-full flex items-center shrink-0 px-4 sm:px-6" 
          style={{ height: titleHeight }}
        >
          {service.title}
  _     </h3>
        
        {/* Fading content section */}
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