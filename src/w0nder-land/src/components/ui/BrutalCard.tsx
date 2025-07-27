import React from 'react';
import { getBrutalClasses } from './utils';
import { BrutalStyleProps } from './types';

interface BrutalCardProps extends BrutalStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
  interactive?: boolean;
}

export function BrutalCard({
  children,
  onClick,
  interactive = false,
  shadowSize = 'lg',
  borderSize = '4',
  className = '',
}: BrutalCardProps) {
  const baseClasses = `bg-white ${getBrutalClasses({ shadowSize, borderSize, className })}`;
  const interactiveClasses = interactive ? 'cursor-pointer transition-all' : '';

  const Component = onClick ? 'button' : 'div';
  const componentProps = onClick ? { type: 'button' as const, onClick } : {};

  return (
    <Component className={`${baseClasses} ${interactiveClasses}`} {...componentProps}>
      {children}
    </Component>
  );
}
