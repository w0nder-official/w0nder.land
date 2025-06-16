import React from 'react';

interface LinkButtonProps {
  title: string;
  description?: string;
  url: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  rotate?: boolean;
  size?: 'normal' | 'large';
}

export function LinkButton({
  title,
  description,
  url,
  icon,
  bgColor = 'bg-white',
  textColor = 'text-black',
  borderColor = 'border-black',
  rotate = false,
  size = 'normal'
}: LinkButtonProps) {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const rotationClasses = [
    '',
    'transform rotate-brutal-1',
    'transform -rotate-brutal-1',
    'transform rotate-brutal-2',
    'transform -rotate-brutal-2'
  ];
  
  const randomRotation = rotate ? rotationClasses[Math.floor(Math.random() * rotationClasses.length)] : '';

  return (
    <button
      onClick={handleClick}
      className={`
        w-full p-4 border-brutal shadow-brutal-lg hover:shadow-brutal-xl 
        hover:transform hover:-translate-y-2 transition-all duration-200
        ${bgColor} ${textColor} ${borderColor}
        ${randomRotation}
        ${size === 'large' ? 'py-6' : 'py-4'}
        group relative overflow-hidden
      `}
    >
      {/* Background decorative shapes */}
      <div className="absolute top-2 right-2 w-4 h-4 bg-black opacity-10 transform rotate-45"></div>
      <div className="absolute bottom-2 left-2 w-2 h-6 bg-black opacity-10"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          {icon && (
            <div className="w-12 h-12 bg-white border-2 border-black shadow-brutal flex items-center justify-center text-2xl group-hover:bg-neo-yellow transition-all duration-200">
              {icon}
            </div>
          )}
          <div className="text-left">
            <h3 className="font-brutal m-0 uppercase tracking-wide">{title}</h3>
            {description && (
              <p className="text-sm m-0 opacity-80 uppercase tracking-wide mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {/* Arrow button */}
        <div className="w-10 h-10 bg-white border-2 border-black shadow-brutal flex items-center justify-center text-black group-hover:bg-neo-red group-hover:text-white group-hover:scale-110 transition-all duration-200">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none"></div>
    </button>
  );
}