import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  showLiveIndicator?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 'md',
  showBorder = false,
  showLiveIndicator = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={user.avatar}
        alt={user.displayName}
        className={`
          ${sizeClasses[size]}
          rounded-full object-cover
          ${showBorder ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
        `}
      />
      {showLiveIndicator && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};