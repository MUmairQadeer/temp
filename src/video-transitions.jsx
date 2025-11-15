import React, { useEffect, useRef, useState } from 'react';

export default function VideoTransitionExamples() {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [activeExample, setActiveExample] = useState('fade');
  
  // Refs for Fade Transition
  const fadeVideoRef = useRef(null);
  const fadeContentRef = useRef(null);
  const fadeTriggerRef = useRef(null);
  
  // Refs for Wipe Transition
  const wipeVideoRef = useRef(null);
  const wipeContentRef = useRef(null);
  const wipeOverlayRef = useRef(null);
  const wipeTriggerRef = useRef(null);
  
  // Refs for Parallax Transition
  const parallaxVideoRef = useRef(null);
  const parallaxContentRef = useRef(null);
  const parallaxTriggerRef = useRef(null);
  
  // Refs for Blur Transition
  const blurVideoRef = useRef(null);
  const blurContentRef = useRef(null);
  const blurTriggerRef = useRef(null);
  
  // Refs for Zoom Out Transition
  const zoomVideoRef = useRef(null);
  const zoomContentRef = useRef(null);
  const zoomTriggerRef = useRef(null);
  
  // Refs for Split Reveal Transition
  const splitVideoLeftRef = useRef(null);
  const splitVideoRightRef = useRef(null);
  const splitContentRef = useRef(null);
  const splitTriggerRef = useRef(null);
  
  // Refs for 3D Flip Transition
  const flipVideoRef = useRef(null);
  const flipContentRef = useRef(null);
  const flipTriggerRef = useRef(null);
  
  // Refs for Slide Away Transition
  const slideVideoRef = useRef(null);
  const slideContentRef = useRef(null);
  const slideTriggerRef = useRef(null);
  
  // Refs for Gradient Wipe Transition
  const gradientVideoRef = useRef(null);
  const gradientContentRef = useRef(null);
  const gradientWipeRef = useRef(null);
  const gradientTriggerRef = useRef(null);

  // Load GSAP
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      setGsapLoaded(true);
      return;
    }

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadGSAP = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          setGsapLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  // Initialize animations
  useEffect(() => {
    if (!gsapLoaded) return;
    
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    // Clean up existing triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // FADE TRANSITION
    if (fadeVideoRef.current && fadeContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fadeTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(fadeVideoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
      })
      .to(fadeContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 0.3);
    }

    // WIPE TRANSITION
    if (wipeVideoRef.current && wipeContentRef.current && wipeOverlayRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wipeTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(wipeVideoRef.current, {
        scale: 1.2,
        duration: 1,
      })
      .to(wipeOverlayRef.current, {
        scaleX: 1,
        duration: 0.8,
      }, 0.2)
      .to(wipeContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, 0.6);
    }

    // PARALLAX TRANSITION
    if (parallaxVideoRef.current && parallaxContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(parallaxVideoRef.current, {
        y: 200,
        scale: 0.9,
        opacity: 0.3,
        duration: 1,
      })
      .to(parallaxContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, 0);
    }

    // BLUR TRANSITION
    if (blurVideoRef.current && blurContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blurTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(blurVideoRef.current, {
        filter: 'blur(20px)',
        opacity: 0.5,
        scale: 1.05,
        duration: 1,
      })
      .to(blurContentRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 1,
      }, 0.4);
    }

    // ZOOM OUT TRANSITION
    if (zoomVideoRef.current && zoomContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: zoomTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(zoomVideoRef.current, {
        scale: 0.4,
        opacity: 0,
        borderRadius: '24px',
        duration: 1,
      })
      .to(zoomContentRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
      }, 0.3);
    }

    // SPLIT REVEAL TRANSITION
    if (splitVideoLeftRef.current && splitVideoRightRef.current && splitContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(splitVideoLeftRef.current, {
        x: '-100%',
        duration: 1,
      })
      .to(splitVideoRightRef.current, {
        x: '100%',
        duration: 1,
      }, 0)
      .to(splitContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
      }, 0.5);
    }

    // 3D FLIP TRANSITION
    if (flipVideoRef.current && flipContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flipTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(flipVideoRef.current, {
        rotationY: 90,
        opacity: 0,
        duration: 0.5,
      })
      .to(flipContentRef.current, {
        rotationY: 0,
        opacity: 1,
        duration: 0.5,
      }, 0.5);
    }

    // SLIDE AWAY TRANSITION
    if (slideVideoRef.current && slideContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(slideVideoRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 1,
      })
      .to(slideContentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
      }, 0.3);
    }

    // GRADIENT WIPE TRANSITION
    if (gradientVideoRef.current && gradientContentRef.current && gradientWipeRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gradientTriggerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(gradientWipeRef.current, {
        x: '100%',
        duration: 1,
      })
      .to(gradientVideoRef.current, {
        opacity: 0,
        duration: 0.5,
      }, 0.5)
      .to(gradientContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
      }, 0.6);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsapLoaded, activeExample]);

  const examples = [
    { id: 'fade', name: 'Fade & Scale' },
    { id: 'wipe', name: 'Wipe Reveal' },
    { id: 'parallax', name: 'Parallax Depth' },
    { id: 'blur', name: 'Blur Transition' },
    { id: 'zoom', name: 'Zoom Out' },
    { id: 'split', name: 'Split Reveal' },
    { id: 'flip', name: '3D Flip' },
    { id: 'slide', name: 'Slide Away' },
    { id: 'gradient', name: 'Gradient Wipe' },
  ];

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-white text-xl font-bold mb-3">9 Video Transition Examples</h1>
          <div className="flex gap-3 flex-wrap">
            {examples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeExample === example.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-28">
        {/* FADE & SCALE TRANSITION */}
        {activeExample === 'fade' && (
          <div>
            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Fade & Scale Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Scroll to the video, watch it, then keep scrolling</p>
                <p className="text-lg text-neutral-500">The section locks in place as the video fades to content</p>
              </div>
            </section>

            {/* Video Section */}
            <section ref={fadeTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={fadeVideoRef} className="absolute inset-0">
                {/* Video placeholder with gradient animation */}
                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/5 rounded-full blur-xl"
                        style={{
                          width: `${Math.random() * 300 + 100}px`,
                          height: `${Math.random() * 300 + 100}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div ref={fadeContentRef} className="relative z-10 opacity-0 translate-y-12 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                    Next Section
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The section pins in place while you scroll. The video smoothly fades out with a slight scale effect, 
                    and the new content fades in from below. Once complete, scrolling continues normally.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* WIPE REVEAL TRANSITION */}
        {activeExample === 'wipe' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Wipe Reveal Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Section pins in place while transitioning</p>
                <p className="text-lg text-neutral-500">A wipe effect covers video, then reveals new content</p>
              </div>
            </section>

            <section ref={wipeTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={wipeVideoRef} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/10 rounded-full blur-2xl"
                        style={{
                          width: `${Math.random() * 400 + 200}px`,
                          height: `${Math.random() * 400 + 200}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>

              <div 
                ref={wipeOverlayRef}
                className="absolute inset-0 bg-neutral-950 origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
              
              <div ref={wipeContentRef} className="relative z-10 opacity-0 translate-y-12 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                    Revealed Content
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    While pinned, a dramatic horizontal wipe sweeps across, covering the video. 
                    The wipe then reveals this new content underneath, creating a cinematic editing effect.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PARALLAX DEPTH TRANSITION */}
        {activeExample === 'parallax' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Parallax Depth Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">View locks while content slides over video</p>
                <p className="text-lg text-neutral-500">Creates depth as layers move at different speeds</p>
              </div>
            </section>

            <section ref={parallaxTriggerRef} className="relative min-h-screen bg-neutral-950 overflow-hidden">
              <div ref={parallaxVideoRef} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25">
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/5 rounded-full blur-xl"
                        style={{
                          width: `${Math.random() * 250 + 150}px`,
                          height: `${Math.random() * 250 + 150}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 12 + 8}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div ref={parallaxContentRef} className="relative z-10 min-h-screen flex items-center justify-center opacity-0 translate-y-24 px-8">
                <div className="max-w-3xl mx-auto text-center text-white bg-neutral-900/80 backdrop-blur-xl p-12 rounded-3xl border border-neutral-800 shadow-2xl">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-violet-300">
                    Layered Content
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The viewport locks as this content card slides up and over the video background. 
                    The video moves at a different speed, creating a parallax depth effect as it fades into the distance.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* BLUR TRANSITION */}
        {activeExample === 'blur' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Blur Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Section pins as video blurs and content sharpens</p>
                <p className="text-lg text-neutral-500">Cinematic depth-of-field focus shift effect</p>
              </div>
            </section>

            <section ref={blurTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={blurVideoRef} className="absolute inset-0" style={{ filter: 'blur(0px)' }}>
                <div className="w-full h-full bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(18)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/8 rounded-full blur-2xl"
                        style={{
                          width: `${Math.random() * 350 + 150}px`,
                          height: `${Math.random() * 350 + 150}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 14 + 8}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div 
                ref={blurContentRef} 
                className="relative z-10 opacity-0 translate-y-12 px-8"
                style={{ filter: 'blur(8px)' }}
              >
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-fuchsia-300">
                    Sharp Focus
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    As you scroll past the video, the section pins and the video gradually blurs out while fading. 
                    Simultaneously, this content comes into sharp focus—like a camera shifting its depth of field.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ZOOM OUT TRANSITION */}
        {activeExample === 'zoom' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Zoom Out Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Video shrinks and fades as content zooms in</p>
                <p className="text-lg text-neutral-500">Dynamic scale transformation</p>
              </div>
            </section>

            <section ref={zoomTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={zoomVideoRef} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25">
                    {[...Array(22)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/6 rounded-full blur-xl"
                        style={{
                          width: `${Math.random() * 300 + 150}px`,
                          height: `${Math.random() * 300 + 150}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 13 + 9}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div ref={zoomContentRef} className="relative z-10 opacity-0 scale-150 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                    Zoomed In
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The video dramatically shrinks and fades into a rounded corner as the new content 
                    zooms in from large to normal size, creating a dynamic push-pull effect.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SPLIT REVEAL TRANSITION */}
        {activeExample === 'split' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Split Reveal Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Video splits down the middle to reveal content</p>
                <p className="text-lg text-neutral-500">Dramatic curtain-like parting effect</p>
              </div>
            </section>

            <section ref={splitTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div className="absolute inset-0 flex">
                <div ref={splitVideoLeftRef} className="w-1/2 overflow-hidden">
                  <div className="w-[200vw] h-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-25">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-white/7 rounded-full blur-2xl"
                          style={{
                            width: `${Math.random() * 320 + 140}px`,
                            height: `${Math.random() * 320 + 140}px`,
                            left: `${Math.random() * 50}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 12 + 8}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-white text-center z-10 ml-[50%]">
                      <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-2xl font-semibold">Video Content Here</p>
                    </div>
                  </div>
                </div>
                <div ref={splitVideoRightRef} className="w-1/2 overflow-hidden">
                  <div className="w-[200vw] h-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 -ml-[100vw]"></div>
                </div>
              </div>
              
              <div ref={splitContentRef} className="relative z-10 opacity-0 scale-95 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                    Split Apart
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The video splits vertically down the center, with both halves sliding away 
                    to opposite sides, dramatically revealing the content behind like opening doors.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 3D FLIP TRANSITION */}
        {activeExample === 'flip' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">3D Flip Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Video flips away in 3D space</p>
                <p className="text-lg text-neutral-500">Card-flip style transformation</p>
              </div>
            </section>

            <section ref={flipTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden" style={{ perspective: '1000px' }}>
              <div ref={flipVideoRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-full h-full bg-gradient-to-br from-rose-900 via-pink-900 to-fuchsia-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/7 rounded-full blur-xl"
                        style={{
                          width: `${Math.random() * 280 + 160}px`,
                          height: `${Math.random() * 280 + 160}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 11 + 9}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div 
                ref={flipContentRef} 
                className="relative z-10 opacity-0 px-8"
                style={{ transformStyle: 'preserve-3d', rotateY: '-90deg' }}
              >
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-pink-300">
                    Flipped Over
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The video rotates in 3D space like a flipping card, disappearing as it turns. 
                    The new content then flips into view from the opposite direction.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SLIDE AWAY TRANSITION */}
        {activeExample === 'slide' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Slide Away Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Video slides horizontally off screen</p>
                <p className="text-lg text-neutral-500">Simple and elegant lateral movement</p>
              </div>
            </section>

            <section ref={slideTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={slideVideoRef} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25">
                    {[...Array(17)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/6 rounded-full blur-2xl"
                        style={{
                          width: `${Math.random() * 310 + 150}px`,
                          height: `${Math.random() * 310 + 150}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 13 + 8}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>
              
              <div ref={slideContentRef} className="relative z-10 opacity-0 translate-x-24 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">
                    Slid Into View
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    The video smoothly slides off to the left while fading out. 
                    The new content slides in from the right, creating a clean lateral transition.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* GRADIENT WIPE TRANSITION */}
        {activeExample === 'gradient' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="text-center text-white px-8">
                <h2 className="text-5xl font-bold mb-4">Gradient Wipe Transition</h2>
                <p className="text-xl text-neutral-400 mb-2">Colorful gradient sweeps across the screen</p>
                <p className="text-lg text-neutral-500">Vibrant and modern transition effect</p>
              </div>
            </section>

            <section ref={gradientTriggerRef} className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
              <div ref={gradientVideoRef} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25">
                    {[...Array(19)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/7 rounded-full blur-xl"
                        style={{
                          width: `${Math.random() * 290 + 160}px`,
                          height: `${Math.random() * 290 + 160}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 12 + 9}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-2xl font-semibold">Video Content Here</p>
                  </div>
                </div>
              </div>

              <div 
                ref={gradientWipeRef}
                className="absolute inset-0 z-10 -translate-x-full"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b, #10b981)',
                }}
              />
              
              <div ref={gradientContentRef} className="relative z-20 opacity-0 scale-95 px-8">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h3 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-teal-300">
                    Gradient Reveal
                  </h3>
                  <p className="text-xl text-neutral-300 leading-relaxed">
                    A vibrant, colorful gradient sweeps across the screen from left to right, 
                    covering the video before revealing fresh content underneath with style.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900">
          <div className="text-center text-white px-8 max-w-4xl">
            <h3 className="text-5xl font-bold mb-8">9 Beautiful Transitions</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-purple-400">Fade & Scale</h4>
                <p className="text-sm text-neutral-400">Elegant fade with cinematic zoom</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-indigo-400">Wipe Reveal</h4>
                <p className="text-sm text-neutral-400">Dramatic film-editing wipe</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-blue-400">Parallax Depth</h4>
                <p className="text-sm text-neutral-400">3D layered movement</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-violet-400">Blur Transition</h4>
                <p className="text-sm text-neutral-400">Depth-of-field focus shift</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-cyan-400">Zoom Out</h4>
                <p className="text-sm text-neutral-400">Dynamic scale transformation</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-emerald-400">Split Reveal</h4>
                <p className="text-sm text-neutral-400">Opening doors effect</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-rose-400">3D Flip</h4>
                <p className="text-sm text-neutral-400">Card-flip rotation</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-amber-400">Slide Away</h4>
                <p className="text-sm text-neutral-400">Simple lateral movement</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-2 text-pink-400">Gradient Wipe</h4>
                <p className="text-sm text-neutral-400">Colorful sweep effect</p>
              </div>
            </div>
            <p className="text-xl text-neutral-400">
              All transitions use pinned scrolling for optimal user experience
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}