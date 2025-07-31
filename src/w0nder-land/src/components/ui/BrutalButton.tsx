import React, { useState, useCallback, cloneElement, isValidElement } from 'react';
import { getBrutalClasses } from './utils';
import { BrutalStyleProps } from './types';

interface BrutalButtonProps extends BrutalStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'accent';
  accentColor?: string;
  asChild?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  shadowSize = 'md',
  borderSize = '2',
  variant = 'default',
  accentColor = 'black',
  asChild = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleTouchCancel = useCallback(() => {
    setIsPressed(false);
  }, []);

  const getButtonClass = useCallback(() => {
    const baseClasses = getBrutalClasses({ shadowSize, borderSize, className });

    // className에 배경색이 포함되어 있는지 확인
    const hasCustomBg = className.includes('bg-');

    let variantClasses = '';
    if (hasCustomBg) {
      // 커스텀 배경색이 있으면 텍스트 색상만 설정
      variantClasses = 'text-black font-black';
    } else {
      // 기본 배경색 적용
      variantClasses =
        variant === 'accent' ? `bg-${accentColor} text-black font-black` : 'bg-black text-white font-black';
    }

    if (isPressed) {
      // 터치 중일 때는 호버 상태와 같은 스타일 적용
      return `${baseClasses} ${variantClasses}`
        .replace(/shadow-\[.*?\]/, 'shadow-none')
        .replace(/hover:translate-x-\[.*?\]/, 'translate-x-[1px]')
        .replace(/hover:translate-y-\[.*?\]/, 'translate-y-[1px]');
    }

    return `${baseClasses} ${variantClasses}`;
  }, [className, shadowSize, borderSize, isPressed, variant, accentColor]);

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('asChild requires a single valid React element as children');
    }

    // asChild일 때는 className을 별도로 처리
    const baseClasses = getBrutalClasses({ shadowSize, borderSize, className: '' });
    const existingClass = children.props.className || '';

    // width 관련 클래스가 있으면 block 클래스 자동 추가
    const hasWidthClass = className.includes('w-') || existingClass.includes('w-');
    const blockClass = hasWidthClass ? 'block' : '';

    // group 클래스 자동 추가
    const groupClass = 'group';

    const combinedClass = existingClass
      ? `${existingClass} ${baseClasses} ${className} ${blockClass} ${groupClass}`.trim()
      : `${baseClasses} ${className} ${blockClass} ${groupClass}`.trim();

    const childProps = {
      className: combinedClass,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
      onClick,
      disabled,
    };

    return cloneElement(children, childProps);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`${getButtonClass()} group`}>
      {children}
    </button>
  );
};
