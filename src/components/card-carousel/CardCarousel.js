import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CardCarousel.css";
import CostIC from "./cost-of-miscommunication.png";
import RelentionIC from "./employee-retention.png";
import FearIC from "./public-speaking-fear.png";
import GenZIC from "./gen-z-speaking-anxiety.png";
import TreatmentIC from "./treatment-costs.png";
import AvoidanceIC from "./avoidance-behavior.png";
import CareerIC from "./career-advancement.png";
import EmployersIC from "./employer-challaneges.png";
import PromotionIC from "./promotion-advantage.png";
import StorytellingIC from "./storytelling.png";
import SkillsIC from "./skills-shortage.png";
import { useInView } from "framer-motion";

const visiblePositions = [-2, -1, 0, 1, 2];
const baseDistance = 400;

// src/data/cardData.ts
const cardsData = [
  {
    icon: CostIC,
    alt: "Cost",
    title: "The Cost of Miscommunication",
    description:
      "Miscommunication costs U.S. businesses an estimated $1.2 trillion annually through nonverbal missteps and information overload.",
    stats: "$1.2T Annual Loss",
  },
  {
    icon: RelentionIC,
    alt: "Retention",
    title: "Employee Retention",
    description:
      "Workplaces fostering effective communication report 4.5 times higher employee retention rates than companies with poor communication.",
    stats: "4.5x Higher Retention",
  },
  {
    icon: FearIC,
    alt: "Fear",
    title: "Public Speaking Fear",
    description:
      "86% of individuals from low-income backgrounds experience intense fear of public speaking, creating barriers to advancement.",
    stats: "86% Experience Fear",
  },
  {
    icon: GenZIC,
    alt: "Gen-Z",
    title: "Gen-Z Speaking Anxiety",
    description:
      "74% of Gen-Zers admit to having fear of public speaking, highlighting challenges for the emerging workforce.",
    stats: "74% of Gen-Z Affected",
  },
  {
    icon: TreatmentIC,
    alt: "Treatment",
    title: "Treatment Costs",
    description:
      "Economic burden of treating anxiety disorders including glossophobia ranges from $42.3 to $46.6 billion annually in the U.S.",
    stats: "$42-46B Treatment Costs",
  },
  {
    icon: AvoidanceIC,
    alt: "Avoidance",
    title: "Avoidance Behavior",
    description:
      "80% of people actively avoid situations requiring speaking to an audience, limiting personal growth and career progression.",
    stats: "80% Avoid Speaking",
  },
  {
    icon: CareerIC,
    alt: "Career",
    title: "Career Impact",
    description:
      "45% of individuals reject job promotions due to public speaking requirements, directly impacting career trajectories.",
    stats: "45% Reject Promotions",
  },
  {
    icon: EmployersIC,
    alt: "Employers",
    title: "Employer Challenges",
    description:
      "90% of employers face challenges filling positions requiring strong public speaking and presentation skills.",
    stats: "90% Face Hiring Issues",
  },
  {
    icon: PromotionIC,
    alt: "Promotion",
    title: "Promotion Advantage",
    description:
      "Confident public speakers are 70% more likely to be promoted into management positions.",
    stats: "70% More Promotions",
  },
  {
    icon: StorytellingIC,
    alt: "Storytelling",
    title: "Storytelling Power",
    description:
      "Storytelling increases message retention by up to 22 times compared to presenting facts and figures alone.",
    stats: "22x Better Retention",
  },
  {
    icon: SkillsIC,
    alt: "Skills",
    title: "Skill Shortage",
    description:
      "75% of employers find recent graduates lack adequate communication skills crucial for workplace success.",
    stats: "75% Lack Skills",
  },
];

const totalCards = cardsData.length;

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rootRef = useRef(null);
  const cardsRef = useRef([]);
  const indicatorsRef = useRef([]);
  const stageContainerRef = useRef(null);
  const [pause, setPause] = useState(true);
  const isInView = useInView(rootRef, { amount: 0.2, once: true });

  const getRelativePos = (index) => {
    let relativePos = index - currentIndex;
    while (relativePos > totalCards / 2) relativePos -= totalCards;
    while (relativePos < -totalCards / 2) relativePos += totalCards;
    return relativePos;
  };

  const updateIndicators = () => {
    indicatorsRef.current.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  };

  const updateCarousel = () => {
    cardsRef.current.forEach((card, index) => {
      const relativePos = getRelativePos(index);
      const isVisible = visiblePositions.includes(relativePos);

      if (isVisible) {
        card.classList.add("visible");

        const angle = relativePos * 25;
        const depthOffset = Math.abs(relativePos) * 80;
        const x = Math.sin((angle * Math.PI) / 180) * baseDistance;
        const z = -depthOffset;
        const y = Math.abs(relativePos) * 15;

        let rotY = 0,
          scale = 1,
          opacity = 1,
          blur = 0;

        if (relativePos === 0) {
          card.classList.add("center");
          scale = 1.15;
        } else {
          card.classList.remove("center");
          rotY = -angle * 0.8;
          scale = 1 - Math.abs(relativePos) * 0.15;
          opacity = Math.max(0.6, 1 - Math.abs(relativePos) * 0.15);
          blur = Math.abs(relativePos) * 2;
        }

        gsap.to(card, {
          duration: 0.8,
          x,
          y: -y,
          z,
          rotateY: rotY,
          scale,
          opacity,
          filter: `blur(${blur}px)`,
          zIndex: 10 - Math.abs(relativePos),
          ease: "power2.out",
        });
      } else {
        card.classList.remove("visible", "center");
        gsap.to(card, {
          duration: 0.8,
          opacity: 0,
          ease: "power2.out",
        });
      }
    });
    updateIndicators();
  };

  const rotate = (direction) => {
    let newIndex;
    if (currentIndex === -1) {
      newIndex = direction === 1 ? 0 : totalCards - 1;
    } else {
      newIndex = (currentIndex + direction + totalCards) % totalCards;
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  useEffect(() => {
    if (isInView) setPause(false);
  }, [isInView]);

  // --- AUTOPLAY ---
  useEffect(() => {
    let autoplay = setInterval(() => {
      rotate(1);
    }, 3000);

    const pauseAutoplay = () => clearInterval(autoplay);
    const resumeAutoplay = () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        rotate(1);
      }, 3000);
    };

    if (pause) {
      pauseAutoplay();
    } else {
      resumeAutoplay();
    }

    return () => {
      clearInterval(autoplay);
    };
  }, [currentIndex, pause]);

  useEffect(() => {
    const title = document.querySelector(".section-title");
    const navButtons = document.querySelectorAll(".nav-button");
    const indicators = document.querySelector(".indicators");
    const stage = document.querySelector(".stage");
    const section = document.querySelector(".card-carousel-section");

    let hasAnimated = false;
    let observer;

    const runAnimation = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      gsap.set(title, { opacity: 0, y: -30 });
      gsap.set(".card-carousel", { opacity: 0, y: 100, scale: 0.8 });
      gsap.set(navButtons, { opacity: 0, scale: 0 });
      gsap.set(indicators, { opacity: 0, y: 20 });
      gsap.set(stage, { opacity: 0, scale: 0.7 });

      const tl = gsap.timeline();

      // Add section reveal animation
      tl.fromTo(
        section,
        { opacity: 0, y: 80 },
        { duration: 1.2, opacity: 1, y: 0, ease: "power3.out" }
      )
        .to(title, { duration: 1, opacity: 1, y: 0, ease: "power3.out" }, "-=0.6")
        .to(
          stage,
          { duration: 1.5, opacity: 1, scale: 1, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          ".card-carousel.visible",
          {
            duration: 1,
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: updateCarousel,
          },
          "-=0.8"
        )
        .to(
          navButtons,
          {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          indicators,
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          "-=0.3"
        );
    };

    if (section && "IntersectionObserver" in window) {
      observer = new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
    } else {
      // fallback if IntersectionObserver not supported
      runAnimation();
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="card-carousel-section">
      <div className="stage-container" ref={stageContainerRef}>
        <h2 className="section-title">
          Investing in public speaking has never been more valuable
        </h2>
        <div className="stage"></div>
        <div className="carousel-container" ref={rootRef}>
          <div className="carousel" id="carousel">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="card-carousel"
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
              >
                <div className="card-carousel-content">
                  <div className="card-icon">
                    <img src={card.icon} alt={card.alt} />
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-stats">{card.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nav-button prev" onClick={() => rotate(-1)}>
          ‹
        </div>
        <div className="nav-button next" onClick={() => rotate(1)}>
          ›
        </div>
        <div className="indicators">
          {cardsData.map((_, index) => (
            <div
              key={index}
              className="indicator"
              ref={(el) => (indicatorsRef.current[index] = el)}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
