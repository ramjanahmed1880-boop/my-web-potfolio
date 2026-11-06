import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from './Icon';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface ModalProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog. Closes with the close button, a click on the dark backdrop, or the Escape key.
 * Traps keyboard focus, locks page scrolling and restores focus to the opener when it closes.
 * Render it only while it should be open: {active && <Modal ... />}.
 */
export function Modal({ title, subtitle, icon, onClose, children, footer }: ModalProps) {
  const reduced = usePrefersReducedMotion();
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const requestClose = useCallback(() => {
    if (closing) return;
    if (reduced) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, 180);
  }, [closing, onClose, reduced]);

  // Scroll lock and focus restore.
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.classList.add('modal-open');
    if (scrollbar > 0) root.style.setProperty('--scrollbar-gap', `${scrollbar}px`);
    closeRef.current?.focus();

    return () => {
      root.classList.remove('modal-open');
      root.style.removeProperty('--scrollbar-gap');
      opener?.focus?.();
    };
  }, []);

  // Escape to close and Tab focus trap.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [requestClose]);

  return createPortal(
    <div
      className={`modal-overlay ${closing ? 'is-closing' : ''}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
      >
        <header className="modal__header">
          {icon ? (
            <span className="modal__icon">
              <Icon name={icon} size={24} />
            </span>
          ) : null}
          <div className="modal__titles">
            <h2 id={titleId}>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <button type="button" className="modal__close" onClick={requestClose} ref={closeRef} aria-label="Close dialog">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer ? <footer className="modal__footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  );
}
