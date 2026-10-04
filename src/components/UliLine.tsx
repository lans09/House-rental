import React from 'react';

interface UliLineProps {
  /** Unique id for the SVG pattern (must differ per instance on a page). */
  id: string;
  className?: string;
  /** Vertical repeat distance. 16 = single line; larger values tile as a background. */
  tile?: number;
}

/**
 * A light line motif inspired by Uli, the traditional Igbo line art:
 * a flowing wave with dots tucked into its curves.
 * Colour comes from `currentColor`, size from className.
 */
export function UliLine({ id, className = '', tile = 16 }: UliLineProps) {
  return (
    <svg className={className} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="48" height={tile} patternUnits="userSpaceOnUse">
          <path d="M0 8 Q12 0 24 8 T48 8" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <circle cx="12" cy="12.5" r="1.3" fill="currentColor" />
          <circle cx="36" cy="3.5" r="1.3" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
