import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BeforeWeBeginCard.css";

// --- Images (Assuming imports are set up) ---
import Corporate from "./corporate.jpg";
import Ted from "./ted-style.jpg";
import Entrepreneurs from "./founder.jpg";
import JobSeekers from "./job-seekers.jpg";
import Coaches from "./coaches.jpg";
import Academics from "./academic.jpg";
import Career from "./career-professional.jpg";

const clientTypes = [
  {
    key: "corporate",
    title: "Corporate Leaders",
    image: Corporate,
    paragraphs: [
      "When you're leading teams, negotiating deals, or shaping culture, your voice isn’t just a tool — it’s a signal. It tells people whether they can trust you, follow you, or bet on you.",
      "If you're stepping into higher stakes, larger rooms, or moments where clarity, composure, and presence are non-negotiable — then this is exactly the work you need.",
    ],
  },
  {
    key: "ted",
    title: "TED-Style Speakers",
    image: Ted,
    paragraphs: [
      "You have something inside you worth saying. A message. A story. A truth the world needs to hear — but maybe you don’t yet know how to shape it. Or deliver it with the power it deserves.",
      "If you're not just chasing applause, but aiming to move people — to spark new thinking, shift paradigms, or ignite action — this is where that transformation begins.",
    ],
  },
  {
    key: "entrepreneurs",
    title: "Entrepreneurs and Founders",
    image: Entrepreneurs,
    paragraphs: [
      "You’re not just pitching a product. You’re pitching a vision, a future — a version of the world that only exists if people believe in what you’re building. That takes more than confidence. It takes clarity, conviction, and a way of speaking that cuts through the noise.",
      "If you're ready to sharpen the way you pitch, persuade, and lead — not just for investors, but for your team, your market, and yourself — then we’re a perfect match.",
    ],
  },
  {
    key: "jobseekers",
    title: "Job Seekers and Ivy League Applicants",
    image: JobSeekers,
    paragraphs: [
      "Job interviews aren’t just about answering questions — they are about owning your story. Most people don’t struggle because they lack skills — they struggle because they don’t know how to speak with presence and clarity when it counts.",
      "If you’re ready to stop hoping you’ll come across well — and start ensuring it — then we’re a great fit.",
    ],
  },
  {
    key: "coaches",
    title: "Coaches and Consultants",
    image: Coaches,
    paragraphs: [
      "When your business is built on trust, how you speak is your brand. The most successful professionals don’t just deliver results — they communicate value, authority, and alignment in every interaction.",
      "If you’re ready to sound like the expert you already are — and get clients to feel that from the very first word — let’s work together.",
    ],
  },
  {
    key: "academics",
    title: "Academics, Experts, and Thought-Leaders",
    image: Academics,
    paragraphs: [
      "Expertise is only half the battle. The other half? Making people care. I work with researchers who struggle to translate their knowledge into messages that resonate outside their field.",
      "If you're ready to bridge the gap between what you know and what others hear — and to make complexity feel clear, urgent, and human — then yes, we’re a great fit.",
    ],
  },
  {
    key: "career",
    title: "Early-Mid Career Professionals",
    image: Career,
    paragraphs: [
      "Maybe you’ve got the ideas and the drive — but in meetings, you freeze up, ramble, or go unheard. It’s not that you’re not capable. It’s that you’ve never been shown how to speak in a way that makes people listen.",
      "If you're done letting fear be the loudest voice in your head, this work will change you. Not just how you speak — but how you see yourself.",
    ],
  },
];

export default function BeforeWeBeginCard() {
  const [active, setActive] = useState(0);
  const scrollContainer = useRef(null);

  useEffect(() => {
    const el = scrollContainer.current;
    if (!el) return;

    const totalCards = clientTypes.length;

    // --- FASTER SCROLL LOGIC ---
    // Each card will take 0.5 (50%) of a viewport-height-scroll
    const SCROLL_PER_CARD = 0.5;
    
    // Total distance the user will scroll *while locked*
    const totalScrollDistance = window.innerHeight * totalCards * SCROLL_PER_CARD;
    
    // Total height of the wrapper (scroll distance + 1 screen for the component)
    const totalWrapperHeight = totalScrollDistance + window.innerHeight;

    el.style.height = `${totalWrapperHeight}px`;
    // --- END LOGIC ---

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (!rect) return;

      const scrollableHeight = totalWrapperHeight - window.innerHeight;

      const progress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
      );

      const index = Math.floor(progress * totalCards);
      setActive(Math.min(index, totalCards - 1));

      const lock = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (document.body) {
        document.body.style.overflow = lock ? "hidden" : "auto";
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (document.body) {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  return (
    <section ref={scrollContainer} className="bwgc-lock-wrapper">
      <div className="bwgc-sticky-container">
        <h2 className="bwgc-title">Are We a Good Fit?</h2>

        <div className="bwgc-layout">
          {/* Left List */}
          <ul className="bwgc-list">
            {clientTypes.map((c, i) => (
              <li
                key={c.key}
                // The active class is now on the LI wrapper
                className={`bwgc-item-container ${i === active ? "active" : ""}`}
              >
                {/* Clickable Title */}
                <div
                  className="bwgc-item"
                  onClick={() => setActive(i)}
                >
                  {c.title}
                </div>

                {/* --- MOBILE-ONLY CONTENT --- */}
                <div className="bwgc-mobile-content-wrapper">
                  <AnimatePresence>
                    {i === active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="bwgc-mobile-card-content">
                          <img
                            src={c.image}
                            alt={c.title}
                            className="bwgc-image"
                          />
                          <div className="bwgc-text">
                            {/* --- HEADING REMOVED FROM HERE --- */}
                            {c.paragraphs.map((p, p_i) => (
                              <p key={p_i}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            ))}
          </ul>

          {/* Right Content (DESKTOP ONLY) */}
          <div className="bwgc-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={clientTypes[active].key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bwgc-card"
              >
                <img
                  src={clientTypes[active].image}
                  alt={clientTypes[active].title}
                  className="bwgc-image"
                />
                <div className="bwgc-text">
                  <h3>{clientTypes[active].title}</h3>
                  {clientTypes[active].paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}