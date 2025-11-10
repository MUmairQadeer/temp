import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion'; // No new imports needed

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
      "Let us know what you’re looking for—we’ll let you know if we can help you."
    ],
    hoverVideo: video4
  }
];

// --- Main App Component (Unchanged) ---
export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  const titleHeight = "80px";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0d0d19] p-4 sm:p-10">
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Our Services</h2>
      
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

// --- ServicePanel Component (CHANGED) ---
function ServicePanel({ service, isActive, onHover, titleHeight }) {
  
  const panelVariants = {
    inactive: { flex: 1 },
    active: { flex: 2.5 }
  };

  const contentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 }
  };

  // --- NEW VARIANTS ---
  // Define variants for the description and bullet points
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? 'active' : 'inactive'}
      variants={panelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      {/* Video Background (Unchanged) */}
      <div
        className="absolute inset-0 z-0"
      >
        <video
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
        className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 text-white h-full"
        style={{ overflowY: isActive ? 'auto' : 'hidden' }}
        variants={contentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
  s   >
      {/* Heading (Always visible at the top of the sliding container) */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ minHeight: '40px' }}>
          {service.title}
        </h3>
        
        {/* --- CHANGED: Wrapped "remaining text" in a motion.div --- */}
      {/* This content now fades in on hover and fades out on blur */}
        <motion.div
          className="space-y-4 pr-2"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={textVariants}
          transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }} // Add delay on fade-in
        >
          <p className="text-base sm:text-lg">{service.description}</p>
          <ul className="list-disc list-inside space-y-3 text-base sm:text-lg">
s           {service.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}