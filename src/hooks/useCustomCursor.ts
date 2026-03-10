import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const moveCursor = (e: MouseEvent) => {
      if (prefersReducedMotion) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      } else {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      cursor.classList.add('hover');
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      cursor.classList.remove('hover');
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      window.removeEventListener('resize', checkTouch);
    };
  }, [isTouchDevice]);

  return { cursorRef, isHovering, isTouchDevice };
};

export default useCustomCursor;
