import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { GlowCard } from '../components/GlowCard';
import { Icon } from '../components/Icon';
import { OfferingModal } from '../components/DetailModals';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { services, type Offering, type Service } from '../data/services';

interface ServicePageProps {
  service: Service;
}

export default function ServicePage({ service }: ServicePageProps) {
  const [active, setActive] = useState<Offering | null>(null);
  const others = services.filter((item) => item.id !== service.id);

  return (
    <>
      <Seo title={service.title} description={service.summary} path={service.path} />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="badge badge--large">
            <Icon name={service.icon} size={34} />
          </span>
          <h1>{service.title}</h1>
          <p className="page-hero__lead">{service.tagline}</p>
          <p className="page-hero__text">{service.summary}</p>
          <div className="hero__actions">
            <Button to={`/contact?service=${service.id}`} iconAfter="arrow">
              Request this service
            </Button>
            <Button to="/contact" variant="ghost" icon="send">
              Ask a question
            </Button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="offerings-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="What I can do" id="offerings-title">
              Select an item to see what is included.
            </SectionHeading>
          </Reveal>
          <div className="grid grid--offerings">
            {service.offerings.map((offering, index) => (
              <Reveal key={offering.id} delay={(index % 2) * 90}>
                <GlowCard className="offering-card">
                  <h3>{offering.title}</h3>
                  <p>{offering.summary}</p>
                  <div className="card-actions">
                    <Button
                      onClick={() => setActive(offering)}
                      ariaLabel={`Show details about ${offering.title}`}
                    >
                      Details
                    </Button>
                    <Button
                      variant="ghost"
                      to={`/contact?service=${service.id}&topic=${encodeURIComponent(offering.title)}`}
                      iconAfter="arrow"
                      ariaLabel={`Request: ${offering.title}`}
                    >
                      Request
                    </Button>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="needs-title">
        <div className="container">
          <Reveal>
            <div className="needs glass">
              <div>
                <h2 id="needs-title">What I need from you</h2>
                <ul className="check-list">
                  {service.needs.map((need) => (
                    <li key={need}>
                      <Icon name="check" size={16} />
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {service.note ? (
                <p className="note">
                  <Icon name="info" size={18} />
                  <span>{service.note}</span>
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="Other services" id="more-title" />
          </Reveal>
          <Reveal>
            <ul className="chips">
              {others.map((item) => (
                <li key={item.id}>
                  <Link to={item.path} className="chip">
                    <Icon name={item.icon} size={16} />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {active ? <OfferingModal service={service} offering={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
