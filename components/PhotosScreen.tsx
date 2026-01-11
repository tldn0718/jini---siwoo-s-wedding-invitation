import React, { useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

interface PhotosScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

// Internal Component for Random Skeleton Display
const RandomSkeleton: React.FC<{ className?: string, iconSize?: string, index?: number }> = ({ className, iconSize = "text-2xl", index }) => {
    const [style] = useState(() => {
        const colors = ['bg-[#fff0f5]', 'bg-[#f0f9ff]', 'bg-[#fcf7de]', 'bg-[#f3e5f5]'];
        const icons = ['📷', '💖', '✨', '🌸', '🎀'];

        // Deterministic Randomness based on index if provided
        if (typeof index === 'number') {
            return {
                color: colors[index % colors.length],
                icon: icons[index % icons.length]
            };
        }

        // Fallback to pure random
        return {
            color: colors[Math.floor(Math.random() * colors.length)],
            icon: icons[Math.floor(Math.random() * icons.length)]
        };
    });

    return (
        <div className={`absolute inset-0 ${style.color} flex items-center justify-center ${className}`}>
            <span className={`${iconSize} animate-bounce`}>{style.icon}</span>
        </div>
    );
};

interface Album {
    name: string;
    coverUrl: string;
    folderRef: any;
}

// Internal Component for Image with Loading State
const ImageWithSkeleton: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void; index?: number }> = ({ src, alt, className, onClick, index }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
            {!isLoaded && (
                <RandomSkeleton index={index} />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

const PhotosScreen: React.FC<PhotosScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');

    // View State
    const [view, setView] = useState<'albums' | 'photos'>('albums');
    const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

    // Data State
    const [albums, setAlbums] = useState<Album[]>([]);
    const [imageList, setImageList] = useState<string[]>([]);
    const [thumbnailList, setThumbnailList] = useState<string[]>([]);

    // Viewer State
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedImage = selectedIndex !== null ? imageList[selectedIndex] : null;
    const [isLightboxImageLoaded, setIsLightboxImageLoaded] = useState(false); // For Lightbox loader

    // Reset lightbox loader when image changes
    useEffect(() => {
        setIsLightboxImageLoaded(false);
    }, [selectedIndex]);

    // Fetch Albums (Folders)
    useEffect(() => {
        const fetchAlbums = async () => {
            const thumbnailsRef = ref(storage, 'thumbnails');
            try {
                const res = await listAll(thumbnailsRef);
                const albumPromises = res.prefixes.map(async (folderRef) => {
                    // Start navigation into the folder to find a cover image
                    const folderRes = await listAll(folderRef);
                    let coverUrl = '';
                    if (folderRes.items.length > 0) {
                        // Use the first item as cover
                        const firstItem = folderRes.items[0];
                        coverUrl = await getDownloadURL(firstItem);
                    }

                    return {
                        name: folderRef.name,
                        coverUrl,
                        folderRef
                    };
                });

                const fetchedAlbums = await Promise.all(albumPromises);

                // Custom sort order
                const sortOrder: { [key: string]: number } = {
                    'snap': 0,
                    'studio': 1,
                    'films': 2
                };

                fetchedAlbums.sort((a, b) => {
                    const orderA = sortOrder[a.name] ?? 999;
                    const orderB = sortOrder[b.name] ?? 999;

                    if (orderA !== orderB) {
                        return orderA - orderB;
                    }
                    return a.name.localeCompare(b.name);
                });

                setAlbums(fetchedAlbums);

            } catch (error) {
                console.error("Failed to fetch albums:", error);
            }
        };

        fetchAlbums();
    }, []);

    // Fetch Photos for Selected Album
    useEffect(() => {
        if (view === 'photos' && selectedAlbum) {
            const fetchPhotos = async () => {
                setImageList([]);
                setThumbnailList([]);

                const thumbnailsRef = ref(storage, `thumbnails/${selectedAlbum}`);
                const originalsRef = ref(storage, `originals/${selectedAlbum}`);

                try {
                    const [thumbnailsRes, originalsRes] = await Promise.all([
                        listAll(thumbnailsRef),
                        listAll(originalsRef)
                    ]);

                    const getSortedUrlsByRef = async (res: any) => {
                        const items = res.items;
                        items.sort((a: any, b: any) => {
                            // Try to extract numbers from names
                            const aMatch = a.name.match(/(\d+)/);
                            const bMatch = b.name.match(/(\d+)/);
                            if (aMatch && bMatch) {
                                return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                            }
                            return a.name.localeCompare(b.name);
                        });

                        return Promise.all(items.map((item: any) => getDownloadURL(item)));
                    };


                    const sortedThumbnails = await getSortedUrlsByRef(thumbnailsRes);
                    const sortedOriginals = await getSortedUrlsByRef(originalsRes);

                    setThumbnailList(sortedThumbnails);
                    setImageList(sortedOriginals.length > 0 ? sortedOriginals : sortedThumbnails);

                } catch (e) {
                    console.error("Failed to fetch photos", e);
                }
            };

            fetchPhotos();
        }
    }, [view, selectedAlbum]);


    // Swipe & Touch Logic (Unchanged ideally, simplified here)
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) handleNext();
        else if (isRightSwipe) handlePrev();
    };

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < imageList.length - 1) setSelectedIndex(selectedIndex + 1);
    };
    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };

    // Auto-scroll
    useEffect(() => {
        if (selectedIndex !== null) {
            const thumb = document.getElementById(`thumb-${selectedIndex}`);
            if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [selectedIndex]);

    // Prefetch Next/Prev Images
    useEffect(() => {
        if (selectedIndex === null || imageList.length === 0) return;

        const indicesToPrefetch = [
            selectedIndex + 1, // Next
            selectedIndex - 1  // Prev
        ];

        indicesToPrefetch.forEach(index => {
            if (index >= 0 && index < imageList.length) {
                const img = new Image();
                img.src = imageList[index];
            }
        });
    }, [selectedIndex, imageList]);

    const handleTouchStart = (e: React.TouchEvent) => onTouchStart(e);
    const handleTouchMove = (e: React.TouchEvent) => onTouchMove(e);
    const handleTouchEnd = () => onTouchEnd();

    // Theme & Animation (Unchanged)
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#ffffff');
        requestAnimationFrame(() => setAnimationClass('scale-100 opacity-100'));
        return () => { if (meta) meta.setAttribute('content', '#fdf2f8'); };
    }, []);

    useEffect(() => {
        if (isClosing) {
            setAnimationClass('scale-90 opacity-0');
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', '#fdf2f8');
        }
    }, [isClosing]);


    // Handlers
    const handleAlbumClick = (albumName: string) => {
        setSelectedAlbum(albumName);
        setView('photos');
    };

    const handleBackClick = () => {
        if (view === 'photos') {
            setView('albums');
            setSelectedAlbum(null);
        } else {
            onClose();
        }
    };

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
                        {/* Breadcrumb-ish */}
                        <div className="flex items-center gap-1 text-blue-500 cursor-pointer" onClick={handleBackClick}>
                            {view === 'photos' && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="text-base">Albums</span>
                                </>
                            )}
                        </div>
                        <h2 className={`text-3xl font-bold text-black tracking-tight ${view === 'photos' ? 'mt-1' : 'mt-5'}`}>
                            {view === 'albums' ? 'Albums' : selectedAlbum}
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="mb-1 p-2 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-white">

                    {/* ALBUMS Grid */}
                    {view === 'albums' && (
                        <div className="grid grid-cols-2 gap-4 p-4">
                            {albums.length > 0 ? (
                                albums.map((album, index) => (
                                    <div
                                        key={album.name}
                                        className="flex flex-col cursor-pointer group"
                                        onClick={() => handleAlbumClick(album.name)}
                                    >
                                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2 shadow-sm relative">
                                            {album.coverUrl ? (
                                                <ImageWithSkeleton
                                                    src={album.coverUrl}
                                                    alt={album.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    index={index}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Gradient Overlay for style */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 truncate">{album.name}</h3>
                                    </div>
                                ))
                            ) : (

                                Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-sm bg-gray-50 relative animate-pulse">
                                            <RandomSkeleton index={i} />
                                        </div>
                                        <div className="h-5 bg-gray-100 rounded w-2/3 animate-pulse" />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* PHOTOS Grid */}
                    {view === 'photos' && (
                        <div className="grid grid-cols-3 gap-0.5 pb-20">
                            {thumbnailList.length > 0 ? (
                                thumbnailList.map((imgSrc, index) => (
                                    <ImageWithSkeleton
                                        key={index}
                                        src={imgSrc}
                                        alt={`Photo ${index + 1}`}
                                        className="aspect-square cursor-pointer active:opacity-75"
                                        onClick={() => setSelectedIndex(index)}
                                        index={index}
                                    />
                                ))
                            ) : (
                                // Skeleton Grid for Photos
                                Array.from({ length: 15 }).map((_, i) => (
                                    <div key={i} className="aspect-square relative overflow-hidden animate-pulse">
                                        <RandomSkeleton iconSize="text-xl" index={i} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>

                {/* iOS Bottom Bar Imitation */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 flex justify-around items-center text-gray-400 text-xs font-medium z-20">
                    <div className={`flex flex-col items-center space-y-1 cursor-pointer ${view === 'photos' && !selectedAlbum ? 'text-blue-500' : ''}`}>
                        <div className="w-6 h-5 border-2 border-gray-300 rounded-sm"></div>
                        <span>Library</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-6 h-5 border-2 border-gray-300 rounded-sm"></div>
                        <span>For You</span>
                    </div>
                    <div
                        className={`flex flex-col items-center space-y-1 cursor-pointer ${view === 'albums' ? 'text-blue-500' : ''}`}
                        onClick={() => {
                            setView('albums');
                            setSelectedAlbum(null);
                        }}
                    >
                        <div className={`w-6 h-5 rounded-sm ${view === 'albums' ? 'bg-blue-500' : 'border-2 border-gray-300'}`}></div>
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
                        {/* Lightbox Loader - Cute Version */}
                        {!isLightboxImageLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                                <span className="text-6xl animate-bounce mb-4">✨</span>
                                <p className="font-neodgm text-white text-lg tracking-widest animate-pulse">
                                    Loading...
                                </p>
                            </div>
                        )}

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
                            className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-300 relative z-10 ${!isLightboxImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                            onClick={(e) => e.stopPropagation()}
                            onLoad={() => setIsLightboxImageLoaded(true)}
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
