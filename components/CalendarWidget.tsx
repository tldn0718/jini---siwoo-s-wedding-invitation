
import React from 'react';

const CalendarWidget: React.FC = () => {
    // March 2026: 1st is a Sunday. 31 days.
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="w-40 h-40 bg-[#fceef3]/80 border-2 border-gray-400 rounded-lg p-2 flex flex-col shadow-md">
            <div className="flex items-center pb-1">
                <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </div>
            </div>
            <div className="text-center">
                <h3 className="font-ultra font-bold text-lg text-[#7488c4] tracking-widest" style={{textShadow: '1px 1px 0px #fff'}}>march</h3>
            </div>
            <div className="grid grid-cols-7 gap-px text-center text-xs font-neodgm text-[#7488c4] mt-1 flex-grow">
                {days.map(day => (
                    <div key={day} className={`flex items-center justify-center p-0.5 ${day === 28 ? 'bg-pink-300 text-white rounded-full' : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWidget;