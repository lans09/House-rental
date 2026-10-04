import React from 'react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function VerificationBadge({
  size = 'md',
  showText = true,
  className = '',
}: VerificationBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold font-mono',
    lg: 'text-xs px-3 py-1.5 gap-2 font-bold font-mono',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-sm ${sizeClasses[size]} ${className}`}
      title="Verified by RentOra: Title documents and direct landlord mandate confirmed"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0"></span>
      {showText && <span>Document Verified</span>}
    </span>
  );
}
