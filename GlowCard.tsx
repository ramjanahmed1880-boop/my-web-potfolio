import type { ReactNode } from 'react';
import { pointerGlow, pointerReset } from '../utils/pointer';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/** Glass card with a pointer-following glow and a gentle tilt on hover (fine pointers only). */
export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={['glow-card', 'glass', className].filter(Boolean).join(' ')}
      onPointerMove={pointerGlow}
      onPointerLeave={pointerReset}
    >
      {children}
    </div>
  );
}
