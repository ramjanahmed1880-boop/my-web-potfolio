import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { GlowCard } from '../components/GlowCard';
import { Icon, type IconName } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { site } from '../config/site';
import { services } from '../data/services';

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: 'check', title: 'Scope first', text: 'What is included is agreed with you before work starts.' },
  {
    icon: 'key',
    title: 'Secrets stay secret',
    text: 'I never ask you to send private keys, tokens or passwords by chat or email.',
  },
  {
    icon: 'info',
    title: 'Real information only',
    text: 'This website has no invented statistics, reviews or testimonials.',
  },
  { icon: 'chat', title: 'Clear communication', text: 'You always know what is being built and what it needs from you.' },
];

const stack = ['React', 'Vite', 'TypeScript', 'React Router'];

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="About Ramjan Ahmed, a developer offering websites, Android APKs, bots, security help, API key guidance, project reviews and PC tools."
        path="/about"
      />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="badge badge--large">
            <Icon name="user" size={34} />
          </span>
          <h1>About</h1>
          <p className="page-hero__lead">I am Ramjan Ahmed, a developer.</p>
          <p className="page-hero__text">
            {site.bio ||
              'This website lists the services I offer: free websites, Android APK building, bot making, security help, API key guidance, project reviews and PC tools.'}
          </p>
          <div className="hero__actions">
            <Button to="/contact" iconAfter="arrow">
              Contact me
            </Button>
            <Button to="/" variant="ghost">
              See services
            </Button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="What I work on" id="work-title">
              Open any page to see the details.
            </SectionHeading>
          </Reveal>
          <Reveal>
            <ul className="chips">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={service.path} className="chip">
                    <Icon name={service.icon} size={16} />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <Reveal>
            <SectionHeading title="How I work" id="principles-title" />
          </Reveal>
          <div className="grid grid--offerings">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 90}>
                <GlowCard className="offering-card">
                  <span className="badge">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="built-title">
        <div className="container">
          <Reveal>
            <div className="needs glass">
              <div>
                <h2 id="built-title">About this website</h2>
                <p>
                  It is a static single-page application with no backend and no analytics or advertising scripts. It is built with:
                </p>
                <ul className="chips">
                  {stack.map((item) => (
                    <li key={item}>
                      <span className="chip chip--static">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
