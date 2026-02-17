import { useEffect } from 'react';

const COLORS = ['var(--primary)', 'var(--accent)'];

function spawnBubbles(el) {
  const rect = el.getBoundingClientRect();
  const count = 8 + Math.floor(Math.random() * 5);

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const size = 4 + Math.random() * 4;
    const x = Math.random() * rect.width;
    const dx = (Math.random() - 0.5) * 24;
    const dy = 16 + Math.random() * 20;
    const delay = Math.random() * 0.15;
    const duration = 0.5 + Math.random() * 0.3;

    dot.style.cssText = `
      position: fixed;
      left: ${rect.left + x}px;
      top: ${rect.bottom}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${COLORS[i % COLORS.length]};
      opacity: 0.8;
      pointer-events: none;
      z-index: 9999;
      --bubble-dx: ${dx}px;
      --bubble-dy: ${dy}px;
      animation: bubble-particle ${duration}s ease-out ${delay}s forwards;
    `;

    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), (duration + delay) * 1000 + 50);
  }
}

const COOLDOWN = new WeakMap();

export function useBubbleHover() {
  useEffect(() => {
    function handleMouseOver(e) {
      const el = e.target.closest('.bubble-hover');
      if (!el) return;

      const now = Date.now();
      const last = COOLDOWN.get(el) || 0;
      if (now - last < 600) return;
      COOLDOWN.set(el, now);

      spawnBubbles(el);
    }

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);
}
