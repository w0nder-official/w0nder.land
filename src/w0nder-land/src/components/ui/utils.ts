import { BrutalStyleProps } from './types';

export const getShadowClasses = (size: BrutalStyleProps['shadowSize'] = 'md') => {
  switch (size) {
    case 'sm':
      return 'shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000]';
    case 'md':
      return 'shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]';
    case 'lg':
      return 'shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]';
    default:
      return 'shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]';
  }
};

export const getTranslateClasses = (size: BrutalStyleProps['shadowSize'] = 'md') => {
  switch (size) {
    case 'sm':
      return 'hover:translate-x-[1px] hover:translate-y-[1px]';
    case 'md':
      return 'hover:translate-x-[2px] hover:translate-y-[2px]';
    case 'lg':
      return 'hover:translate-x-[4px] hover:translate-y-[4px]';
    default:
      return 'hover:translate-x-[2px] hover:translate-y-[2px]';
  }
};

export const getBorderClasses = (size: BrutalStyleProps['borderSize'] = '2') => `border-${size} border-black`;

export const getBrutalClasses = (props: BrutalStyleProps) => {
  const { shadowSize = 'md', borderSize = '2', className = '' } = props;
  return `${getBorderClasses(borderSize)} ${getShadowClasses(shadowSize)} ${getTranslateClasses(shadowSize)} ${className}`;
};
