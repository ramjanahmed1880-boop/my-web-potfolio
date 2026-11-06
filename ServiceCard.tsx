import { Button } from './Button';
import { GlowCard } from './GlowCard';
import { Icon } from './Icon';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  onOpen: (service: Service) => void;
}

export function ServiceCard({ service, onOpen }: ServiceCardProps) {
  return (
    <GlowCard className="service-card">
      <span className="badge">
        <Icon name={service.icon} size={24} />
      </span>
      <h3>{service.title}</h3>
      <p>{service.tagline}</p>
      <div className="card-actions">
        <Button variant="primary" onClick={() => onOpen(service)} ariaLabel={`Show details about ${service.title}`}>
          Details
        </Button>
        <Button variant="ghost" to={service.path} iconAfter="arrow" ariaLabel={`Open the ${service.title} page`}>
          Open page
        </Button>
      </div>
    </GlowCard>
  );
}
