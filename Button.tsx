import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon';
import { pointerGlow } from '../utils/pointer';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  icon?: IconName;
  iconAfter?: IconName;
  /** Internal route (React Router). */
  to?: string;
  /** External URL or mailto: link. */
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

/** One button component for links, external links and real buttons. */
export function Button({
  children,
  variant = 'primary',
  icon,
  iconAfter,
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
      {iconAfter ? <Icon name={iconAfter} size={18} /> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onPointerMove={pointerGlow} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        onPointerMove={pointerGlow}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onPointerMove={pointerGlow}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
