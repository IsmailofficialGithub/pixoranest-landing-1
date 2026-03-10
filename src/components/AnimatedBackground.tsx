import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gradient = gradientRef.current;
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;

    if (!gradient || !orb1 || !orb2 || !orb3) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Static positioning for reduced motion
      return;
    }

    // Continuous orb animations - slow, flowing movement
    const orbAnimations = [
      // Orb 1 - Large, slow movement
      gsap.to(orb1, {
        x: '30vw',
        y: '-20vh',
        duration: 25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
      gsap.to(orb1, {
        scale: 1.3,
        duration: 20,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),

      // Orb 2 - Medium, different timing
      gsap.to(orb2, {
        x: '-25vw',
        y: '25vh',
        duration: 30,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
      gsap.to(orb2, {
        scale: 0.8,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),

      // Orb 3 - Smaller, faster
      gsap.to(orb3, {
        x: '20vw',
        y: '15vh',
        duration: 22,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
      gsap.to(orb3, {
        scale: 1.5,
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
    ];

    // Gradient color shift animation
    gsap.to(gradient, {
      backgroundPosition: '100% 100%',
      duration: 15,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      orbAnimations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Animated gradient overlay */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(204, 255, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(204, 255, 0, 0.03) 0%, transparent 70%)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      />

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.12) 0%, rgba(204, 255, 0, 0.02) 40%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-20%',
          left: '-10%',
          willChange: 'transform',
        }}
      />

      <div
        ref={orb2Ref}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.02) 40%, transparent 70%)',
          filter: 'blur(50px)',
          top: '40%',
          right: '-15%',
          willChange: 'transform',
        }}
      />

      <div
        ref={orb3Ref}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.15) 0%, rgba(204, 255, 0, 0.03) 40%, transparent 70%)',
          filter: 'blur(40px)',
          bottom: '10%',
          left: '30%',
          willChange: 'transform',
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(204, 255, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 255, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Scan line effect - subtle horizontal line that moves */}
      <div 
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent"
        style={{
          animation: 'scanLine 8s linear infinite',
          top: '0%',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS for scan line animation */}
      <style>{`
        @keyframes scanLine {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
