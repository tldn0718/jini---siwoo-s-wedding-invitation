import React, { useEffect, useState } from 'react';

// Image URLs
const imageList = [
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-1.jpg?alt=media&token=27b2a5c4-ef99-4ed7-a20a-f1c692fdb36b',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-2.jpg?alt=media&token=be0635b0-98b5-4971-8d14-f82436fc9235',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-3.jpg?alt=media&token=2f1ec751-9451-4b5f-80f5-dfec74a4bd4d',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-4.jpg?alt=media&token=c8a4b9e5-4cb3-4e0b-ab23-852cf8c8252e',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-5.jpg?alt=media&token=9dca2fa8-33f6-4e3c-95df-19c194685c0d',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-6.jpg?alt=media&token=f7f747ed-31f6-452d-970d-8c6f89321f75',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-7.jpg?alt=media&token=962150cf-c215-4708-9302-18c2d0b6e40d',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-8.jpg?alt=media&token=730830f9-8ac9-45e0-90f0-ec5c468a48ab',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-9.jpg?alt=media&token=479a921c-10d2-462c-a90b-93cd59cfcf96',
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/studio-10.jpg?alt=media&token=fd9b48ac-03c9-40a3-8c10-aea8612c716b',
];

interface PhotosScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const PhotosScreen: React.FC<PhotosScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedImage = selectedIndex !== null ? imageList[selectedIndex] : null;

    // Swipe handling state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < imageList.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    // Auto-scroll logic for thumbnail strip
    useEffect(() => {
        if (selectedIndex !== null) {
            const thumb = document.getElementById(`thumb-${selectedIndex}`);
            if (thumb) {
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedIndex]);

    // Wrap handlers for the div props
    const handleTouchStart = (e: React.TouchEvent) => onTouchStart(e);
    const handleTouchMove = (e: React.TouchEvent) => onTouchMove(e);
    const handleTouchEnd = () => onTouchEnd();

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={onClose}
                style={{ pointerEvents: 'auto' }}
            />

            {/* Main App Container */}
            <div
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-md pt-4 pb-2 px-4 sticky top-0 z-10 border-b border-gray-200 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500">Albums</span>
                        <h2 className="text-3xl font-bold text-black tracking-tight">Recents</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="mb-1 p-2 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Photo Grid */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="grid grid-cols-3 gap-0.5 pb-20">
                        {imageList.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="aspect-square overflow-hidden cursor-pointer active:opacity-75"
                                onClick={() => setSelectedIndex(index)}
                            >
                                <img
                                    src={imgSrc}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                        {imageList.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-gray-400">
                                No photos found in assets/images
                            </div>
                        )}
                    </div>
                </div>

                {/* IOS Bottom Bar Imitation */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 flex justify-around items-center text-gray-400 text-xs font-medium">
                    <div className="flex flex-col items-center space-y-1 text-blue-500">
                        <div className="w-6 h-5 bg-blue-500 rounded-sm"></div>
                        <span>Library</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-6 h-5 border-2 border-gray-300 rounded-sm"></div>
                        <span>For You</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-6 h-5 border-2 border-gray-300 rounded-sm"></div>
                        <span>Albums</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-6 h-5 border-2 border-gray-300 rounded-sm"></div>
                        <span>Search</span>
                    </div>
                </div>
            </div>

            {/* Full Screen Lightbox */}
            {/* Full Screen Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center animate-fade-in"
                    style={{ pointerEvents: 'auto' }}
                    onClick={() => setSelectedIndex(null)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button
                        className="absolute top-12 right-6 text-white font-semibold text-lg hover:text-gray-300 z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex(null);
                        }}
                    >
                        Done
                    </button>

                    <div className="flex-1 w-full flex items-center justify-center p-4 relative">
                        {/* Navigation Arrows (Desktop) */}
                        <button
                            className="hidden md:block absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            className="hidden md:block absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <img
                            src={selectedImage}
                            alt="Full screen"
                            className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Horizontal Thumbnail Strip */}
                    <div className="w-full h-20 bg-black/50 backdrop-blur-sm overflow-x-auto whitespace-nowrap px-4 py-2 flex items-center gap-2 no-scrollbar"
                        onClick={(e) => e.stopPropagation()}>
                        {imageList.map((imgSrc, index) => (
                            <div
                                key={index}
                                id={`thumb-${index}`}
                                className={`inline-block h-full aspect-square flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${selectedIndex === index ? 'border-yellow-400 opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                                    }`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <img
                                    src={imgSrc}
                                    alt={`Thumb ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotosScreen;
