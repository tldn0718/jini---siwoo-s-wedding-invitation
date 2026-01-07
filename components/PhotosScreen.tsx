import React, { useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

interface PhotosScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const PhotosScreen: React.FC<PhotosScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    const [imageList, setImageList] = useState<string[]>([]);
    const [thumbnailList, setThumbnailList] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedImage = selectedIndex !== null ? imageList[selectedIndex] : null;

    useEffect(() => {
        const fetchImages = async () => {
            const originalsRef = ref(storage, 'originals');
            const thumbnailsRef = ref(storage, 'thumbnails');

            try {
                const [originalsRes, thumbnailsRes] = await Promise.all([
                    listAll(originalsRef),
                    listAll(thumbnailsRef)
                ]);

                const getSortedUrls = async (res: any) => {
                    const urlPromises = res.items.map((itemRef: any) => getDownloadURL(itemRef));
                    const urls = await Promise.all(urlPromises);
                    return urls.sort((a: string, b: string) => {
                        const aMatch = a.match(/studio-(\d+)/);
                        const bMatch = b.match(/studio-(\d+)/);
                        if (!aMatch || !bMatch) return 0;
                        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                    });
                };

                const [sortedOriginals, sortedThumbnails] = await Promise.all([
                    getSortedUrls(originalsRes),
                    getSortedUrls(thumbnailsRes)
                ]);

                setImageList(sortedOriginals);
                setThumbnailList(sortedThumbnails);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        fetchImages();
    }, []);

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
                        {thumbnailList.map((imgSrc, index) => (
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
                        {thumbnailList.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-gray-400">
                                \ ㅇㅅㅇ /
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

                    <div className="flex-1 w-full flex items-center justify-center p-4 relative min-h-0 overflow-hidden">
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
                        {thumbnailList.map((imgSrc, index) => (
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
