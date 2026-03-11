import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink, Youtube, Video } from 'lucide-react';
import type { VideoData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface VideoSectionProps {
  data: VideoData;
}

const VideoSection = ({ data }: VideoSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;

    if (!section || !container || !videoWrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        container.querySelector('.video-header'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video container expand animation
      gsap.fromTo(
        videoWrapper,
        { 
          clipPath: 'inset(40% 10% 40% 10%)',
          opacity: 0 
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoWrapper,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const getEmbedUrl = () => {
    if (data.type === 'youtube') {
      const videoId = data.url.split('/embed/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (data.type === 'vimeo') {
      const videoId = data.url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return data.url;
  };

  const getWatchUrl = () => {
    if (data.type === 'youtube') {
      const videoId = data.url.split('/embed/')[1]?.split('?')[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return data.url;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      id="video"
      className="relative w-full py-20 sm:py-32 overflow-hidden"
    >

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#304f9f]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#304f9f]/5 rounded-full blur-3xl" />

      <div ref={containerRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="video-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Video Link Banner */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWatchUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#304f9f]/50 rounded-full px-6 py-3 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium text-sm">Watch on YouTube</p>
              <p className="text-gray-500 text-xs">{getWatchUrl()}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#304f9f] transition-colors ml-2" />
          </a>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Video className="w-4 h-4" />
            <span>Video type: {data.type}</span>
          </div>
        </div>

        {/* Video container */}
        <div
          ref={videoWrapperRef}
          className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10"
        >
          {!isPlaying ? (
            // Thumbnail / Play button overlay
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#304f9f]/20 via-transparent to-[#304f9f]/10" />
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#12389a"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Play button */}
              <button
                onClick={handlePlay}
                className="relative z-10 group"
                aria-label="Play video"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#304f9f] flex items-center justify-center transition-all duration-300 group-hover:scale-110 glow-accent-strong">
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 text-black ml-1" fill="currentColor" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#304f9f]/30 animate-ping" />
              </button>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#304f9f]/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#304f9f]/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#304f9f]/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#304f9f]/50" />
            </div>
          ) : (
            // Video iframe
            <iframe
              src={getEmbedUrl()}
              title="Product demo video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video source info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-gray-500 text-sm">Source:</span>
            <code className="text-[#304f9f] text-sm font-mono">{data.url}</code>
          </div>
          <p className="text-gray-500 text-sm">
            Replace this URL in <code className="text-gray-400 bg-white/5 px-2 py-1 rounded">src/data/landingData.ts</code>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
