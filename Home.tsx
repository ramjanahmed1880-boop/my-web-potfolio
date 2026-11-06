import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Button } from '../components/Button';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceModal } from '../components/DetailModals';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { services, type Service } from '../data/services';

const steps = [
  { title: 'Send your request', text: 'Choose a service and describe what you need on the contact page.' },
  { title: 'Agree the scope', text: 'What is included is confirmed with you before any work starts.' },
  { title: 'Build and review', text: 'I build what was agreed and you review the result.' },
  { title: 'Delivery', text: 'You receive the finished work, with help getting it online or running.' },
];

export default function Home() {
  const [active, setActive] = useState<Service | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  const followPointer = (event: PointerEvent<HTMLElement>) => {
    const el = nameRef.current;
    if (!el || event.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--hx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--hy', `${event.clientY - rect.top}px`);
  };

  const goToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo path="/" />

      <section className="hero" onPointerMove={followPointer} aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__item hero__name" style={{ '--i': 0 } as CSSProperties} ref={nameRef}>
              <span>RAMJAN</span>
              <span>AHMED</span>
            </h1>
            <p className="hero__role hero__item" style={{ '--i': 1 } as CSSProperties}>
              Developer building websites, Android APKs, bots and PC tools.
            </p>
            <p className="hero__text hero__item" style={{ '--i': 2 } as CSSProperties}>
              Tell me what you need. I confirm the scope with you before any work starts.
            </p>
            <div className="hero__actions hero__item" style={{ '--i': 3 } as CSSProperties}>
              <Button onClick={goToServices} iconAfter="arrow">
                View services
              </Button>
              <Button to="/contact" variant="ghost" icon="send">
                Contact me
              </Button>
            </div>
          </div>

          <div className="hero__visual hero__item" style={{ '--i': 2 } as CSSProperties} aria-hidden="true">
            <div className="orbit">
              <span className="orbit__ring orbit__ring--1" />
              <span className="orbit__ring orbit__ring--2" />
              <span className="orbit__ring orbit__ring--3" />
              <span className="orbit__dot orbit__dot--1" />
              <span className="orbit__dot orbit__dot--2" />
              <span className="orbit__core">RA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="Services" id="services-title">
              Pick a service to see what it covers, what I need from you and how to request it.
            </SectionHeading>
          </Reveal>
          <div className="grid grid--services">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 80}>
                <ServiceCard service={service} onOpen={setActive} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="How a request works" id="process-title">
              The same four steps for every service.
            </SectionHeading>
          </Reveal>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 90}>
                  <div className="step glass">
                    <span className="step__index">{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <Reveal>
            <div className="cta glass">
              <div>
                <h2 id="cta-title">Have a project in mind?</h2>
                <p>Write a short message about what you need and send it by the contact method you prefer.</p>
              </div>
              <Button to="/contact" iconAfter="arrow">
                Start a request
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {active ? <ServiceModal service={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
