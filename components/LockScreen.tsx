import React, { useState, useEffect, useRef } from 'react';
import hearts from '../assets/lockScreen/hearts.png';
import sparkles from '../assets/lockScreen/sparkles.png';

interface LockScreenProps {
    onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sliderValue, setSliderValue] = useState(0);
    const sliderValueRef = useRef(0); // Ref to track value without closure staleness
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Theme Color Management (Notch)
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        const originalColor = meta?.getAttribute('content') || '#ffffff';
        if (meta) {
            meta.setAttribute('content', '#2D2A15');
        }
        return () => {
            if (meta) {
                meta.setAttribute('content', originalColor);
            }
        };
    }, []);

    // Format Date: "3월 28일 토요일"
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('ko-KR', options);
    };

    // Format Time: "12:00"
    const formatTime = (date: Date) => {
        const hours = date.getHours() % 12 || 12; // 12시간제로 변환 (0시는 12시로)
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분이 한 자리면 앞에 0 붙이기

        return `${hours}:${minutes}`;
    };

    // Slider Logic
    const handleStart = () => {
        setIsDragging(true);
    };

    // IMPORTANT: Use Ref for current value in event listener to avoid stale closure
    const handleEnd = () => {
        setIsDragging(false);
        if (sliderValueRef.current > 80) {
            setIsUnlocking(true);
            setTimeout(onUnlock, 300); // Wait for animation
        } else {
            setSliderValue(0); // Snap back
            sliderValueRef.current = 0;
        }
    };

    const handleMove = (clientX: number) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const width = rect.width;

        // Calculate percentage (0 to 100) based on thumb width (approx 50px)
        const maxDrag = width - 56; // 56px thumb width approx with padding
        const constrainedX = Math.max(0, Math.min(offsetX - 28, maxDrag)); // Center thumb

        const percentage = (constrainedX / maxDrag) * 100;
        setSliderValue(percentage);
        sliderValueRef.current = percentage; // Update ref
    };

    // Global Event Listeners for Dragging
    useEffect(() => {
        if (isDragging) {
            // Prevent text selection globally while dragging
            document.body.style.userSelect = 'none';
            // Clear any accidental selection that might have started
            window.getSelection()?.removeAllRanges();

            const onWindowMouseMove = (e: MouseEvent) => handleMove(e.clientX);
            const onWindowTouchMove = (e: TouchEvent) => {
                e.preventDefault(); // Prevent scrolling while dragging
                handleMove(e.touches[0].clientX);
            };
            const onWindowUp = () => handleEnd();
            const onWindowTouchEnd = () => handleEnd();

            window.addEventListener('mousemove', onWindowMouseMove);
            window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
            window.addEventListener('mouseup', onWindowUp);
            window.addEventListener('touchend', onWindowTouchEnd);

            return () => {
                document.body.style.userSelect = '';

                window.removeEventListener('mousemove', onWindowMouseMove);
                window.removeEventListener('touchmove', onWindowTouchMove);
                window.removeEventListener('mouseup', onWindowUp);
                window.removeEventListener('touchend', onWindowTouchEnd);
            };
        }
    }, [isDragging]);

    return (
        <div
            className={`absolute inset-0 z-[100] w-full h-full overflow-hidden flex flex-col items-center pb-6 transition-opacity duration-500 bg-black ${isUnlocking ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* Loading Overlay - Dark Theme */}
            <div className={`absolute inset-0 z-[200] bg-[#1a1a2e] flex flex-col items-center justify-center transition-opacity duration-1000 ${isImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="text-6xl mb-6 animate-bounce">🌙</div>
                <p className="font-neodgm text-[#e6e6fa] text-xl tracking-widest animate-pulse">
                    Dreaming...
                </p>
                <p className="font-neodgm text-[#a2a2d0] text-xs mt-2 tracking-wider opacity-70">
                    Bringing the stars for you
                </p>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 z-[-1]">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/originals%2Fsnap%2F10.jpg?alt=media&token=e25cb88c-1478-486b-b35e-7a3a9990bf1f"
                    alt="Lock Screen Background"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                    onLoad={() => setIsImageLoaded(true)}
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Top Layout Spacer - Pushes content down responsively */}
            <div className="h-[4%] tall:h-[8%] taller:h-[12%] min-h-[40px] transition-all duration-300" />

            {/* Top Content: Time & Date */}
            <div className="flex flex-col items-center text-white z-10 w-full animate-fade-in-up">
                <div className="flex items-center gap-2 mb-1 opacity-90">
                </div>
                <h2 className="text-lg tall:text-xl font-black tracking-wide mb-0 sm:mb-1 opacity-90 font-noto-sans-kr text-[#feccdd]">{formatDate(currentTime)}</h2>
                <h1 className="text-7xl tall:text-8xl font-black tracking-tight drop-shadow-md font-noto-sans-kr text-[#feccdd] leading-none">{formatTime(currentTime)}</h1>
            </div>

            {/* Flexible Spacer */}
            <div className="flex-1" />

            {/* Middle Content: Decorations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-full max-w-sm h-full max-h-[500px]">
                    <img
                        src={hearts}
                        alt="Hearts"
                        className="absolute top-[35%] left-[10%] w-16 h-16 animate-pulse opacity-80 rotate-[-12deg]"
                    />
                    <img
                        src={sparkles}
                        alt="Sparkles"
                        className="absolute top-[30%] right-[10%] w-12 h-12 animate-pulse opacity-90 delay-75"
                    />
                    {/* Centered Text - Adjusted position higher as requested */}
                    <div className="absolute top-[23%] tall:top-[20%] taller:top-[17%] w-full text-center transition-all duration-300">
                        <h3 className="text-3xl font-neodgm text-white/90 drop-shadow-lg tracking-widest animate-pulse">
                            HAPPY WEDDING DAY
                        </h3>
                    </div>
                    <img
                        src={sparkles}
                        alt="Sparkles 2"
                        className="absolute bottom-[40%] right-[15%] w-10 h-10 animate-bounce opacity-80 delay-150"
                    />
                </div>
            </div>

            {/* Bottom Content: Slider */}
            <div className="w-full max-w-sm px-8 z-10 mb-2 tall:mb-6 taller:mb-8">
                <div
                    ref={sliderRef}
                    className="relative h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center p-1 border border-white/30 overflow-hidden shadow-lg touch-none"
                // Added touch-none to prevent scrolling while dragging
                >
                    {/* Initial Text */}
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ opacity: 1 - sliderValue / 50 }}
                    >
                        <span className="font-neodgm text-white text-lg tracking-widest animate-pulse">밀어서 축하하기 ›</span>
                    </div>

                    {/* Progress Track */}
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-full transition-all duration-75 ease-linear pointer-events-none"
                        style={{ width: `${sliderValue}%` }}
                    />

                    {/* Thumb */}
                    <div
                        className="absolute h-14 w-14 bg-white rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition-transform touch-none"
                        style={{
                            left: `calc(${sliderValue}% + 4px)`,
                            transform: `translateX(-${sliderValue}%)`,
                            transition: isDragging ? 'none' : 'all 0.3s ease-out'
                        }}
                        onMouseDown={handleStart}
                        onTouchStart={handleStart}
                    >
                        {sliderValue > 80 ? (
                            <span className="text-2xl pointer-events-none">🎉</span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-400 pointer-events-none">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LockScreen;
