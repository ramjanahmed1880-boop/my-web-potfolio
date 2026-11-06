import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  children?: ReactNode;
  id?: string;
}

export function SectionHeading({ title, children, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
