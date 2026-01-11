import React, { useState, useEffect } from 'react';

// Assets
import ringImg from '../assets/invite/ring.png';
import cloud1Img from '../assets/invite/cloud1.png';
import cloud2Img from '../assets/invite/cloud2.png';
import diamondsImg from '../assets/invite/diamonds.png';
import sparkles1Img from '../assets/invite/sparkles1.png';
import sparkles2Img from '../assets/invite/sparkles2.png';
import cat1Img from '../assets/invite/cat1.png';
import cat2Img from '../assets/invite/cat2.png';
import tapeImg from '../assets/invite/tape.png';
import cursorImg from '../assets/invite/cursor.png';

interface InviteScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const InviteScreen: React.FC<InviteScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');

    // Theme Color & Entrance Animation
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', '#e0f7fa');
        }

        requestAnimationFrame(() => {
            setAnimationClass('scale-100 opacity-100');
        });

        return () => {
            if (meta) {
                meta.setAttribute('content', '#fdf2f8');
            }
        };
    }, []);

    // Close Animation Handling
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

    // Share Handler
    const handleShare = async () => {
        let shareData: any = {
            title: 'Siwoo & Jini Wedding',
            text: 'We are getting married! Join our team at SNU E-Lounge.',
            url: window.location.href,
        };

        // Attempt to convert the ring image to a File for sharing
        try {
            const response = await fetch(ringImg);
            const blob = await response.blob();
            const file = new File([blob], 'invite_ring.png', { type: blob.type });

            // Check if file sharing is supported
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                shareData.files = [file];
            }
        } catch (e) {
            console.log("Failed to load image for sharing", e);
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text (Clipboard API): ', err);
            }
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
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-[#e0f7fa] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl z-20 text-blue-800 font-bold hover:scale-110 transition-transform"
                >
                    ✕
                </button>

                {/* Sky Background Decor */}
                <div className="absolute top-4 tall:top-8 inset-x-0 flex flex-col items-center gap-1 opacity-60 pointer-events-none z-0">
                    <p className="text-[10px] text-black font-bold whitespace-nowrap mt-1">*:.｡..｡.:+・ﾟ・✽:.｡..｡.:+・ﾟ・✽:.｡..｡.:+・ﾟ・✽:.｡..｡.:+・ﾟ・</p>
                    <p className="text-[10px] text-black font-bold whitespace-nowrap">✩‧  ₊˚ *  .⋆  ·ฺ⁺˚    ᘏ⑅ᘏ ₊ * ⋆ ·ฺ.  ✩* . ⋆·ฺ  .  ⁺˚</p>
                    <p className="text-[10px] text-black font-bold whitespace-nowrap">‧₊˚.⋆·ฺ.‧₊˚.⋆‧₊˚.⋆⁺˚ ੈ‧˚૮꒰˵• ﻌ •˵꒱აੈ✩‧₊˚ੈ*:ﾟ*。.⋆·ฺᐝ.‧₊˚.⋆⁺˚</p>
                </div>

                {/* THE FLYER */}
                <div className="relative w-[320px] bg-[#90cdf4] shadow-xl transform -rotate-2 mb-12">
                    {/* Tape */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 w-32 rotate-2">
                        <img src={tapeImg} alt="Tape" className="w-full opacity-90 drop-shadow-md" />
                    </div>

                    <div className="p-5 tall:p-6 pb-24 tall:pb-24 text-center flex flex-col items-center">
                        <h1 className="font-neodgm text-3xl mb-1 mt-2 tall:mt-4 text-black tracking-tighter">We're hiring!</h1>
                        <h1 className="font-neodgm text-3xl mb-2 tall:mb-4 text-black tracking-tighter">Join our team.</h1>

                        <p className="font-neodgm text-xs text-gray-700 mb-4 tall:mb-6 tracking-tight">
                            EVEN IF YOU'RE AN ALIEN, YOU'RE WELCOME!
                        </p>

                        <div className="relative w-full h-32 tall:h-40 flex items-center justify-center mb-6 tall:mb-8">
                            {/* Clouds & Diamonds */}
                            <div className="absolute top-0 right-4 flex flex-col items-center">
                                <img src={cloud1Img} className="w-16 opacity-90 animate-pulse" alt="cloud" />
                                <div className="mt-1">
                                    <img src={diamondsImg} className="w-12" alt="diamonds" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-4 flex flex-col items-center">
                                <img src={cloud2Img} className="w-16 opacity-90 animate-pulse delay-75" alt="cloud" />
                                <div className="mt-1">
                                    <img src={diamondsImg} className="w-12" alt="diamonds" />
                                </div>
                            </div>

                            {/* Sparkles */}
                            <img src={sparkles1Img} className="absolute top-8 left-8 w-6 animate-bounce" alt="sparkle" />
                            <img src={sparkles2Img} className="absolute bottom-12 right-12 w-6 animate-bounce delay-100" alt="sparkle" />

                            {/* Ring */}
                            <img src={ringImg} alt="Ring" className="w-32 z-10 drop-shadow-lg" />
                        </div>
                    </div>

                    {/* Tear-off Tabs */}
                    <div className="absolute bottom-[-50px] left-0 right-0 flex justify-between px-1">
                        {/* Hand Cursor */}
                        <img src={cursorImg} alt="cursor" className="absolute bottom-[-30px] right-16 w-8 z-20 animate-bounce" />

                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                onClick={handleShare}
                                className="w-[19%] h-32 bg-[#90cdf4] border-t-2 border-dashed border-blue-300 relative transform hover:translate-y-2 transition-transform cursor-pointer shadow-md origin-top active:translate-y-4"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Text only on middle tabs (2, 3, 4) */}
                                    {(i >= 2 && i <= 4) && (
                                        <p className="font-neodgm text-[9px] text-black whitespace-nowrap transform -rotate-90 leading-tight">
                                            서울대학교 이라운지<br />
                                            2026.3.28(SAT)<br />
                                            2PM
                                        </p>
                                    )}
                                </div>
                                {/* Cat Icons on outer tabs */}
                                {i === 1 && (
                                    <img src={cat1Img} alt="cat" className="absolute bottom-8 tall:bottom-12 left-1/2 transform -translate-x-1/2 w-8 opacity-80" />
                                )}
                                {i === 5 && (
                                    <img src={cat2Img} alt="cat" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 opacity-80" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-6 tall:bottom-10 left-10 text-left font-neodgm text-xs">
                    <p className="tracking-widest">║▌│█║▌│ █║▌│█│║▌║</p>
                    <p className="mt-1 text-[10px]">scanning code...</p>
                </div>
            </div>
        </div>
    );
};

export default InviteScreen;
