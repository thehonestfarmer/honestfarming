'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineStop {
  icon: string;
  phase: string;
  title: string;
  description: string;
  fullStory: string;
}

const timelineData: TimelineStop[] = [
  {
    icon: "🎖️",
    phase: "Air Force",
    title: "Discipline",
    description: "Learned discipline and systems thinking in military service",
    fullStory: "The Air Force Academy taught me discipline and systematic thinking. Competing in the national debate circuit during this time sharpened my ability to construct logical arguments and work through complex problems systematically."
  },
  {
    icon: "🎓",
    phase: "Public Service",
    title: "Foundation",
    description: "Teaching and consulting before tech",
    fullStory: "After university, I wanted to serve communities directly. I taught middle school in Oakland through Teach For America, where I saw firsthand how much human potential gets wasted by broken systems.\n\nThen at Accenture, I learned how to diagnose and fix organizational problems at scale. Both experiences showed me the gap between what people are capable of and what current systems allow them to achieve."
  },
  {
    icon: "🏢",
    phase: "Silicon Valley", 
    title: "Speed and Scale",
    description: "Worked at tech companies for 8 years",
    fullStory: "I helped build a startup that was acquired by Time Magazine and launched one of the first NFT marketplaces from 0-1 with Crunchyroll. \n\n At Uber and Coinbase, I learned to build systems that scale to millions of users. Silicon Valley taught me how to think big, move fast, and create technology that can handle massive growth while maintaining reliability."
  },
  {
    icon: "📚",
    phase: "Seminary",
    title: "Truth", 
    description: "Studying fundamental reasoning through M.Div in Apologetics",
    fullStory: "Seminary is teaching me fundamental reasoning through my M.Div in Apologetics. This academic pursuit has deepened my understanding of truth, logic, and the philosophical foundations that underpin genuine human cooperation."
  },
  {
    icon: "🌾",
    phase: "Japan",
    title: "Growth",
    description: "Connected with craftsmanship and real-world growth in rural Japan", 
    fullStory: "Rural Japan taught me something different - how to physically connect with growth and the real world. I came here fascinated by their culture of craftsmanship and the beauty of their countryside."
  }
];

export default function InteractiveTimeline() {
  const [activeStop, setActiveStop] = useState<number>(4); // Default to "Japan"
  const [visibleStops, setVisibleStops] = useState<boolean[]>(new Array(5).fill(false));
  const [lineProgress, setLineProgress] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false); // Prevent re-animation
  const timelineRef = useRef<HTMLElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let cleanup: (() => void) | null = null;
    
    if (!isMobile) {
      // Desktop: Sequential reveal when timeline section comes into view
      const timelineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true); // Prevent re-animation
              
              // Desktop: Sequential reveal with staggered timing
              timelineData.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleStops(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                  
                  // Update line progress as each stop appears
                  setTimeout(() => {
                    setLineProgress(((index + 1) / timelineData.length) * 100);
                  }, 100); // Slight delay to smooth the line animation
                }, index * 400); // 400ms delay between each stop
              });
            }
          });
        },
        { 
          threshold: 0.2,
          rootMargin: '-10% 0px -10% 0px'
        }
      );

      if (timelineRef.current && !hasAnimated) {
        timelineObserver.observe(timelineRef.current);
      }

      cleanup = () => timelineObserver.disconnect();
      
    } else {
      // Mobile: Individual scroll-based reveals for each stop
      const stopObserver = new IntersectionObserver(
        (stopEntries) => {
          stopEntries.forEach((stopEntry) => {
            if (stopEntry.isIntersecting) {
              const stopIndex = parseInt(stopEntry.target.getAttribute('data-stop-index') || '0');
              
              setVisibleStops(prev => {
                const newVisible = [...prev];
                newVisible[stopIndex] = true;
                return newVisible;
              });
              
              // Update line progress for mobile based on highest visible index
              setLineProgress(((stopIndex + 1) / timelineData.length) * 100);
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      // Observe each stop individually on mobile
      stopRefs.current.forEach((ref) => {
        if (ref) stopObserver.observe(ref);
      });

      cleanup = () => stopObserver.disconnect();
    }

    return cleanup || (() => {});
  }, [hasAnimated]); // Add hasAnimated to prevent desktop re-runs

  const handleStopClick = (index: number) => {
    setActiveStop(index);
  };

  const handleStopHover = () => {
    // Optional: Could show tooltip or preview on hover
  };

  const handlePrevious = () => {
    setActiveStop(prev => prev > 0 ? prev - 1 : timelineData.length - 1);
  };

  const handleNext = () => {
    setActiveStop(prev => prev < timelineData.length - 1 ? prev + 1 : 0);
  };

  return (
    <>
      <style jsx>{`
        @keyframes bounce-once {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-15px,0);
          }
          70% {
            transform: translate3d(0,-7px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        
        @keyframes line-draw {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-out;
        }
        
        .animate-line-draw {
          animation: line-draw 2s ease-out forwards;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
      
      <section 
        id="founder-story" 
        className="py-20 bg-stone-200 dark:bg-stone-800 transition-colors duration-300"
        ref={timelineRef}
      >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300 leading-tight mb-4">
            I Left Silicon Valley to Start a Farm
          </h3>
          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 transition-colors duration-300 max-w-2xl mx-auto">
            It&apos;s not much, but it&apos;s honest work.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Timeline - Horizontal */}
          <div className="hidden md:block">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-300 dark:bg-stone-600 transform -translate-y-1/2">
              <div 
                className="h-full bg-green-600 dark:bg-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${lineProgress}%` }}
              />
              {/* Animated progress dot */}
              {lineProgress > 0 && lineProgress < 100 && (
                <div 
                  className="absolute top-1/2 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full transform -translate-y-1/2 -translate-x-1/2 opacity-80"
                  style={{ left: `${lineProgress}%` }}
                />
              )}
            </div>

            {/* Timeline Stops */}
            <div className="relative flex justify-between items-center py-8">
              {timelineData.map((stop, index) => (
                <div
                  key={index}
                  ref={el => {
                    if (el) {
                      stopRefs.current[index] = el;
                    }
                  }}
                  data-stop-index={index}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    visibleStops[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  onClick={() => handleStopClick(index)}
                  onMouseEnter={() => handleStopHover()}
                  role="button"
                  aria-label={`Timeline stop: ${stop.phase} - ${stop.title}`}
                  tabIndex={0}
                >
                  {/* Stop Circle */}
                  <div className={`
                    w-16 h-16 rounded-full border-4 border-stone-800 dark:border-stone-600 
                    bg-white dark:bg-stone-700 flex items-center justify-center text-2xl
                    transition-all duration-500 hover:scale-110 hover:shadow-lg
                    ${activeStop === index ? 'ring-4 ring-green-500 ring-opacity-50 scale-110' : ''}
                    ${visibleStops[index] ? 'animate-bounce-once' : ''}
                  `}
                  style={{
                    imageRendering: 'pixelated',
                  }}
                  >
                    <span className="select-none">{stop.icon}</span>
                  </div>

                  {/* Phase Label */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-sm font-bold text-stone-800 dark:text-stone-200 whitespace-nowrap">
                      {stop.phase}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {stop.title}
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  <div className={`
                    absolute -top-16 left-1/2 transform -translate-x-1/2 
                    bg-stone-800 dark:bg-stone-700 text-white text-xs py-2 px-3 rounded
                    opacity-0 pointer-events-none transition-opacity duration-200
                    hover:opacity-100 whitespace-nowrap max-w-48 text-center
                  `}>
                    {stop.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 w-1 bg-stone-300 dark:bg-stone-600 h-full">
                <div 
                  className="w-full bg-green-600 dark:bg-green-500 transition-all duration-1000 ease-out"
                  style={{ height: `${lineProgress}%` }}
                />
                {/* Mobile progress indicator */}
                {lineProgress > 0 && lineProgress < 100 && (
                  <div 
                    className="absolute left-1/2 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80"
                    style={{ top: `${lineProgress}%` }}
                  />
                )}
              </div>

              {/* Mobile Stops */}
              <div className="space-y-12">
                {timelineData.map((stop, index) => (
                  <div
                    key={index}
                    ref={el => {
                    if (el) {
                      stopRefs.current[index] = el;
                    }
                  }}
                    data-stop-index={index}
                    className={`relative flex items-start cursor-pointer transition-all duration-500 ${
                      visibleStops[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    onClick={() => handleStopClick(index)}
                    role="button"
                    aria-label={`Timeline stop: ${stop.phase} - ${stop.title}`}
                    tabIndex={0}
                  >
                    {/* Stop Circle */}
                    <div className={`
                      flex-shrink-0 w-16 h-16 rounded-full border-4 border-stone-800 dark:border-stone-600
                      bg-white dark:bg-stone-700 flex items-center justify-center text-2xl z-10
                      transition-all duration-300 hover:scale-110 hover:shadow-lg
                      ${activeStop === index ? 'ring-4 ring-green-500 ring-opacity-50 scale-110' : ''}
                    `}
                    style={{
                      imageRendering: 'pixelated',
                    }}
                    >
                      <span className="select-none">{stop.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200">
                        {stop.phase}: {stop.title}
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        {stop.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-stone-700 border-4 border-stone-800 dark:border-stone-600 shadow-lg p-8 transition-all duration-300 relative">
            {/* Navigation Arrows */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="p-2 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 dark:hover:bg-stone-500 border-2 border-stone-800 dark:border-stone-600 transition-all duration-200 hover:scale-105"
                aria-label="Previous timeline stop"
              >
                <ChevronLeft size={20} className="text-stone-800 dark:text-stone-200" />
              </button>
              <span className="text-sm text-stone-600 dark:text-stone-400 font-mono min-w-[3rem] text-center">
                {activeStop + 1} / {timelineData.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 dark:hover:bg-stone-500 border-2 border-stone-800 dark:border-stone-600 transition-all duration-200 hover:scale-105"
                aria-label="Next timeline stop"
              >
                <ChevronRight size={20} className="text-stone-800 dark:text-stone-200" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden mb-6">
              {/* Previous/Next buttons */}
              <div className="flex justify-center gap-3 mb-3">
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 dark:hover:bg-stone-500 border-2 border-stone-800 dark:border-stone-600 transition-all duration-200 text-sm font-semibold"
                  aria-label="Previous timeline stop"
                >
                  <ChevronLeft size={16} className="text-stone-800 dark:text-stone-200" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 dark:hover:bg-stone-500 border-2 border-stone-800 dark:border-stone-600 transition-all duration-200 text-sm font-semibold"
                  aria-label="Next timeline stop"
                >
                  Next
                  <ChevronRight size={16} className="text-stone-800 dark:text-stone-200" />
                </button>
              </div>
              {/* Progress indicator below buttons */}
              <div className="flex justify-center">
                <span className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 font-mono">
                  {activeStop + 1} / {timelineData.length}
                </span>
              </div>
            </div>

            {/* Header Section */}
            <div className="text-center mb-8 sm:pr-32">
              <div className="text-4xl mb-4" 
                style={{
                  imageRendering: 'pixelated',
                }}
              >
                {timelineData[activeStop].icon}
              </div>
              <h4 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                {timelineData[activeStop].phase}: {timelineData[activeStop].title}
              </h4>
              <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
                {timelineData[activeStop].description}
              </p>
            </div>
            
            {activeStop === 1 ? (
              // Public Service section
              <div className="text-left space-y-6">
                <div className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                  <p className="mb-4">
                    I wanted to serve communities directly, so I taught middle school in Oakland through Teach For America. I experienced firsthand how much human potential gets wasted by broken systems.
                  </p>
                  <p>
                    Then at Accenture, I learned how to diagnose and fix organizational problems at scale. Both experiences showed me the gap between what people are capable of and what current systems allow them to achieve. 
                  </p>
                </div>
              </div>
            ) : activeStop === 2 ? (
              // Silicon Valley section with links
              <div className="text-left space-y-6">
                <div className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                  <p className="mb-4">
                    I helped build a startup that was{' '}
                    <a 
                      href="https://www.axios.com/2022/08/30/time-first-acquisition-benioffs-brandcast"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 dark:text-green-400 underline decoration-2 underline-offset-2 hover:text-green-800 dark:hover:text-green-300 hover:decoration-green-800 dark:hover:decoration-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-stone-700 transition-all duration-200 font-medium"
                    >
                      acquired by Time Magazine
                    </a>
                    {' '}and launched one of the{' '}
                    <a 
                      href="https://www.crunchyroll.com/news/latest/2019/8/28/crunchyrolls-latest-app-crunchyroll-digital-drops-is-now-live"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 dark:text-green-400 underline decoration-2 underline-offset-2 hover:text-green-800 dark:hover:text-green-300 hover:decoration-green-800 dark:hover:decoration-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-stone-700 transition-all duration-200 font-medium"
                    >
                      first NFT marketplaces
                    </a>
                    {' '}from 0-1 with Crunchyroll.
                  </p>
                  <p >
                    At Uber and Coinbase, I learned to build systems that scale to millions of users. Silicon Valley taught me how to think big, move fast, and create technology that can handle massive growth while maintaining reliability.
                  </p>
                </div>
              </div>
            ) : (
              // Standard formatting for other timeline stops
              <div className="text-left space-y-6">
                <div className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                  <p>{timelineData[activeStop].fullStory}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}