import { Link } from 'react-router-dom';
import { navItems } from '../data/navigation';
import { profileLinks } from '../config/site';
import { Icon } from './Icon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand" aria-label="Ramjan Ahmed, home">
            <span className="brand__mark">RA</span>
            <span className="brand__name">RAMJAN AHMED</span>
          </Link>
          <p>Developer. Websites, Android APKs, bots, security help and PC tools.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__title">Pages</h2>
          <ul className="footer__links">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {profileLinks.length > 0 ? (
          <div>
            <h2 className="footer__title">Find me online</h2>
            <ul className="footer__links">
              {profileLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon name={link.icon} size={15} /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="container footer__bottom">
        <span>&copy; {year} Ramjan Ahmed</span>
        <span>Built with React, Vite and TypeScript</span>
      </div>
    </footer>
  );
}
