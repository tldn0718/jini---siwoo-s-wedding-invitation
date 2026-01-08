import React, { useState, useEffect } from 'react';
import ringsImg from '../assets/rings_thumb.jpg';

const DdayWidget: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const weddingDate = new Date('2026-03-28T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const diffTime = weddingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
  }, []);

  return (
    <div className="w-40 h-40 bg-white/50 backdrop-blur-md rounded-3xl p-4 flex flex-col items-center justify-between text-center relative overflow-hidden">
      <img src={ringsImg} alt="Wedding Rings" className="absolute inset-0 w-full h-full object-cover opacity-80 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-between h-full text-gray-100">
        <div className="text-center">
          <p className="font-neodgm text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Save The Date</p>
          <p className="text-sm text-white/90 font-noto-sans-kr" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>26.03.28 14:00</p>
        </div>
      </div>
      <div className="font-neodgm font-bold text-4xl text-white flex items-center absolute bottom-2 right-4 whitespace-nowrap">
        <span className="text-red-400 text-lg mr-1">♥</span>
        D-{daysLeft > 0 ? daysLeft : 'Day!'}
      </div>
    </div>
  );
};

export default DdayWidget;