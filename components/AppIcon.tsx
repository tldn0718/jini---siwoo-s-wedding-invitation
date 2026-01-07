import React from 'react';
import type { AppIconProps } from '../types';

const AppIcon: React.FC<AppIconProps> = ({ imageUrl, label, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center justify-start text-center ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
      onClick={onClick}
    >
      <div className="w-14 h-14">
        <img src={imageUrl} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="mt-1 text-sm font-medium text-gray-700 font-neodgm">{label}</span>
    </div>
  );
};

export default AppIcon;