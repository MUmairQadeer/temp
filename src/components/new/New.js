import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
} from 'framer-motion';

// Define color palette
const colors = {
    primaryBlue: '#0d0d1a', // Deep Navy
    accentGold: '#D4AF37', // Gold
    lightText: '#F9FAFB', // gray-50
    darkText: '#1F2937', // gray-800
    headText: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

// --- Data for the sticky scroll section ---
const featureData = [
    {
        title: 'Faster',
        bullets: [
            'Our VIP service means your needs and deadlines receive our undivided attention.',
            'No wasted time. Every minute is focused entirely on you—your challenges, your goals, and your dream outcome.',
            'Speeches ready in days, not weeks.',
        ],
        videoSrc: './1.mp4',
    },
    {
        title: 'Simpler',
        bullets: [
            'Every step of the process is designed to eliminate stress, anxiety, and wasted time.',
            'Friendly, personal VIP care that supports you every step of the way.',
            'Nothing left to chance—clear, actionable advice on your content, clarity, deliverable, and more.',
        ],
        videoSrc: './2.mp4',
    },
    {
        title: 'Better',
        bullets: [
            'Take advantage of 20+ years of public speaking and speech writing experience',
            '1-on-1 VIP service means speeches and solutions specifically tailored to your style, personality, audience, and goals.',
            'Combining real-time expert feedback with extensive tools and resources for truly transformative results.',
        ],
        videoSrc: './3.mp4',
    },
];

// --- Animation Variants for Lists ---
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.3,
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

    const [isClickScrolling, setIsClickScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start 0.1', 'end 1'],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (isClickScrolling) return;
            const numSections = featureData.length;
            const clampedLatest = Math.max(0, Math.min(1, latest));
            const newSection = Math.min(
                numSections - 1,
                Math.floor(clampedLatest * numSections)
            );
            setActiveSection(() => newSection);
        });
        return () => unsubscribe();
    }, [scrollYProgress, isClickScrolling]);

    const handleHeadingClick = (index) => {
        setActiveSection(index);
        setIsClickScrolling(true);
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        if (scrollRef.current) {
            const numSections = featureData.length;
            const containerScrollHeight =
                scrollRef.current.scrollHeight - window.innerHeight * 0.9;
            const sectionScrollTop = (containerScrollHeight / numSections) * index;
            const containerTop = scrollRef.current.offsetTop;
            const scrollPos = containerTop + sectionScrollTop;

            window.scrollTo({
                top: scrollPos,
                behavior: 'smooth',
            });

            scrollTimeout.current = setTimeout(() => {
                setIsClickScrolling(false);
            }, 1000);
        }
    };

    return (
        <div
            ref={scrollRef}
            className="relative"
            style={{ height: `${featureData.length * 100}vh` }}
        >
            <div
                className="sticky w-full overflow-hidden"
                style={{
                    backgroundColor: colors.primaryBlue,
                    color: colors.lightText,
                    top: '10vh',
                    height: '90vh',
                }}
            >
                {/* Mobile content is scrollable (overflow-y-auto) */}
                <div className="max-w-7xl mx-auto h-full overflow-y-auto md:grid md:grid-cols-3 gap-6 md:gap-12 lg:gap-24 md:items-center md:pt-0 px-6 md:px-8">

                    {/* --- LEFT COLUMN (Headings & Desktop Button) --- */}
                    <div className="flex flex-col justify-center py-8 md:h-[80vh] md:col-span-1">
                        <div className="flex flex-col h-full justify-between md:pl-24">

                            {/* Space between headings reduced */}
                            <div className="space-y-10 w-fit">
                                {featureData.map((item, index) => (
                                    <h2
                                        key={index}
                                        className="text-4xl xl:text-5xl font-extrabold cursor-pointer transition-all duration-300"
                                        style={{
                                            color:
                                                activeSection === index
                                                    ? colors.lightText
                                                    : 'rgba(249, 250, 251, 0.5)',
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
                                    All services supported by our money-back 100%
                                    satisfaction guarantee.
                                </p>
                                <motion.button
                                    className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 sm:mt-6 shadow-lg"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: colors.lightText,
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

                        {/* Mobile card height set to `h-[45vh]` */}
                        <div className="w-full md:w-[80%] h-[45vh] md:h-full rounded-2xl overflow-hidden shadow-2xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    /* Aligns text to TOP on mobile, center on desktop */
                                    className="relative w-full h-full flex flex-col justify-start md:justify-center"
                                    
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* --- FIX: Added `scale-105` --- */}
                                    <video
                                        key={featureData[activeSection].videoSrc}
                                        src={featureData[activeSection].videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover scale-105"
                                    />
                                    {/* --- FIX: Added `scale-105` --- */}
                                    <div className="absolute inset-0 bg-black/80 scale-105"></div>

                                    {/* Added top padding on mobile (pt-12) */}
                                    <motion.ul
                                        className="relative z-10 flex flex-col px-6 pt-12 sm:p-8 md:p-12 text-white"
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                        key={`list-${activeSection}`}
                                    >
                                        {featureData[activeSection].bullets.map(
                                            (bullet, i) => (
                                                <motion.li
                                                    key={i}
                                                    variants={itemVariants}
                                                    className="text-base sm:text-lg md:text-xl font-extrabold mb-6 md:mb-20 last:mb-0 flex items-start"
                                                    style={{
                                                        textShadow:
                                                            '0 1px 3px rgba(0,0,0,0.5)',
                                                    }}
                                                >
                                                    <div
                                                        className="w-7 h-7 md:w-8 md:h-8 mr-3 flex-shrink-0"
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
                                                                fill="#764ba2"
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
                
                    {/* Mobile Button block with `pt-10` margin-top */}
                    <div className="block md:hidden pt-10 pb-16">
                        <p className="text-xs text-gray-300">
                            All services supported by our money-back 100%
                            satisfaction guarantee.
                        </p>
                        <motion.button
                            className="font-semibold text-[0.9rem] py-2 px-5 rounded-full mt-4 shadow-lg w-full"
                            style={{
                                backgroundImage:
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: colors.lightText,
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
        </div>
    );
}

// --- Main App Component ---
export default function New() {
    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: colors.primaryBlue }}
        >
            <HeroSection />
            <StickyScrollFeature />
        </div>
    );
}