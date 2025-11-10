import React from 'react';
// --- CHANGED: Added useState, useRef, useEffect ---
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    //   "Let us know what you’re looking for—we’ll let you know if we can help you."
    ],
    hoverVideo: video4
  }
];

// --- Main App Component ---
export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  // This height defines the visible area of the *inactive* card.
  // It MUST match the height given to the <h3> element below.
  const titleHeight = "120px";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0d0d19] p-4 sm:p-10">
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Services</h2>
      
      <div
        className="flex h-[800px] sm:h-[700px] w-full rounded-xl overflow-hidden"
        onMouseLeave={() => setActiveIndex(null)}
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
    </div>
  );
}

// --- ServicePanel Component ---
function ServicePanel({ service, isActive, onHover, titleHeight }) {
  
  // --- ADDED: State for pause and ref for video ---
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  
  const panelVariants = {
    inactive: { flex: 1 },
    active: { flex: 2.5 }
  };

  // This variant slides the whole content block up
  const contentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 }
  };

  // This variant fades the description/bullets
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // --- ADDED: Handle click for play/pause ---
  const handleClick = () => {
    if (isActive) {
      // If panel is already active, toggle play/pause
      setIsPaused(!isPaused);
    } else {
      // If panel is inactive, activate it
      onHover();
    }
  };

  // --- ADDED: useEffect to control video playback ---
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused]); // Re-run when isPaused changes

  // --- ADDED: useEffect to reset video to "play" when panel becomes active ---
  useEffect(() => {
    if (isActive) {
      // When panel becomes active, always reset to playing
      setIsPaused(false);
    }
  }, [isActive]); // Re-run when isActive changes


  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? 'active' : 'inactive'}
      variants={panelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      // --- CHANGED: Use the new handleClick function ---
      onClick={handleClick}
    >
      {/* Video Background */}
      <div
        className="absolute inset-0 z-0"
      >
        <video
          // --- ADDED: Attach the ref ---
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
        variants={contentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Heading has fixed height and aligns left */}
        <h3 
          className="text-3xl sm:text-4xl font-bold w-full flex items-center shrink-0 px-4 sm:px-6" 
          style={{ height: titleHeight }}
        >
          {service.title}
        </h3>
        
        {/* Fading content section */}
        <motion.div
          className="space-y-8 pt-2 px-4 pb-4 sm:pt-4 sm:px-6 sm:pb-6" 
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={textVariants}
          transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
        >
          {/* Matched font size/weight to bullet points */}
          <p className="text-xl sm:text-2xl font-semibold">{service.description}</p>
          
          {/* List has increased font size, weight, and spacing */}
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