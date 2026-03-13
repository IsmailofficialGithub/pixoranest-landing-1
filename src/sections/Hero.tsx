import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import type { HeroData } from '@/types';
import { WHATSAPP_LINK } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: HeroData;
}

const Hero = ({ data }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const bullets = bulletsRef.current;
    const cta = ctaRef.current;
    const scanLine = scanLineRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!section || !headline || !subheadline || !bullets || !cta || !scanLine || !content || !overlay) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headline, subheadline, bullets, cta], { opacity: 1, y: 0 });
      setShowOverlay(false);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Welcome Overlay Animation Sequence
      const welcomeTl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            y: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => setShowOverlay(false)
          });
        }
      });

      // Show overlay items
      welcomeTl.fromTo(
        overlay.querySelectorAll('.overlay-item'),
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
        '+=0.2'
      );

      // Hold for 2.5 seconds
      welcomeTl.to({}, { duration: 1.5 });

      // 2. Main Hero Content Entrance (Start after overlay begins to fade)
      const loadTl = gsap.timeline({ delay: 3.0 });

      // Scan line entrance
      loadTl.fromTo(
        scanLine,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Headline reveal
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
            gsap.to([headline, subheadline, bullets, cta], {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
            });
          },
        },
      });

      scrollTl.fromTo(
        scanLine,
        { top: '20%' },
        { top: '80%', ease: 'none' },
        0
      );

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
    window.open(WHATSAPP_LINK, '_blank');
  };

  const handleSecondaryCTA = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Welcome Overlay */}
      {showOverlay && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
          
          <div className="relative z-10 text-center px-6">
            <div className="overlay-item mb-10">
              <div className="inline-flex items-center justify-center p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#304f9f]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <img 
                  src="/logo.png" 
                  alt="Pixoranest Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              </div>
            </div>
            
            <h2 className="overlay-item text-4xl sm:text-6xl font-bold mb-4 tracking-tighter">
              <span className="text-white">WELCOME TO </span>
              <span className="text-[#304f9f]">THE FUTURE</span>
            </h2>
            
            <p className="overlay-item text-gray-400 text-lg sm:text-xl max-w-lg mx-auto mb-8 font-light">
              Designing your 24/7 intelligent business workspace...
            </p>
            
            <div className="overlay-item flex items-center justify-center gap-3 text-[#304f9f]/60">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium uppercase tracking-[0.3em] font-mono">Initializing System</span>
            </div>
          </div>
        </div>
      )}

      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 w-full h-[2px] bg-[#304f9f] scan-line-glow z-20 origin-left opacity-0"
        style={{ top: '30%' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          {/* Headline with Logo */}
          <h1
            ref={headlineRef}
            className="flex flex-col items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 leading-tight tracking-tighter"
          >
            <img 
              src="/logo.png" 
              alt="Pixoranest Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-6 object-contain"
            />
            <span>
              <span className="text-white">PIXORA</span>
              <span className="text-[#023ebf]">NEST</span>
            </span>
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
