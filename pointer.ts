import type { PointerEvent } from 'react';

/** Writes the pointer position (and a gentle tilt) into CSS variables of the hovered element. */
export function pointerGlow(event: PointerEvent<HTMLElement>): void {
  if (event.pointerType === 'touch') return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
  el.style.setProperty('--ry', `${(x / rect.width - 0.5) * 5}deg`);
  el.style.setProperty('--rx', `${(0.5 - y / rect.height) * 5}deg`);
}

export function pointerReset(event: PointerEvent<HTMLElement>): void {
  const el = event.currentTarget;
  el.style.setProperty('--rx', '0deg');
  el.style.setProperty('--ry', '0deg');
}
