import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Check, Play, ExternalLink } from 'lucide-react';
import type { Service } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  data: Service[];
  onScrollToSection?: (sectionId: string) => void;
}

// Professional SVG Icons for each service
const CallHandlingIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <rect x="12" y="8" width="24" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 36H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="30" r="2" fill="currentColor"/>
    <path d="M18 14H30M18 19H30M18 24H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <path d="M24 4C12.954 4 4 12.954 4 24C4 28.5 5.5 32.7 8 36.2L6 42L12.5 40C16 42.2 19.9 43.5 24 43.5C35.046 43.5 44 34.546 44 23.5C44 12.954 35.046 4 24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M18 21C18 21 20 25 24 25C28 25 30 21 30 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="19" r="1.5" fill="currentColor"/>
    <circle cx="30" cy="19" r="1.5" fill="currentColor"/>
  </svg>
);

const ReceptionistIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 42C8 32.059 15.163 24 24 24C32.837 24 40 32.059 40 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 14C20 14 22 16 24 16C26 16 28 14 28 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="21" cy="14" r="1" fill="currentColor"/>
    <circle cx="27" cy="14" r="1" fill="currentColor"/>
  </svg>
);

const VoiceSupportIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <rect x="16" y="4" width="16" height="28" rx="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20V24C32 30.627 26.627 36 20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 24H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 18L13.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 30L13.5 27.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 36V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 44H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SocialMediaIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 36C12 30 17 26 24 26C31 26 36 30 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 14V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="32" r="2.5" fill="currentColor"/>
    <path d="M32 18L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="38" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IntegrationIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
    <rect x="6" y="14" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="28" y="14" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="17" y="28" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 21H24V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="2" fill="currentColor"/>
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  'AI Call Handling': CallHandlingIcon,
  'WhatsApp Automation': WhatsAppIcon,
  'AI Receptionist': ReceptionistIcon,
  'Voice Support Agent': VoiceSupportIcon,
  'Social Media Automation': SocialMediaIcon,
  'Customer Support Automation': SupportIcon,
  'Custom Integrations & Workflow Automation': IntegrationIcon,
};

// Sample video URLs for services (can be customized in data)
const serviceVideos: Record<string, string> = {
  'service-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-2': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-3': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-4': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-5': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-6': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'service-7': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};

const ServiceRow = ({
  service,
  isExpanded,
  onToggle,
  onGetDemo,
}: {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
  onGetDemo: () => void;
}) => {
  const IconComponent = iconMap[service.name] || CallHandlingIcon;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        });
        setIsVideoPlaying(false);
      }
    }
  }, [isExpanded]);

  const videoUrl = serviceVideos[service.id];

  return (
    <div
      className={`service-row group border-b border-white/10 transition-all duration-500 ${
        isExpanded ? 'bg-gradient-to-b from-white/[0.05] to-white/[0.02]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {/* Main row content */}
      <div
        className="flex items-center justify-between py-6 px-4 sm:px-6 cursor-pointer"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
            isExpanded 
              ? 'bg-[#CCFF00] text-black' 
              : 'bg-[#CCFF00]/10 text-[#CCFF00] group-hover:bg-[#CCFF00]/20'
          }`}>
            <IconComponent />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
              isExpanded ? 'text-[#CCFF00]' : 'text-white group-hover:text-[#CCFF00]'
            }`}>
              {service.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1 hidden sm:block">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Right side: Price and actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-[#CCFF00] font-medium text-sm hidden lg:block">
            {service.price}
          </span>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onGetDemo();
            }}
            className="bg-[#CCFF00] text-black hover:bg-[#b3e600] font-medium text-sm px-4 py-2 rounded-full hidden sm:flex transition-transform duration-300 hover:scale-105"
          >
            Get Demo
          </Button>

          {/* Toggle arrow */}
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isExpanded 
                ? 'bg-[#CCFF00] border-[#CCFF00] rotate-180' 
                : 'border-white/20 group-hover:border-[#CCFF00]/50'
            }`}
          >
            <ChevronDown
              className={`w-5 h-5 transition-colors duration-300 ${
                isExpanded ? 'text-black' : 'text-white'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-4 sm:px-6 pb-10 pt-4">
          {/* Video Section (if available) */}
          {videoUrl && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#CCFF00]" />
                  Watch How It Works
                </h4>
                <a 
                  href={videoUrl.replace('/embed/', '/watch?v=').split('?')[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#CCFF00] hover:underline flex items-center gap-1"
                >
                  Open on YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10">
                {!isVideoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Thumbnail background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 via-transparent to-[#CCFF00]/5" />
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`grid-${service.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(204, 255, 0, 0.1)" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${service.id})`} />
                      </svg>
                    </div>
                    
                    {/* Play button */}
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative z-10 group"
                      aria-label="Play video"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#CCFF00]/30">
                        <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                      </div>
                    </button>
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#CCFF00]/50" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#CCFF00]/50" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#CCFF00]/50" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#CCFF00]/50" />
                  </div>
                ) : (
                  <iframe
                    src={`${videoUrl}?autoplay=1&rel=0`}
                    title={`${service.name} demo video`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column: Description and problem */}
            <div className="space-y-6">
              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#CCFF00] rounded-full" />
                  Overview
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-amber-400 rounded-full" />
                  Problem It Solves
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.problem}
                </p>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-emerald-400 rounded-full" />
                  How It Works
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.howItWorks}
                </p>
              </div>
            </div>

            {/* Right column: Features and implementation */}
            <div className="space-y-6">
              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#CCFF00] rounded-full" />
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#CCFF00]" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-400 rounded-full" />
                  Implementation
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.implementation}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#CCFF00]/10 to-[#CCFF00]/5 rounded-xl p-5 border border-[#CCFF00]/30">
                <h4 className="text-lg font-semibold text-[#CCFF00] mb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#CCFF00] rounded-full" />
                  Pricing
                </h4>
                <p className="text-gray-300">{service.pricingDetails}</p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
            <Button
              onClick={onGetDemo}
              className="bg-[#CCFF00] text-black hover:bg-[#b3e600] font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Get Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onGetDemo}
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = ({ data, onScrollToSection }: ServicesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const list = listRef.current;

    if (!section || !header || !list) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([header, list.children], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Service rows stagger animation
      const rows = list.querySelectorAll('.service-row');
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleGetDemo = () => {
    onScrollToSection?.('final-cta');
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-20 sm:py-32 overflow-hidden"
    >

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#CCFF00]">Services</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI automation solutions designed to transform every aspect of your customer engagement.
          </p>
        </div>

        {/* Services list */}
        <div
          ref={listRef}
          className="border-t border-white/10 rounded-2xl overflow-hidden"
        >
          {data.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              isExpanded={expandedId === service.id}
              onToggle={() => handleToggle(service.id)}
              onGetDemo={handleGetDemo}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Not sure which service is right for you?
          </p>
          <Button
            onClick={handleGetDemo}
            variant="outline"
            className="border-2 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            Talk to a Specialist
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
