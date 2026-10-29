'use client';

import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string; // Image source (optional)
  iconName?: string; // Icon name when no image
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  imageClassName?: string; // Image-specific classes
  onClick?: () => void; // Click handler
}

export const APP_LOGO_SRC = '/assets/images/HOA.jpg';

const AppLogo = memo(function AppLogo({
  src = APP_LOGO_SRC,
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  imageClassName = 'object-contain',
  onClick,
}: AppLogoProps) {
  // Memoize className calculation
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* Show image if src provided, otherwise show icon */}
      {src ? (
        <AppImage
          src={src}
          alt="HOA Connect logo"
          width={size}
          height={size}
          className={`flex-shrink-0 ${imageClassName}`.trim()}
          priority={true}
          unoptimized={src.endsWith('.svg')}
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

export default AppLogo;
