import React, { useEffect, useState } from 'react';
import heartImg from '../assets/wallet/heart.png';
import checkImg from '../assets/wallet/check.png';

interface AccountInfo {
    name: string;
    account: string;
    bank: string;
}

interface WalletScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setAnimationClass('scale-100 opacity-100');
        });
    }, []);

    useEffect(() => {
        if (isClosing) {
            setAnimationClass('scale-90 opacity-0');
        }
    }, [isClosing]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text.replace(/-/g, ''));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const brideAccounts: AccountInfo[] = [
        { name: '최지니', account: '3333-26-0023726', bank: '카카오뱅크' },
        { name: '최석봉', account: '662002-01-459632', bank: '국민은행' },
        { name: '김현규', account: '662002-01-535848', bank: '국민은행' },
    ];

    const groomAccounts: AccountInfo[] = [
        { name: '박시우', account: '1002-355-095506', bank: '우리은행' },
        { name: '박성동', account: '502-22-036-7775', bank: '경남은행' },
        { name: '백윤정', account: '8211-5456-1869-70', bank: '농협은행' },
    ];

    const renderAccount = (info: AccountInfo) => (
        <div
            key={info.name}
            onClick={() => handleCopy(info.account)}
            className="flex items-center justify-between py-3 border-b border-[#A78FFC] last:border-b-2 cursor-pointer active:bg-purple-50 transition-colors"
        >
            <span className="font-neodgm text-purple-900 text-base sm:text-lg w-20 whitespace-nowrap text-left pl-2 font-bold">{info.name}</span>
            <span className="font-neodgm text-[#A78FFC] flex-1 text-center text-sm sm:text-base tracking-widest font-bold">{info.account}</span>
            <span className="font-neodgm text-gray-600 w-20 text-right text-xs sm:text-sm whitespace-nowrap pr-2">{info.bank}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={onClose}
                style={{ pointerEvents: 'auto' }}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Header Title */}
                <div className="pt-12 pb-6 text-center bg-[#FDFBFF]">
                    <div className="relative inline-block">
                        {/* Sparkle Left */}
                        <span className="absolute -left-10 top-1/2 -translate-y-1/2 text-[#D6B4FC] text-3xl">✦</span>
                        {/* Title Text */}
                        <h2 className="font-neodgm text-[#E0D4FC] text-shadow-sm leading-none select-none">
                            <span className="text-2xl sm:text-3xl text-[#D6B4FC] block tracking-widest mb-2 font-bold">MONEY GIFT FOR</span>
                            <span className="text-5xl sm:text-6xl text-[#E0D4FC] block tracking-wider drop-shadow-[4px_4px_0_#A78FFC] mb-2 font-bold">WEDDING</span>
                            <span className="text-4xl sm:text-5xl text-[#E0D4FC] block tracking-wide drop-shadow-[3px_3px_0_#A78FFC] font-bold">CEREMONY</span>
                        </h2>
                        {/* Sparkle Right */}
                        <span className="absolute -right-10 top-1/2 -translate-y-1/2 text-[#D6B4FC] text-3xl">✦</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-10 bg-white">

                    {/* Bride Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <div className="bg-white px-6 py-3 rounded-full border-8 border-[#E8DBF2] shadow-sm">
                                <span className="font-neodgm text-[#BA84CE] text-xl font-bold">신부측 계좌번호</span>
                            </div>
                            <img src={heartImg} alt="Heart" className="w-18 h-14 pixelated" />
                        </div>
                        <div className="border-t-2 border-[#A78FFC]">
                            {brideAccounts.map(renderAccount)}
                            <div className="border-b-2 border-[#A78FFC]"></div>
                        </div>
                    </div>

                    {/* Groom Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2 mb-2 flex-row-reverse">
                            <div className="bg-white px-6 py-3 rounded-full border-8 border-[#E8DBF2] shadow-sm">
                                <span className="font-neodgm text-[#BA84CE] text-xl font-bold">신랑측 계좌번호</span>
                            </div>
                            <img src={heartImg} alt="Heart" className="w-18 h-14 pixelated" />
                        </div>
                        <div className="border-t-2 border-[#A78FFC]">
                            {groomAccounts.map(renderAccount)}
                            <div className="border-b-2 border-[#A78FFC]"></div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 text-center bg-[#FDFBFF]">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-[#D6B4FC] text-2xl">✦</span>
                        <p className="text-sm text-gray-500 font-neodgm">계좌번호를 누르면 계좌번호가 복사됩니다!</p>
                        <span className="text-[#D6B4FC] text-2xl">✦</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-neodgm text-[#D6B4FC] tracking-widest drop-shadow-[2px_2px_0_#A78FFC]">
                        THANK YOU SO MUCH
                    </p>
                    {/* Checkerboard Pattern */}
                    <img src={checkImg} alt="Check Pattern" className="w-full mt-6 opacity-30 select-none" />
                </div>

                {/* Toast Notification */}
                <div
                    className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-purple-600/90 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 pointer-events-none flex items-center gap-2 z-50 backdrop-blur-sm ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <span className="text-sm font-neodgm whitespace-nowrap">ᐢ..ᐢ₎♡ 복사 완료</span>
                    <span className="text-sm whitespace-nowrap"> ̷̷</span>
                    <span className="text-sm whitespace-nowrap ml-0.5"> ༘ ☆</span>
                </div>
            </div>
        </div>
    );
};

export default WalletScreen;
