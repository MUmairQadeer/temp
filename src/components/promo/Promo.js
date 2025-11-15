import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PromoVideo from './Promo.mp4';

// --- Config ---
const TYPING_WORDS = ["Pitch", "Speech", "Presentation", "Moment", "Talk"];
const PURPLE_COLOR = "#667eea";
const FONT_FAMILY = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

// --- Typing Effect ---
const TypingEffect = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typeSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span
      className="inline-block transition-all duration-100 min-h-[1em]"
      style={{ color: PURPLE_COLOR }}
    >
      {text}
      <span className="opacity-50 animate-pulse">_</span>
    </span>
  );
};

// --- Main Cinematic Promo ---
export default function CinematicPromo() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- Animation keyframes ---
  const TEXT_FADE_OUT_END = 0.4;
  const CARD_ANIMATION_START = 0.0;
  const CARD_ANIMATION_END = 0.7;
  const SLIDE_TEXT_ANIMATION_START = 0.6;
  const SLIDE_TEXT_ANIMATION_END = 0.8;

  // Hero text moves up and fades
  const text1Y = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], ["0vh", "-50vh"]);
  const text1Opacity = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], [1, 0]);

  // Video card position & scale
  const videoCardY = useTransform(scrollYProgress, [CARD_ANIMATION_START, CARD_ANIMATION_END], ["60vh", "0vh"]);
  const videoCardScale = useTransform(scrollYProgress, [CARD_ANIMATION_START, CARD_ANIMATION_END], [0.5, 1]);

  // Dark overlay opacity
  const overlayOpacity = useTransform(scrollYProgress, [0.4, CARD_ANIMATION_END], [0, 0.6]);

  // Sliding text transforms
  const textTopX = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], ["-100%", "0%"]);
  const textBottomX = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], ["100%", "0%"]);

  // Separate opacity for top & bottom text
  const textTopOpacity = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], [0, 1]);
  const textBottomOpacity = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], [0, 1]);

  // --- Play button handler ---
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  return (
    <div 
      ref={targetRef} 
      className="h-[300vh] relative"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden"
           style={{ background: 'linear-gradient(180deg, #000000 20%, #2a2a4e 100%)' }}
      >

        {/* Hero Text */}
        <motion.div
          style={{ y: text1Y, opacity: text1Opacity }}
          className="absolute inset-0 z-30 flex items-center justify-center will-change-transform"
        >
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
            Make Your
            <br />
            <TypingEffect />
            <br />
            Unforgettable
          </h1>
        </motion.div>

        {/* Video Card */}
        <motion.div
          style={{ y: videoCardY, scale: videoCardScale }}
          className="absolute top-0 w-full h-full flex items-center justify-center will-change-transform"
        >
          <div className="relative w-full h-full overflow-hidden">

            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={!showPlayButton}
              playsInline
              muted
            >
              <source src={PromoVideo} type="video/mp4" />
              Your browser does not support HTML video.
            </video>

            {/* Dark overlay */}
            <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-10 will-change-transform" />

            {/* Sliding Text (Above overlay) */}
            <div className="absolute inset-0 z-20 pointer-events-none">

              <motion.h2
                // style={{ x: textTopX, opacity: textTopOpacity, color: PURPLE_COLOR }}
                className="absolute top-20 left-8 md:top-24 md:left-12 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                style={{
                  x: textTopX,
                  opacity: textTopOpacity,
                  color: PURPLE_COLOR,
                  textShadow: "0 2px 6px rgba(0,0,0,0.5)"
                }}
              >
                It’s Time
              </motion.h2>

              <motion.h2
                // style={{ x: textBottomX, opacity: textBottomOpacity, color: PURPLE_COLOR }}
                className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                style={{
                  x: textBottomX,
                  opacity: textBottomOpacity,
                  color: PURPLE_COLOR,
                  textShadow: "0 2px 6px rgba(0,0,0,0.5)"
                }}
              >
                To Level Up
              </motion.h2>

            </div>

            {/* Play Button */}
            {showPlayButton && (
              <button
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                aria-label="Play video"
              >
                <div className="w-0 h-0 border-solid border-l-[24px] md:border-l-[32px] border-y-[16px] md:border-y-[20px] border-y-transparent border-l-white ml-2 md:ml-3" />
              </button>
            )}

          </div>
        </motion.div>

      </div>
    </div>
  );
}
