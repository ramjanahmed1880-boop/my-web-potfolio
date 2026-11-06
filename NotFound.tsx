import { Button } from '../components/Button';
import { Seo } from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." path="/404" />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <h1>Page not found</h1>
          <p className="page-hero__text">The address you opened does not match any page on this website.</p>
          <div className="hero__actions">
            <Button to="/" iconAfter="arrow">
              Go to Home
            </Button>
            <Button to="/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
