import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Sections
import Hero from '@/sections/Hero';
import CompanyIntro from '@/sections/CompanyIntro';
import Stats from '@/sections/Stats';
import Services from '@/sections/Services';
import VideoSection from '@/sections/VideoSection';
import Testimonials from '@/sections/Testimonials';
import FinalCTA from '@/sections/FinalCTA';

// Components
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';

// Data
import { landingData } from '@/data/landingData';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Error Boundary Component
const ErrorFallback = ({ sectionName }: { sectionName: string }) => (
  <div className="min-h-[50vh] flex items-center justify-center bg-[#050505] border border-white/10 rounded-2xl m-4">
    <div className="text-center p-8">
      <p className="text-gray-400 mb-2">Unable to load {sectionName}</p>
      <p className="text-gray-600 text-sm">Please refresh the page to try again</p>
    </div>
  </div>
);

// Safe section wrapper with error handling
const SafeSection = ({ 
  children, 
  sectionName 
}: { 
  children: React.ReactNode; 
  sectionName: string;
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <ErrorFallback sectionName={sectionName} />;
  }

  return <>{children}</>;
};

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize smooth scrolling
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      setIsLoaded(true);

      return () => {
        lenis.destroy();
      };
    } catch (error) {
      console.warn('Lenis initialization failed, falling back to native scroll:', error);
      setIsLoaded(true);
    }
  }, []);

  // Scroll to section handler
  const scrollToSection = useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            offset: 0,
            duration: 1.5,
          });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.warn('Scroll failed:', error);
      // Fallback to native scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      try {
        const pinned = ScrollTrigger.getAll()
          .filter((st) => st.vars.pin)
          .sort((a, b) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        
        if (!maxScroll || pinned.length === 0) return;

        const pinnedRanges = pinned.map((st) => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value) => {
              // Check if within any pinned range (with small buffer)
              const inPinned = pinnedRanges.some(
                (r) => value >= r.start - 0.02 && value <= r.end + 0.02
              );
              
              if (!inPinned) return value; // Flowing section: free scroll

              // Find nearest pinned center
              const target = pinnedRanges.reduce(
                (closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );
              
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      } catch (error) {
        console.warn('Scroll snap initialization failed:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded]);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      try {
        ScrollTrigger.getAll().forEach(st => st.kill());
      } catch (error) {
        console.warn('ScrollTrigger cleanup failed:', error);
      }
    };
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <AnimatedBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main ref={mainRef} className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <SafeSection sectionName="Hero">
          <Hero 
            data={landingData.hero} 
            onScrollToSection={scrollToSection}
          />
        </SafeSection>

        {/* Company Introduction */}
        <SafeSection sectionName="Company Introduction">
          <CompanyIntro data={landingData.companyIntro} />
        </SafeSection>

        {/* Stats Section */}
        <SafeSection sectionName="Stats">
          <Stats data={landingData.stats} />
        </SafeSection>

        {/* Services Section */}
        <SafeSection sectionName="Services">
          <Services 
            data={landingData.services} 
            onScrollToSection={scrollToSection}
          />
        </SafeSection>

        {/* Video Section */}
        <SafeSection sectionName="Video">
          <VideoSection data={landingData.video} />
        </SafeSection>

        {/* Testimonials Section */}
        <SafeSection sectionName="Testimonials">
          <Testimonials data={landingData.testimonials} />
        </SafeSection>

        {/* Final CTA Section */}
        <SafeSection sectionName="Contact Form">
          <FinalCTA data={landingData.finalCTA} />
        </SafeSection>
      </main>
    </>
  );
}

export default App;
