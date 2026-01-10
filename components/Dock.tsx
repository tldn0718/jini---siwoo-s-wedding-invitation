
import React from 'react';
import bottom1 from '../assets/icons/bottom1.png';
import bottom2 from '../assets/icons/bottom2.png';

const Dock: React.FC = () => {
    return (
        <footer className="pt-2 shrink-0 w-full pb-2 tall:pb-6 taller:pb-10">
            <div className="bg-[#e8fce8]/80 backdrop-blur-sm rounded-[1.5rem] p-2 shadow-sm mx-4 mb-2 tall:mb-4 taller:mb-6">
                <div className="flex justify-between items-center px-4 w-full max-w-xs mx-auto gap-3">
                    <div className="w-12 h-12 flex items-center justify-center cursor-pointer active:scale-95 transition-transform bg-[rgb(253,222,232)] rounded-[0.8rem]">
                        <img src={bottom1} alt="B1" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center cursor-pointer active:scale-95 transition-transform bg-white rounded-[0.8rem]">
                        <img src={bottom2} alt="B2" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center cursor-pointer active:scale-95 transition-transform bg-[rgb(253,222,232)] rounded-[0.8rem]">
                        <img src={bottom1} alt="B1" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center cursor-pointer active:scale-95 transition-transform bg-white rounded-[0.8rem]">
                        <img src={bottom2} alt="B2" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Dock;
