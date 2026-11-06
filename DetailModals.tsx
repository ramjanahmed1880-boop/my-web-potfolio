import { Icon } from './Icon';
import { Button } from './Button';
import { Modal } from './Modal';
import type { Offering, Service } from '../data/services';

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

/** Overview of one whole service: what is offered, what is needed and how to request it. */
export function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <Modal
      title={service.title}
      subtitle={service.tagline}
      icon={service.icon}
      onClose={onClose}
      footer={
        <>
          <Button to={`/contact?service=${service.id}`} iconAfter="arrow">
            Request this service
          </Button>
          <Button to={service.path} variant="ghost">
            Open full page
          </Button>
        </>
      }
    >
      <p>{service.summary}</p>

      <h3>What is offered</h3>
      <ul className="detail-list">
        {service.offerings.map((offering) => (
          <li key={offering.id}>
            <strong>{offering.title}</strong>
            <span>{offering.summary}</span>
          </li>
        ))}
      </ul>

      <h3>What I need from you</h3>
      <CheckList items={service.needs} />

      {service.note ? (
        <p className="note">
          <Icon name="info" size={18} />
          <span>{service.note}</span>
        </p>
      ) : null}
    </Modal>
  );
}

interface OfferingModalProps {
  service: Service;
  offering: Offering;
  onClose: () => void;
}

/** Details for one specific offering inside a service. */
export function OfferingModal({ service, offering, onClose }: OfferingModalProps) {
  const query = `service=${service.id}&topic=${encodeURIComponent(offering.title)}`;
  return (
    <Modal
      title={offering.title}
      subtitle={service.title}
      icon={service.icon}
      onClose={onClose}
      footer={
        <>
          <Button to={`/contact?${query}`} iconAfter="arrow">
            Request this
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <p>{offering.details}</p>

      <h3>What is included</h3>
      <CheckList items={offering.includes} />

      <h3>What I need from you</h3>
      <CheckList items={service.needs} />

      {service.note ? (
        <p className="note">
          <Icon name="info" size={18} />
          <span>{service.note}</span>
        </p>
      ) : null}
    </Modal>
  );
}
