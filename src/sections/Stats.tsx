import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Stat } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  data: Stat[];
}

const Stats = ({ data }: StatsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;

    if (!section || !stats) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(stats.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const statCards = stats.querySelectorAll('.stat-card');

      // Stagger animation for stat cards
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation for stat values
      statCards.forEach((card) => {
        const valueEl = card.querySelector('.stat-value');
        if (!valueEl) return;

        const finalValue = valueEl.getAttribute('data-value') || '';
        const numericPart = finalValue.match(/[\d.]+/)?.[0] || '';
        const suffix = finalValue.replace(numericPart, '');
        const targetNum = parseFloat(numericPart);

        if (isNaN(targetNum)) return;

        const counter = { value: 0 };

        gsap.to(counter, {
          value: targetNum,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (Number.isInteger(targetNum)) {
              valueEl.textContent = Math.round(counter.value) + suffix;
            } else {
              valueEl.textContent = counter.value.toFixed(0) + suffix;
            }
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative w-full py-20 sm:py-32 overflow-hidden"
    >

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#304f9f]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#304f9f]/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Results That <span className="text-[#304f9f]">Speak</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real outcomes from businesses that have transformed their operations with our AI automation.
          </p>
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.map((stat) => (
            <div
              key={stat.id}
              className="stat-card group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#304f9f]/50 transition-all duration-300 hover:bg-white/10 text-center"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#304f9f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Value */}
              <div className="relative">
                <span
                  className="stat-value text-5xl sm:text-6xl font-bold text-[#304f9f] block mb-2"
                  data-value={stat.value}
                >
                  0
                </span>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#304f9f] group-hover:w-1/2 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
