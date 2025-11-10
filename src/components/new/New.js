import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
} from 'framer-motion';

// Define color palette based on speakwithsimon.com inspiration
const colors = {
    primaryBlue: '#0d0d1a', // Deep Navy
    accentGold: '#D4AF37', // Gold
    lightText: '#F9FAFB', // gray-50
    darkText: '#1F2937', // gray-800
    headText: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

// --- Data for the sticky scroll section ---
// --- CHANGE: Added new random video URLs ---
const featureData = [
    {
        title: 'Faster',
        bullets: [
            'Our VIP service means your needs and deadlines receive our undivided attention.',
            'No wasted time. Every minute is focused entirely on you—your challenges, your goals, and your dream outcome.',
            'Speeches ready in days, not weeks.',
        ],
        videoSrc: 'https://videos.pexels.com/video-files/3846537/3846537-hd_1280_720_30fps.mp4',
    },
    {
        title: 'Simpler',
        bullets: [
            'Every step of the process is designed to eliminate stress, anxiety, and wasted time.',
            'Friendly, personal VIP care that supports you every step of the way.',
            'Nothing left to chance—clear, actionable advice on your content, clarity, deliverable, and more.',
        ],
        videoSrc: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4',
    },
    {
        title: 'Better',
        bullets: [
            'Take advantage of 20+ years of public speaking and speech writing experience',
            '1-on-1 VIP service means speeches and solutions specifically tailored to your style, personality, audience, and goals.',
            'Combining real-time expert feedback with extensive tools and resources for truly transformative results.',
        ],
        videoSrc: 'https://videos.pexels.com/video-files/2882230/2882230-hd_1280_720_24fps.mp4',
    },
];

// --- Animation Variants for Lists ---
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4, // Time between each bullet point
            delayChildren: 0.3, // Wait before starting the stagger
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

// --- Section 1: Hero Component ---
function HeroSection() {
    return (
        <div
            className="w-full text-center"
            style={{
                backgroundColor: colors.primaryBlue,
                color: colors.lightText,
            }}
        >
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <motion.h1
                    // --- CHANGED: Removed 'leading-loose' class ---
                    className="text-3xl sm:text-5xl md:text-6xl font-bold" 
                    // Apply gradient as background, clip to text, and make text color transparent
                    style={{
                        backgroundImage: colors.headText,
                        WebkitBackgroundClip: 'text', // For cross-browser compatibility
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.2, // Added a base line-height
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Better Results.
                    <br />
                    {/* --- CHANGED: Added span with responsive margin-top --- */}
                    <span className="inline-block mt-3 sm:mt-4 md:mt-5">Less Time.</span>
                </motion.h1>
                <motion.p
                    className="text-base sm:text-lg md:text-xl mt-6 text-gray-200" // Responsive text
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Public speaking coaching, speech writing services, and
                    last-minute tune-ups. Providing you the fully personalized,
                    1-on-1 concierge service you deserve.
                </motion.p>
            </div>
        </div>
    );
}

// --- Section 2: Sticky Scroll Feature Component ---
function StickyScrollFeature() {
    const [activeSection, setActiveSection] = useState(0);
    const scrollRef = useRef(null);
    
    // --- State to "lock" scroll updates during click animation ---
    const [isClickScrolling, setIsClickScrolling] = useState(false);
    const scrollTimeout = useRef(null); // Ref to hold the timeout

    // 1. useScroll to track scroll progress of the scrollRef container
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        // Offset start point by 10vh (0.1)
        offset: ['start 0.1', 'end 1'], 
    });

    // 2. Update activeSection state based on scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            // --- If click animation is busy, ignore scroll updates ---
            if (isClickScrolling) return;

            const numSections = featureData.length;
            
            // Ensure latest is between 0 and 1
            const clampedLatest = Math.max(0, Math.min(1, latest));

            const newSection = Math.min(
                numSections - 1,
                Math.floor(clampedLatest * numSections)
            );

            // Use functional update to get the most recent state
            setActiveSection((currentActiveSection) => {
                if (newSection !== currentActiveSection) {
                    return newSection; // Set the new state
                }
                return currentActiveSection; // Keep the current state
            });
        });

        // Cleanup function to unsubscribe
        return () => unsubscribe();
    }, [scrollYProgress, isClickScrolling]); // --- Add dependency

    // 3. Handle clicking on a heading
    const handleHeadingClick = (index) => {
        // Set state immediately on click
        setActiveSection(index);
        
        // --- Set the lock ---
        setIsClickScrolling(true);
        
        // --- Clear any existing timeout ---
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        if (scrollRef.current) {
            const numSections = featureData.length;
            
            // Calculate height based on 90vh (window.innerHeight * 0.9)
            const containerScrollHeight =
                scrollRef.current.scrollHeight - (window.innerHeight * 0.9);
            
            const sectionScrollTop = (containerScrollHeight / numSections) * index;
            
            const containerTop = scrollRef.current.offsetTop;

            const scrollPos = containerTop + sectionScrollTop;

            window.scrollTo({
                top: scrollPos,
                behavior: 'smooth',
            });
            
            // --- Release the lock after 1 second (1000ms) ---
            scrollTimeout.current = setTimeout(() => {
                setIsClickScrolling(false);
            }, 1000);
        }
    };

    return (
        // This parent container defines the scrollable height
        <div
            ref={scrollRef}
            className="relative"
            // 100vh per section
            style={{ height: `${featureData.length * 100}vh` }}
        >
            {/* This div sticks to the top and holds the 100vh content */}
            <div
                className="sticky w-full overflow-hidden"
                // Set top to 10vh and height to 90vh
                style={{
                    backgroundColor: colors.primaryBlue,
                    color: colors.lightText,
                    top: '10vh',
                    height: '90vh',
                }}
            >
                {/* 2-Column Grid Layout */}
                
                <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-24 items-start md:items-center pt-24 md:pt-0 px-6 md:px-8">
                    
                    {/* --- LEFT COLUMN (Headings & Desktop Button) --- */}
                    <div className="flex flex-col justify-center py-8 md:h-[80vh] md:col-span-1">
                        
                        <div className="flex flex-col h-full justify-between md:pl-24">
                            
                            {/* Headings - 'w-fit' */}
                            <div className="space-y-16 w-fit"> 
                                {featureData.map((item, index) => (
                                    <h2
                                        key={index}
                                        className="text-4xl xl:text-5xl font-extrabold cursor-pointer transition-all duration-300" // Responsive text
                                        style={{
                                            color:
                                                activeSection === index
                                                    ? colors.lightText // Active color white
                                                    : 'rgba(249, 250, 251, 0.5)', // gray-50 with opacity
                                            opacity:
                                                activeSection === index ? 1 : 0.7,
                                        }}
                                        onClick={() => handleHeadingClick(index)}
                                    >
                                        {item.title}
                                    </h2>
                                ))}
                            </div>

                            {/* Bottom Text & Button (Desktop Only) - 'w-fit' */}
                            <div className="hidden md:block w-fit"> {/* Hidden on mobile */}
                                
                                <p className="text-xs text-gray-300">
                                    All services supported by our money-back 100%
                                    satisfaction guarantee.
                                </p>
                                
                                <motion.button
                                    className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg" // Responsive text/padding
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
                                        color: colors.lightText, // White text
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    Book Your Free Session
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (Card Container) --- */}
                    <div className="md:col-span-2 w-full flex md:h-[80vh] items-center md:justify-center">
                        
                        {/* --- The Card Itself (mobile height is 400px, width 80%) --- */}
                        <div className="w-full md:w-[80%] h-[400px] md:h-full rounded-2xl overflow-hidden shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection} // Change key to trigger AnimatePresence
                                    className="relative w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* --- Video src is now dynamic and public --- */}
                                    <video
                                        key={featureData[activeSection].videoSrc} // Add key to force re-load
                                        src={featureData[activeSection].videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Semi-transparent overlay -- CHANGED to bg-black/80 */}
                                    <div className="absolute inset-0 bg-black/80"></div>

                                    {/* Animated Bullet Points */}
                                    <motion.ul
                                        className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-8 md:p-12 text-white" // Responsive padding
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        key={`list-${activeSection}`} // Ensure list re-animates
                                    >
                                        {featureData[activeSection].bullets.map(
                                            (bullet, i) => (
                                                <motion.li
                                                    key={i}
                                                    variants={itemVariants}
                                                    
                                                    // --- CHANGES ARE ON THIS LINE ---
                                                    // 1. Font weight increased: font-extrabold
                                                    // 2. Margin bottom increased: mb-20
                                                    className="text-lg sm:text-xl md:text-2xl font-extrabold mb-20 flex items-start"
                                                    
                                                    style={{
                                                        textShadow:
                                                            '0 1px 3px rgba(0,0,0,0.5)',
                                                    }}
                                                >
                                                    <div
                                                        // Removed 'mt-1' to fix alignment
                                                        className="w-7 h-7 md:w-8 md:h-8 mr-3 flex-shrink-0 rounded-full flex items-center justify-center"
                                                    >
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 0 20 20" 
                                                            className="w-full h-full"
                                                        >
                                                            <path 
                                                                fillRule="evenodd" 
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" 
                                                                clipRule="evenodd"
                                                                fill="#764ba2" // Path/checkmark is purple
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span>{bullet}</span>
                                                </motion.li>
                                            )
                                        )}
                                    </motion.ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>


                    {/* --- MOBILE-ONLY Button/Text Section --- */}
                    <div className="block md:hidden py-8">
                        <p className="text-xs text-gray-300">
                            All services supported by our money-back 100%
                            satisfaction guarantee.
                        </p>
                        <motion.button
                            className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg w-full" // Full width for mobile
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
                                color: colors.lightText, // White.
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            Book Your Free Session
                        </motion.button>
                    </div>

                </div> {/* Closes 2-Column Grid Layout */}
            </div> {/* Closes sticky div */}
        </div> // Closes scrollRef div
    );
}

// --- Main App Component ---
export default function App() {
    return (
        <>
            {/* CDN Scripts and Styles */}
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/framer-motion/10.16.4/framer-motion.umd.min.js"></script>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                body { 
                    font-family: 'Inter', sans-serif; 
                    background-color: ${colors.primaryBlue};
                }
                html {
                    scroll-behavior: auto;
                }
            `}</style>

            <div
                className="min-h-screen"
                style={{ backgroundColor: colors.primaryBlue }}
            >
                <HeroSection />
                <StickyScrollFeature />
            
            </div>
        </>
    );
}