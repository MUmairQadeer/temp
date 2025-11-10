import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PromoVideo from './Promo.mp4';
// --- Config ---
// Words for the typing effect
const TYPING_WORDS = ["Pitch", "Speech", "Presentation", "Moment", "Talk"];
// Placeholder assets

const PURPLE_COLOR = "#667eea"; // Accent color for text

// --- Typing Effect Component ---
const TypingEffect = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typeSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      if (isDeleting) {
        // Backspace
        setText(currentWord.substring(0, text.length - 1));
      } else {
        // Type forward
        setText(currentWord.substring(0, text.length + 1));
      }

      // Check for state change
      if (!isDeleting && text === currentWord) {
        // Word finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        // Word finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span
      className="inline-block transition-all duration-100 min-h-[1em]" // Ensures layout doesn't jump
      style={{ color: PURPLE_COLOR }}
    >
      {text}
      <span className="opacity-50 animate-pulse">_</span>
    </span>
  );
};

// --- Main Cinematic Promo Component ---
export default function CinematicPromo() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);
  const targetRef = useRef(null);

  // Set up the scroll listener on the targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // Animation runs for the full 300vh
  });

  // --- Animation Keyframes ---
  const TEXT_FADE_OUT_END = 0.4;
  const CARD_ANIMATION_START = 0.0;
  const CARD_ANIMATION_END = 0.7;
  const SLIDE_TEXT_ANIMATION_START = 0.6;
  const SLIDE_TEXT_ANIMATION_END = 0.8;

  // 1. Initial Hero Text (Moves up, fades out)
  const text1Y = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], ["0vh", "-50vh"]);
  const text1Opacity = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], [1, 0]);

  // 2. Video Card (Starts "peeking", scales and moves to fill screen)
  const videoCardY = useTransform(
    scrollYProgress,
    [CARD_ANIMATION_START, CARD_ANIMATION_END],
    ["60vh", "0vh"] // Starts at 60% from top (peeking), moves to 0 (full)
  );
  const videoCardScale = useTransform(
    scrollYProgress,
    [CARD_ANIMATION_START, CARD_ANIMATION_END],
    [0.5, 1] // Starts at 50% scale, ends at 100%
  );

  // 3. Dark Overlay (Fades in as card scales)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.4, CARD_ANIMATION_END],
    [0, 0.6] // 60% dark overlay for readability
  );

  // NEW: Opacity for sliding text to prevent pre-animation visibility
  const textSlideOpacity = useTransform(
    scrollYProgress,
    // Start fade-in just as the slide starts
    [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_START + 0.1],
    [0, 1] // Go from 0 to 1 opacity
  );

  // 4. "It's Time" (Slides from left)
  // REMOVED Y-TRANSFORM
  const textTopX = useTransform(
    scrollYProgress,
    [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END],
    ["-100%", "0%"]
  );

  // 5. "To Level Up." (Slides from right)
  // REMOVED Y-TRANSFORM
  const textBottomX = useTransform(
    scrollYProgress,
    [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END],
    ["100%", "0%"]
  );

  // --- Handlers ---
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  return (
    <>
      {/* --- Styles and Tailwind Import --- */}
      <style>{`
        /* Load Tailwind CSS */
        @import url('https://cdn.tailwindcss.com/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        
        /* Set a default font */
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        
        /* Custom background gradient */
        .promo-background {
          background: linear-gradient(180deg, #000000 20%, #2a2a4e 100%);
        }

        /* Custom text color */
        .text-promo-purple {
          color: ${PURPLE_COLOR};
        }
      `}</style>

      {/* 1. The Scroll Track (300vh height drives the animation) */}
      <div ref={targetRef} className="h-[300vh] relative">

        {/* 2. The Sticky Stage (Holds all animated elements) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden promo-background">

          {/* --- Initial Hero Text --- */}
          <motion.div
            style={{ y: text1Y, opacity: text1Opacity }}
            className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
          >
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
              Make Your
              <br />
              <TypingEffect />
              <br />
              Unforgettable
            </h1>
          </motion.div>

          {/* --- Animated Video Card --- */}
          <motion.div
            style={{
              y: videoCardY,
              scale: videoCardScale,
            }}
            className="absolute top-0 w-full h-full flex items-center justify-center will-change-transform"
          >
            {/* This inner div is what scales, ensuring it fills the h-screen sticky parent.
              ADDED overflow-hidden to mask the sliding text.
            */}
            <div className="relative w-full h-full overflow-hidden">
              
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                // poster={THUMBNAIL_URL}
                controls={!showPlayButton} // Show controls after play
              >
                <source src={PromoVideo} type="video/mp4" />
                Your browser does not support HTML video.
              </video>

              {/* Dark Overlay */}
              <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black will-change-transform"
              />

              {/* Play Button */}
              {showPlayButton && (
                <button
                  onClick={handlePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                  aria-label="Play video"
                >
                  {/* Play Icon (Triangle) */}
                  <div className="w-0 h-0 border-solid border-l-[24px] md:border-l-[32px] border-y-[16px] md:border-y-[20px] border-y-transparent border-l-white ml-2 md:ml-3" />
                </button>
              )}

              {/* --- Sliding Text (NOW INSIDE THE CARD) --- */}
              {/* This container will be masked by the parent's overflow:hidden */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                
                {/* "It's Time" (Slides from left) */}
                <motion.h2
                  style={{ x: textTopX, opacity: textSlideOpacity }}
                  className="absolute top-8 left-8 md:top-12 md:left-12 text-promo-purple text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                >
                  It’s Time
                </motion.h2>

                {/* "To Level Up." (Slides from right) */}
                <motion.h2
                  style={{ x: textBottomX, opacity: textSlideOpacity }}
                  className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-promo-purple text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                >
                  To Level Up
                </motion.h2>

              </div>
            </div>
          </motion.div>

          {/* --- Sliding Text (REMOVED FROM HERE) --- */}
          
        </div>
      </div>
    </>
  );
}