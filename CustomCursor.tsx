import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], summary, select, label, .glow-card';
const TEXT_FIELDS = 'input, textarea';

/**
 * Custom dot + ring cursor. Only used on devices with a precise hover pointer (mouse / trackpad);
 * touch devices and keyboards keep the system behaviour. The native cursor is restored for text fields.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    root.classList.add('has-custom-cursor');

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let seen = false;

    const render = () => {
      const ease = reduced.matches ? 1 : 0.2;
      rx += (x - rx) * ease;
      ry += (y - ry) * ease;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) {
        raf = window.requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        root.classList.add('cursor-visible');
      }
      const target = event.target instanceof Element ? event.target : null;
      root.classList.toggle('cursor-hot', Boolean(target?.closest(INTERACTIVE)));
      root.classList.toggle('cursor-text', Boolean(target?.closest(TEXT_FIELDS)));
      if (!raf) raf = window.requestAnimationFrame(render);
    };

    const onLeave = () => root.classList.remove('cursor-visible');
    const onEnter = () => {
      if (seen) root.classList.add('cursor-visible');
    };
    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hot', 'cursor-text', 'cursor-down');
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
