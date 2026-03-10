import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Calendar } from 'lucide-react';
import type { HeroData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: HeroData;
  onScrollToSection?: (sectionId: string) => void;
}

const Hero = ({ data, onScrollToSection }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const bullets = bulletsRef.current;
    const cta = ctaRef.current;
    const scanLine = scanLineRef.current;
    const content = contentRef.current;

    if (!section || !headline || !subheadline || !bullets || !cta || !scanLine || !content) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show content immediately without animations
      gsap.set([headline, subheadline, bullets, cta], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial load animation timeline
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Scan line entrance
      loadTl.fromTo(
        scanLine,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Headline reveal with character animation
      loadTl.fromTo(
        headline,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      );

      // Subheadline
      loadTl.fromTo(
        subheadline,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Bullets stagger
      const bulletItems = bullets.querySelectorAll('li');
      loadTl.fromTo(
        bulletItems,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA buttons
      loadTl.fromTo(
        cta.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.to([headline, subheadline, bullets, cta], {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
            });
          },
        },
      });

      // Scan line moves down
      scrollTl.fromTo(
        scanLine,
        { top: '20%' },
        { top: '80%', ease: 'none' },
        0
      );

      // Content fades and scales out
      scrollTl.fromTo(
        content,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.1, ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePrimaryCTA = () => {
    onScrollToSection?.('final-cta');
  };

  const handleSecondaryCTA = () => {
    onScrollToSection?.('final-cta');
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Scan line */}

      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 w-full h-[2px] bg-[#304f9f] scan-line-glow z-20 origin-left"
        style={{ top: '30%' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 leading-tight tracking-tighter"
          >
            <span className="text-white">PIXORA</span>
            <span className="text-[#023ebf]">NEST</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {data.subheadline}
          </p>

          {/* Proof bullets */}
          <ul
            ref={bulletsRef}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
          >
            {data.proofBullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
              >
                <span className="w-5 h-5 rounded-full bg-[#304f9f]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#304f9f]" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              onClick={handlePrimaryCTA}
              className="magnetic-button bg-[#304f9f] text-black hover:bg-[#b3e600] font-semibold text-base sm:text-lg px-8 py-6 rounded-full glow-accent transition-all duration-300 hover:scale-105"
            >
              {data.primaryCTA}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCTA}
              className="magnetic-button border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {data.secondaryCTA}
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-gray-500">{data.trustLine}</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#304f9f]/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#304f9f]/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#304f9f]/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#304f9f]/30 pointer-events-none" />
    </section>
  );
};

export default Hero;
