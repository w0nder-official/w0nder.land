import React from 'react';
import { getBrutalClasses } from './utils';
import { BrutalStyleProps } from './types';

interface BrutalBadgeProps extends BrutalStyleProps {
  children: React.ReactNode;
  accentColor: string;
}

export function BrutalBadge({
  children,
  accentColor,
  shadowSize = 'md',
  borderSize = '4',
  className = '',
}: BrutalBadgeProps) {
  const baseClasses = getBrutalClasses({ shadowSize, borderSize, className });

  return (
    <span className={`bg-${accentColor} font-black text-black text-base inline-block ${baseClasses}`}>{children}</span>
  );
}
