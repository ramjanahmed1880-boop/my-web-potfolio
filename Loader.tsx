import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface LoaderProps {
  onDone: () => void;
}

/** Full-screen intro animation. Waits for fonts (max 2.5 s), then fades away. */
export function Loader({ onDone }: LoaderProps) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'show' | 'leave' | 'gone'>('show');
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-loading');
    return () => root.classList.remove('is-loading');
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const started = performance.now();
    const minimum = reduced ? 250 : 1300;

    const fontsReady: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, 2500)));

    Promise.race([fontsReady, cap]).then(() => {
      if (cancelled) return;
      const wait = Math.max(0, minimum - (performance.now() - started));
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setPhase('leave');
        }, wait),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reduced]);

  useEffect(() => {
    if (phase !== 'leave') return;
    document.documentElement.classList.remove('is-loading');
    doneRef.current();
    const id = window.setTimeout(() => setPhase('gone'), reduced ? 0 : 650);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  if (phase === 'gone') return null;

  return (
    <div className={`loader ${phase === 'leave' ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="loader__core">
        <div className="loader__ring" aria-hidden="true" />
        <div className="loader__ring loader__ring--inner" aria-hidden="true" />
        <span className="loader__mark" aria-hidden="true">
          RA
        </span>
      </div>
      <p className="loader__name">RAMJAN AHMED</p>
      <div className="loader__bar" aria-hidden="true">
        <span />
      </div>
      <span className="visually-hidden">Loading website</span>
    </div>
  );
}
