import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollFadeIn(options = {}) {
  const ref = useRef(null);
  const { y = 40, duration = 0.8, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, duration, delay]);

  return ref;
}

export function useStaggerChildren(options = {}) {
  const ref = useRef(null);
  const { stagger = 0.1, y = 30, duration = 0.6 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [stagger, y, duration]);

  return ref;
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed]);

  return ref;
}

export function useTextReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    el.textContent = '';
    el.style.visibility = 'visible';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      el.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.03,
      stagger: 0.03,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
