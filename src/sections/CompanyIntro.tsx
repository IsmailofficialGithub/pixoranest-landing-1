import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target } from 'lucide-react';
import type { CompanyIntroData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface CompanyIntroProps {
  data: CompanyIntroData;
}

// Professional SVG Icons
const BuildingIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
    <path d="M8 42V20L24 8L40 20V42H8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 42V30H30V42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="4" r="2" fill="currentColor"/>
  </svg>
);

const ProblemIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 14V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="32" r="2.5" fill="currentColor"/>
    <path d="M10 10L14 14M38 10L34 14M10 38L14 34M38 38L34 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GrowthIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
    <path d="M6 42H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 36L18 24L26 32L42 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="42" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M36 14H42V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StepIcon1 = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 28L42 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="4" fill="currentColor"/>
  </svg>
);

const StepIcon2 = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 24H20M24 24H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="18" r="2" fill="currentColor"/>
  </svg>
);

const StepIcon3 = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect x="6" y="16" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="26" y="16" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 24H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 28V20M10 24H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M34 28V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const StepIcon4 = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <path d="M6 36H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 36V28C8 28 14 20 24 20C34 20 40 28 40 28V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 8V16M20 12H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const stepIcons = [StepIcon1, StepIcon2, StepIcon3, StepIcon4];

const CompanyIntro = ({ data }: CompanyIntroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const description = descriptionRef.current;
    const cards = cardsRef.current;
    const steps = stepsRef.current;
    const target = targetRef.current;

    if (!section || !headline || !description || !cards || !steps || !target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headline, description, cards.children, steps.children, target], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        description,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: description,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const infoCards = cards.querySelectorAll('.info-card');
      gsap.fromTo(
        infoCards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps stagger animation
      const stepCards = steps.querySelectorAll('.step-card');
      gsap.fromTo(
        stepCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: steps,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Target graphic rotation
      gsap.to(target.querySelector('.target-ring'), {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(target.querySelector('.target-ring-inner'), {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="company-intro"
      className="relative min-h-screen w-full py-20 sm:py-32 overflow-hidden"
    >

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Text content */}
          <div>
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {data.headline.split('with')[0]} with{' '}
              <span className="text-[#304f9f]">{data.headline.split('with')[1]}</span>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg sm:text-xl text-gray-400 leading-relaxed"
            >
              {data.description}
            </p>
          </div>

          {/* Right: Target graphic */}
          <div ref={targetRef} className="flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Outer rotating ring */}
              <div className="target-ring absolute inset-0 rounded-full border-2 border-dashed border-[#304f9f]/30" />
              
              {/* Inner rotating ring */}
              <div className="target-ring-inner absolute inset-8 rounded-full border border-[#304f9f]/20" />
              
              {/* Center target */}
              <div className="absolute inset-16 rounded-full bg-[#304f9f]/10 flex items-center justify-center">
                <Target className="w-16 h-16 text-[#304f9f]" />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#304f9f] rounded-full -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#304f9f] rounded-full -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-[#304f9f] rounded-full -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 w-2 h-2 bg-[#304f9f] rounded-full -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Who it's for / Problems / Improvements - Redesigned Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-20">
          {/* Target Audience */}
          <div className="info-card group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#304f9f]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)] overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#304f9f]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon container */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#304f9f]/20 to-[#304f9f]/5 flex items-center justify-center text-[#304f9f] group-hover:scale-110 transition-transform duration-500 border border-[#304f9f]/20">
                <BuildingIcon />
              </div>
              {/* Decorative line */}
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#304f9f] to-transparent" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#304f9f] transition-colors duration-300">
              Who It&apos;s For
            </h3>
            
            <ul className="space-y-3">
              {data.targetAudience.map((item, index) => (
                <li key={index} className="text-gray-400 text-sm flex items-center gap-3 group/item">
                  <span className="w-5 h-5 rounded-md bg-[#304f9f]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#304f9f]/20 transition-colors">
                    <span className="w-1.5 h-1.5 bg-[#304f9f] rounded-full" />
                  </span>
                  <span className="group-hover/item:text-gray-300 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problems Solved */}
          <div className="info-card group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon container */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500 border border-amber-500/20">
                <ProblemIcon />
              </div>
              {/* Decorative line */}
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
              Problems We Solve
            </h3>
            
            <ul className="space-y-3">
              {data.problemsSolved.map((item, index) => (
                <li key={index} className="text-gray-400 text-sm flex items-center gap-3 group/item">
                  <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </span>
                  <span className="group-hover/item:text-gray-300 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="info-card group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon container */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
                <GrowthIcon />
              </div>
              {/* Decorative line */}
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
              What You Gain
            </h3>
            
            <ul className="space-y-3">
              {data.improvements.map((item, index) => (
                <li key={index} className="text-gray-400 text-sm flex items-center gap-3 group/item">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/20 transition-colors">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  </span>
                  <span className="group-hover/item:text-gray-300 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            How It <span className="text-[#304f9f]">Works</span>
          </h3>

          <div
            ref={stepsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {data.steps.map((step, index) => {
              const StepIcon = stepIcons[index] || StepIcon1;
              return (
                <div
                  key={step.id}
                  className="step-card group relative bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#304f9f]/50 transition-all duration-500 hover:bg-white/[0.08]"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-[#304f9f] to-[#304f4f] rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-[#304f9f]/20">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#304f9f]/10 to-transparent flex items-center justify-center mb-4 text-[#304f9f] group-hover:scale-110 transition-transform duration-500 border border-[#304f9f]/10">
                    <StepIcon />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#304f9f] transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector line (except last) */}
                  {index < data.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-[#304f9f]/50 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
