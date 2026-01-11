import React, { useState, useEffect } from 'react';

// Landscape Avatar Component (SVG)
const LandscapeAvatar: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative overflow-hidden bg-[#D0F0FF] ${className}`}>
        {/* Cloud */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 h-1/3 bg-white rounded-full opacity-90 shadow-sm" />
        {/* Hills */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#9BCF53] rounded-t-[100%] scale-150 translate-y-2" />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#5F8D34] rounded-t-[50%] scale-125 translate-y-4 opacity-80" />
    </div>
);

// Types
interface MessageProfile {
    id: string;
    name: string;
    statusMsg?: string;
    avatarUrl?: string; // If present, use img, else use LandscapeAvatar
    lastMessage?: string;
    chatContent?: { text: string; time: string; isMe?: boolean }[];
}

interface MessagesScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    // Views: 'LIST', 'PROFILE_MODAL', 'CHAT_ROOM'
    const [currentView, setCurrentView] = useState<'LIST' | 'CHAT_ROOM'>('LIST');
    const [selectedProfile, setSelectedProfile] = useState<MessageProfile | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', '#FFFEF2');
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
                if (showProfileModal) {
                    setShowProfileModal(false);
                } else if (currentView === 'CHAT_ROOM') {
                    setCurrentView('LIST');
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, currentView, showProfileModal]);

    // Data - Using the same data
    const profiles: MessageProfile[] = [
        {
            id: 'siwoo',
            name: '시우',
            statusMsg: '오랜만에 학교 가겠네...',
            lastMessage: '오랜만에 학교 가겠네...',
            chatContent: [
                { text: '안녕하세요, 신랑 시우입니다.', time: '20:41' },
                { text: '먼 길 와주셔서 감사합니다.', time: '20:41' },
                { text: '행복하게 잘 살겠습니다!', time: '20:41' }
            ]
        },
        {
            id: 'jini',
            name: '지니',
            statusMsg: '결혼식에 많이 왔으면 좋겠다...',
            lastMessage: '결혼식에 많이 왔으면 좋겠다...',
            chatContent: [
                { text: '안녕하세요! 신부 지니입니다.', time: '20:41' },
                { text: '저희 결혼식에 와주셔서 정말 감사드려요!', time: '20:41' },
                { text: '맛있는 식사와 함께 즐거운 시간 보내세요 :)', time: '20:41' }
            ]
        },
        { id: 'hyun', name: '현규', statusMsg: '우리딸 최고 이뿌네', lastMessage: '우리딸 최고 이뿌네', chatContent: [{ text: '축하해주셔서 감사합니다!', time: '20:41' }] },
        { id: 'seok', name: '석봉', statusMsg: '우리 큰공주 모델이네', lastMessage: '우리 큰공주 모델이네', chatContent: [{ text: '감사합니다!', time: '20:41' }] },
        { id: 'mom', name: '시우맘', statusMsg: '우리 아들 화이팅', lastMessage: '우리 아들 화이팅', chatContent: [{ text: '감사합니다!', time: '20:41' }] },
        { id: 'dad', name: '시우파파', statusMsg: '우리 아들 최고다!', lastMessage: '우리 아들 최고다!', chatContent: [{ text: '감사합니다!', time: '20:41' }] },
    ];

    const handleProfileClick = (e: React.MouseEvent, profile: MessageProfile) => {
        e.stopPropagation();
        setSelectedProfile(profile);
        setShowProfileModal(true);
    };

    const handleRowClick = (profile: MessageProfile) => {
        setSelectedProfile(profile);
        setCurrentView('CHAT_ROOM');
    };

    // Render List
    const renderList = () => (
        <div className="flex-1 overflow-y-auto bg-[#FFFEF2]">
            {/* Header */}
            <div className="relative pt-6 px-4 pb-4 bg-[#FFFEF2]">
                <button onClick={onClose} className="absolute left-4 top-6">
                    <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </button>
                <h1 className="text-3xl font-bold text-center">Messages</h1>
            </div>

            {/* Conversations Section */}
            <div className="mb-2">
                <div className="px-4 py-2">
                    <span className="text-lg font-bold text-black">대화</span>
                </div>
                <div
                    className="flex items-center px-4 py-3 active:bg-[#f0f0e0] transition-colors cursor-pointer"
                    onClick={() => handleRowClick(profiles[0])}
                >
                    <div
                        className="relative w-14 h-14 rounded-full bg-[#D0F0FF] flex-shrink-0 cursor-pointer overflow-hidden border-2 border-black"
                        onClick={(e) => handleProfileClick(e, profiles[0])}
                    >
                        <LandscapeAvatar className="w-full h-full" />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-lg font-bold text-black truncate">{profiles[0].name}</span>
                        </div>
                        <p className="text-gray-500 text-sm truncate pr-4">{profiles[0].lastMessage}</p>
                    </div>
                </div>
            </div>

            {/* Friends Section */}
            <div>
                <div className="px-4 py-2 mt-2">
                    <span className="text-lg font-bold text-black">친구</span>
                </div>
                {profiles.slice(1).map(profile => (
                    <div
                        key={profile.id}
                        className="flex items-center px-4 py-3 active:bg-[#f0f0e0] transition-colors cursor-pointer"
                        onClick={() => handleRowClick(profile)}
                    >
                        <div
                            className="relative w-14 h-14 rounded-full bg-[#D0F0FF] flex-shrink-0 cursor-pointer overflow-hidden border-2 border-black"
                            onClick={(e) => handleProfileClick(e, profile)}
                        >
                            <LandscapeAvatar className="w-full h-full" />
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-lg font-bold text-black truncate">{profile.name}</span>
                            </div>
                            <p className="text-gray-500 text-sm truncate pr-4">{profile.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Chat Room
    const renderChatRoom = () => {
        if (!selectedProfile) return null;
        return (
            <div className="absolute inset-0 bg-[#FFFEF2] flex flex-col z-20 animate-slide-in-right">
                {/* Header */}
                <div className="bg-[#FFFEF2] px-4 py-3 flex items-center justify-between sticky top-0 md:rounded-t-3xl border-b border-black/5">
                    <button onClick={() => setCurrentView('LIST')} className="focus:outline-none">
                        <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </button>
                    <span className="text-xl font-bold">Messages</span>
                    <button className="text-black opacity-0 pointer-events-none">
                        {/* Placeholder for balance */}
                        <div className="w-8 h-8" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Profile Info in Chat */}
                    <div className="flex flex-col items-center mb-8 mt-4">
                        <div className="w-20 h-20 rounded-full border-2 border-black overflow-hidden mb-2">
                            <LandscapeAvatar className="w-full h-full" />
                        </div>
                        <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
                        <p className="text-gray-500 text-sm">iMessage</p>
                    </div>

                    {selectedProfile.chatContent?.map((msg, idx) => (
                        <div key={idx} className="flex gap-3 mb-4 items-end">
                            <div className="w-10 h-10 rounded-full border border-black overflow-hidden flex-shrink-0">
                                <LandscapeAvatar className="w-full h-full" />
                            </div>
                            <div className="flex flex-col items-start max-w-[70%]">
                                <span className="text-xs text-gray-800 font-bold mb-1 ml-1">{selectedProfile.name}</span>
                                <div className="flex items-end gap-2">
                                    <div className="bg-[#EEFF6E] p-3 rounded-2xl rounded-tl-none border-2 border-black shadow-sm text-sm sm:text-base leading-relaxed break-words relative">
                                        <span className="relative z-10 font-medium">{msg.text}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-medium mb-1 min-w-[30px]">{msg.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area (Fake) */}
                <div className="bg-[#FFFEF2] px-4 py-3 flex items-center gap-3 pb-8 md:pb-4 border-t border-black/5">
                    <button className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <div className="flex-1 bg-white border-2 border-gray-200 rounded-full px-4 py-2 text-sm text-gray-400">
                        iMessage
                    </div>
                    <button className="text-[#EEFF6E] bg-black rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    // Render Profile Modal
    const renderProfileModal = () => {
        if (!showProfileModal || !selectedProfile) return null;
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={() => setShowProfileModal(false)}>
                {/* Modal Card */}
                <div className="bg-white w-[85%] max-w-xs rounded-[40px] overflow-hidden shadow-2xl flex flex-col items-center relative" onClick={e => e.stopPropagation()}>

                    {/* Top Half Image */}
                    <div className="w-full h-48 bg-[#D0F0FF] relative overflow-hidden border-b-2 border-black/5">
                        <LandscapeAvatar className="w-full h-full scale-150 translate-y-10" />
                    </div>

                    {/* Content */}
                    <div className="w-full flex-1 flex flex-col items-center pt-6 pb-8 px-6 bg-white">
                        <h2 className="text-3xl font-extrabold mb-2 text-black">{selectedProfile.name}</h2>
                        <p className="text-gray-500 text-sm mb-8 text-center font-medium leading-relaxed">{selectedProfile.statusMsg}</p>

                        <button
                            className="bg-[#EEFF6E] w-full py-4 rounded-full border-2 border-black flex items-center justify-center gap-2 hover:bg-[#E5F55D] transition-colors shadow-sm active:translate-y-0.5"
                            onClick={() => {
                                setShowProfileModal(false);
                                setCurrentView('CHAT_ROOM');
                            }}
                        >
                            <span className="text-black font-bold text-lg">대화하기</span>
                        </button>
                    </div>

                    {/* Close Btn (Hidden or subtle? Design didn't clearly show one, but UX needs it. Standard X top right) */}
                    {/* Making it white/transparent on top of image */}
                    <button
                        className="absolute top-4 right-4 text-gray-500 bg-white/50 rounded-full p-1 hover:bg-white"
                        onClick={() => setShowProfileModal(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

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
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-[#FFFEF2] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Views */}
                <div className="relative flex-1 bg-[#FFFEF2] overflow-hidden pt-8">
                    {currentView === 'LIST' && renderList()}
                    {currentView === 'CHAT_ROOM' && renderChatRoom()}
                </div>

                {renderProfileModal()}
            </div>
        </div>
    );
};

export default MessagesScreen;
