import {  useRef } from "react";
import "./Faq.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView, motion } from "framer-motion";
import FaqQuestion from "./FaqQuestion";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "Are you available for speaker training services worldwide?",
    answer:
      "Yes! I am happy to facilitate your speaker training worldwide, whether remotely or in person.",
  },
  {
    question:
      "My presentation is coming up ASAP--how quickly can you prepare a presentation?",
    answer:
      "I specialize in ultra-fast turnaround times for high-stakes presentations. I regularly draft TEDx Talks and major keynotes in 72 hours or less.",
  },
  {
    question:
      "English isn't my first language, can you help me to communicate clearly, improve my vocabulary, and to connect effectively with the audience?",
    answer:
      "Absolutely. I have supported clients from across Europe, Africa, Asia, MENA, and South America for over two decades. Cross-cultural communication has been central to my work.",
  },
  {
    question:
      "I'm not necessarily looking to give speeches, but I'd like to sound and feel more confident when I speak or conduct interviews. Can you help with that?",
    answer:
      "We have developed extensive training programs specifically for clients looking to communicate with confidence and clarity in interviews, office meetings and everyday settings. Please reach out, and we will be happy to share more information.",
  },
  {
    question:
      "Do you have workshops, seminars, or corporate training packages available?",
    answer:
      "Yes--please contact us, and we will be happy to share you an up-to-date listing of all of our available corporate training services and packages.",
  },
];

function FaqAnimatedCircles() {
  return (
    <div className="faq-animated-circles-wrapper">
      <div className="faq-animated-circle1" />
      <div className="faq-animated-circle2" />
    </div>
  );
}

export default function Faq() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section ref={ref} className="faq-section-wrapper">
      <FaqAnimatedCircles />
      <div className="main-container">
        <section className="section faq-section">
          <div className="faq-container">
            <motion.h2
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="faq-title"
            >
              Frequently Asked Questions
            </motion.h2>
            {faqData.map((item, idx) => (
              <FaqQuestion key={idx} idx={idx} item={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
