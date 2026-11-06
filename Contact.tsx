import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { contact, hasDirectContact, profileLinks } from '../config/site';
import { getService, serviceOptions } from '../data/services';
import { copyText } from '../utils/clipboard';

const MIN_LENGTH = 10;

export default function Contact() {
  const [params] = useSearchParams();
  const initialService = getService(params.get('service'))?.id ?? '';
  const topic = (params.get('topic') ?? '').slice(0, 120);

  const [name, setName] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState(topic ? `I am interested in: ${topic}.\n\n` : '');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!status) return;
    const id = window.setTimeout(() => setStatus(''), 4000);
    return () => window.clearTimeout(id);
  }, [status]);

  const serviceLabel = serviceOptions.find((option) => option.id === service)?.title ?? 'Something else';
  const lines = ['Hello Ramjan,', '', `Service: ${serviceLabel}`];
  if (name.trim()) lines.push(`Name: ${name.trim()}`);
  lines.push('', message.trim());
  const composed = lines.join('\n');
  const subject = `${serviceLabel} request`;

  const validate = (): boolean => {
    if (message.trim().length < MIN_LENGTH) {
      setError(`Write a short message first (at least ${MIN_LENGTH} characters).`);
      return false;
    }
    setError('');
    return true;
  };

  const guard = (event: MouseEvent<HTMLElement>) => {
    if (!validate()) event.preventDefault();
  };

  const onCopy = async () => {
    if (!validate()) return;
    const ok = await copyText(composed);
    setStatus(ok ? 'Message copied to the clipboard.' : 'Copy failed. Select the preview text and copy it manually.');
  };

  const onTelegram = async (event: MouseEvent<HTMLElement>) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    const ok = await copyText(composed);
    setStatus(ok ? 'Message copied. Paste it into the Telegram chat.' : 'Open the chat and paste your message.');
  };

  const onMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (error) setError('');
  };

  const emailHref = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed)}`
    : '';
  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(composed)}`
    : '';
  const telegramHref = contact.telegram ? `https://t.me/${contact.telegram}` : '';

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Ramjan Ahmed to request a website, Android APK, bot, security help, API key guidance, project review or PC tool."
        path="/contact"
      />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="badge badge--large">
            <Icon name="mail" size={34} />
          </span>
          <h1>Contact</h1>
          <p className="page-hero__lead">Tell me what you need.</p>
          <p className="page-hero__text">
            Write your message below, check the preview, then send it with the method you prefer. Please do not include
            passwords, private keys or tokens.
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-label="Contact form">
        <div className="container contact-grid">
          <Reveal>
            <form className="form glass" onSubmit={(event) => event.preventDefault()} noValidate>
              <div className="field">
                <label htmlFor="c-name">Your name (optional)</label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="c-service">Service</label>
                <select id="c-service" name="service" value={service} onChange={(event) => setService(event.target.value)}>
                  <option value="">Something else</option>
                  {serviceOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={7}
                  maxLength={2000}
                  value={message}
                  onChange={onMessage}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'c-error' : undefined}
                  placeholder="Describe what you want to build or fix."
                />
                {error ? (
                  <p className="field__error" id="c-error" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>

              <div className="form__actions">
                <Button onClick={onCopy} icon="copy" variant={hasDirectContact ? 'ghost' : 'primary'}>
                  Copy message
                </Button>
                {emailHref ? (
                  <Button href={emailHref} onClick={guard} icon="mail">
                    Send by email
                  </Button>
                ) : null}
                {whatsappHref ? (
                  <Button href={whatsappHref} onClick={guard} icon="chat">
                    Send on WhatsApp
                  </Button>
                ) : null}
                {telegramHref ? (
                  <Button href={telegramHref} onClick={onTelegram} icon="send">
                    Open Telegram
                  </Button>
                ) : null}
              </div>

              <p className="form__status" role="status" aria-live="polite">
                {status}
              </p>
            </form>
          </Reveal>

          <Reveal delay={90}>
            <aside className="side-stack">
              <div className="glass panel">
                <h2>Message preview</h2>
                <pre className="preview" aria-label="Preview of the message that will be sent">
                  {composed}
                </pre>
              </div>

              <div className="glass panel">
                <h2>Ways to reach me</h2>
                {hasDirectContact || profileLinks.length > 0 ? (
                  <ul className="contact-list">
                    {contact.email ? (
                      <li>
                        <Icon name="mail" size={18} />
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </li>
                    ) : null}
                    {contact.whatsapp ? (
                      <li>
                        <Icon name="chat" size={18} />
                        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                          WhatsApp
                        </a>
                      </li>
                    ) : null}
                    {contact.telegram ? (
                      <li>
                        <Icon name="send" size={18} />
                        <a href={`https://t.me/${contact.telegram}`} target="_blank" rel="noopener noreferrer">
                          Telegram @{contact.telegram}
                        </a>
                      </li>
                    ) : null}
                    {profileLinks.map((link) => (
                      <li key={link.id}>
                        <Icon name={link.icon} size={18} />
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted">
                    Direct contact buttons appear here once contact details are added in the site configuration. Until
                    then, use Copy message and send it yourself.
                  </p>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
