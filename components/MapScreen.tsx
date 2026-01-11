import React, { useEffect, useState } from 'react';

import warningIcon from '../assets/map/warning.png';
import downArrow from '../assets/map/downArrow.png';
import appLinkBtn from '../assets/map/appLinkButton.png';

interface MapScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const MapScreen: React.FC<MapScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', '#f0f4ed');
        }

        // Trigger open animation after mount
        requestAnimationFrame(() => {
            setAnimationClass('scale-100 opacity-100');
        });

        return () => {
            if (meta) {
                meta.setAttribute('content', '#fdf2f8');
            }
        };
    }, []);

    useEffect(() => {
        if (isClosing) {
            setAnimationClass('scale-90 opacity-0');
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) {
                meta.setAttribute('content', '#fdf2f8');
            }
        }
    }, [isClosing]);

    // Handle Escape Key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleNaverMap = () => {
        window.open('https://naver.me/5N15n4Vu', '_blank');
    };

    const handleKakaoMap = () => {
        window.open('https://place.map.kakao.com/1408612060', '_blank');
    };

    const handleTMap = () => {
        window.open('https://tmap.life/5c83f3d0', '_blank');
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={onClose}
                style={{ pointerEvents: 'auto' }}
            />

            {/* Modal/Screen Container */}
            <div
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-[#fdfdfd] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Header */}
                <div className="relative bg-[#f0f4ed] py-6 px-12 text-center border-b border-dashed border-[#dce4d5]">
                    <h2 className="text-2xl sm:text-4xl font-bold font-neodgm text-[#4a4036] tracking-wider leading-tight break-keep">
                        Map and Directions
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-gray-500 hover:text-black transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-white">
                    {/* Map Image */}
                    <div className="bg-white p-2 rounded-xl border-2 border-[#4a4036] shadow-sm min-h-[322px]"> {/* Added min-h to prevent collapse */}
                        {!isMapLoaded && (
                            <div className="w-full h-[306px] bg-[#fff0f5] rounded-lg flex flex-col items-center justify-center space-y-3 animate-pulse">
                                <span className="text-4xl animate-bounce">🎀</span>
                                <p className="font-neodgm text-[#ff69b4] text-lg tracking-widest animate-pulse">
                                    Loading...
                                </p>
                            </div>
                        )}
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/assets%2Fmap.png?alt=media&token=a40bbc1d-b249-49bc-922b-7e5ee9a36d27"
                            alt="Map of Venue"
                            className={`w-full h-auto rounded-lg ${!isMapLoaded ? 'hidden' : 'block'}`}
                            onLoad={() => setIsMapLoaded(true)}
                        />
                    </div>

                    {/* Text Details */}
                    <div className="space-y-4 px-1">
                        {/* Address & Warnings */}
                        <div className="space-y-2">
                            <div className="flex flex-col gap-0 leading-tight">
                                <p className="font-neodgm text-lg text-[#333] mb-0">이라운지 서울대점: 02-875-7761</p>
                                <p className="font-neodgm text-lg text-[#333] mt-0">(서울대학교 엔지니어 하우스)</p>
                                <p className="font-neodgm text-sm text-[#444] break-keep">
                                    서울시 관악구 관악로1 서울대학교, 310동 엔지니어 하우스
                                </p>
                            </div>

                            {/* ATM Warning */}
                            <div className="flex items-end gap-1">
                                <img src={warningIcon} alt="Warning" className="w-4 h-4 mb-2 mr-1 flex-shrink-0" />
                                <div className="text-[10px] font-neodgm text-[#C4B5FD] leading-relaxed break-keep tracking-tight font-thin opacity-80">
                                    <p>이라운지 내에 ATM이 없습니다.</p>
                                    <p>ATM은 302동 제2공학관 또는 301동 제1공학관에서 이용 가능합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Public Transport */}
                        <div className="space-y-1">
                            <h3 className="font-neodgm text-base font-bold text-[#333]">대중교통 이용시</h3>
                            <div className="text-xs font-neodgm space-y-1 text-[#555] leading-relaxed">
                                <p>
                                    <span className="font-bold text-green-600">2호선</span> 서울대입구역 3번 출구 → 5511번, 5513번 버스 탑승 → <span className="font-medium text-black">서울대학교 내 제2공학관(종점)</span> 하차
                                </p>
                                <p>
                                    <span className="font-bold text-blue-500">신림선</span> 관악산역 1번출구 → 정문쪽 버스정거장 도보이동 → 5511번, 5516번 버스 탑승 → <span className="font-medium text-black">제2공학관(종점)</span> 하차
                                </p>
                            </div>
                        </div>

                        {/* Car */}
                        <div className="space-y-1">
                            <h3 className="font-neodgm text-base font-bold text-[#333]">승용차 이용시</h3>
                            <p className="text-xs font-neodgm text-[#555] leading-relaxed">
                                이라운지 주소, 2시간 무료주차 가능합니다. (주차권발급)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="bg-[#e8fce8] pt-3 pb-4 px-2 border-t border-[#dce4d5] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                        <div className="bg-[#a29bfe] px-3 py-1 rounded-full shadow-sm flex items-center justify-center">
                            <span className="font-neodgm text-white text-[11px] sm:text-xs pt-[1px]">지도 어플 바로가기</span>
                        </div>
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                        <img src={downArrow} alt="Arrow" className="w-3 h-4 animate-bounce" />
                    </div>
                    <div className="flex justify-between gap-2 px-1">
                        {/* Naver */}
                        <div className="relative flex-1 h-10 cursor-pointer active:scale-95 transition-transform" onClick={handleNaverMap}>
                            <img src={appLinkBtn} alt="Button Background" className="absolute inset-0 w-full h-full object-fill rounded-lg" />
                            <span className="absolute inset-0 flex items-center justify-center font-neodgm text-[10px] sm:text-xs font-bold pt-1 text-black z-10">네이버 지도</span>
                        </div>
                        {/* Kakao */}
                        <div className="relative flex-1 h-10 cursor-pointer active:scale-95 transition-transform" onClick={handleKakaoMap}>
                            <img src={appLinkBtn} alt="Button Background" className="absolute inset-0 w-full h-full object-fill rounded-lg" />
                            <span className="absolute inset-0 flex items-center justify-center font-neodgm text-[10px] sm:text-xs font-bold pt-1 text-black z-10">카카오맵</span>
                        </div>
                        {/* TMap */}
                        <div className="relative flex-1 h-10 cursor-pointer active:scale-95 transition-transform" onClick={handleTMap}>
                            <img src={appLinkBtn} alt="Button Background" className="absolute inset-0 w-full h-full object-fill rounded-lg" />
                            <span className="absolute inset-0 flex items-center justify-center font-neodgm text-[10px] sm:text-xs font-bold pt-1 text-black z-10">티맵</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapScreen;
