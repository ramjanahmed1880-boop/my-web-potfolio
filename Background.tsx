import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Animated backdrop: drifting aurora glows, a faint grid, a pointer spotlight and a
 * canvas of floating, connected particles. Fewer particles on small screens, paused
 * while the tab is hidden, and a single static frame when reduced motion is requested.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spot = spotRef.current;
    if (!canvas || !spot) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };
    let spotRaf = 0;
    let spotX = window.innerWidth / 2;
    let spotY = window.innerHeight / 3;

    function build(): void {
      const area = width * height;
      const count = Math.round(Math.min(width < 700 ? 34 : 72, Math.max(18, area / 24000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.5,
      }));
    }

    function resize(rebuild: boolean): void {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (rebuild || particles.length === 0) build();
    }

    function draw(step: boolean): void {
      ctx.clearRect(0, 0, width, height);
      const link = width < 700 ? 90 : 130;
      const pull = 160;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (step) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 190, 255, 0.75)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < link) {
            ctx.strokeStyle = `rgba(60, 150, 255, ${(1 - dist / link) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pd = Math.hypot(pdx, pdy);
        if (pd < pull) {
          ctx.strokeStyle = `rgba(80, 190, 255, ${(1 - pd / pull) * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    function loop(): void {
      draw(true);
      raf = window.requestAnimationFrame(loop);
    }

    function start(): void {
      if (running || reducedQuery.matches || document.hidden) return;
      running = true;
      raf = window.requestAnimationFrame(loop);
    }

    function stop(): void {
      running = false;
      window.cancelAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = () => {
      if (reducedQuery.matches) {
        stop();
        draw(false);
      } else {
        start();
      }
    };

    const paintSpot = () => {
      spotRaf = 0;
      spot.style.transform = `translate3d(${spotX - 320}px, ${spotY - 320}px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (finePointer.matches && !reducedQuery.matches) {
        spotX = event.clientX;
        spotY = event.clientY;
        if (!spotRaf) spotRaf = window.requestAnimationFrame(paintSpot);
      }
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let resizeTimer = 0;
    let lastWidth = window.innerWidth;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const widthChanged = window.innerWidth !== lastWidth;
        lastWidth = window.innerWidth;
        resize(widthChanged);
        if (reducedQuery.matches) draw(false);
      }, 150);
    };

    resize(true);
    paintSpot();
    if (reducedQuery.matches) draw(false);
    else start();

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    reducedQuery.addEventListener('change', onMotionChange);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(spotRaf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__aurora bg__aurora--a" />
      <div className="bg__aurora bg__aurora--b" />
      <div className="bg__grid" />
      <div className="bg__spot" ref={spotRef} />
      <canvas className="bg__canvas" ref={canvasRef} />
    </div>
  );
}
