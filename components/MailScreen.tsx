import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Assets
import catImg from '../assets/mail/cat.png';
import envelopeImg from '../assets/mail/envelope.png';
import heartsImg from '../assets/mail/hearts.png';

interface MailScreenProps {
    onClose: () => void;
    isClosing: boolean;
}

interface GuestMessage {
    id: string;
    name: string;
    content: string;
    createdAt: any;
}

const MailScreen: React.FC<MailScreenProps> = ({ onClose, isClosing }) => {
    const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
    const [view, setView] = useState<'HOME' | 'WRITE' | 'LIST'>('HOME');
    const [messages, setMessages] = useState<GuestMessage[]>([]);
    const [formData, setFormData] = useState({ name: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Animation & Theme Color
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', '#ffe4e1'); // Misty Rose / Pinkish
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

    // Firestore Subscription
    useEffect(() => {
        const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as GuestMessage[];
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.content.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'guestbook'), {
                name: formData.name,
                content: formData.content,
                createdAt: serverTimestamp()
            });
            setFormData({ name: '', content: '' });
            setView('LIST');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("전송에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderHome = () => (
        <div className="flex flex-col items-center justify-center h-full space-y-8 bg-[#fff0f5] text-center p-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 text-[#e6e6fa] text-6xl opacity-50">☾</div>
            <div className="absolute top-20 right-10 text-[#e6e6fa] text-4xl opacity-50">✦</div>
            <div className="absolute bottom-20 left-5 text-[#e6e6fa] text-5xl opacity-50">★</div>

            {/* Close/Home Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 text-[#ffb6c1] hover:text-[#ff69b4] transition-colors active:scale-90"
                aria-label="Close Mail App"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="z-10 flex flex-col items-center animate-fade-in-up">
                <h2 className="font-neodgm text-lg mb-2">You're invited to</h2>
                <img src={heartsImg} alt="Hearts" className="h-8 pixelated mb-4 animate-bounce" />

                <img src={catImg} alt="Pixel Cat" className="w-32 h-auto pixelated mb-4" />

                <h1 className="font-neodgm text-2xl font-bold tracking-widest mb-1">SIWOO & JINI'S</h1>
                <h1 className="font-ultra text-4xl text-[#ff69b4] tracking-wider" style={{ textShadow: '2px 2px 0px #ff1493' }}>MAIL BOX</h1>
            </div>

            <div className="z-10 w-full max-w-xs space-y-4">
                <button
                    onClick={() => setView('LIST')}
                    className="w-full bg-[#ffb6c1] border-4 border-white text-white font-neodgm py-3 rounded-full shadow-[0_4px_0_#ff69b4] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <span className="text-xl">🏠</span>
                    MAIL BOX
                </button>
                <button
                    onClick={() => setView('WRITE')}
                    className="w-full bg-[#ff69b4] border-4 border-white text-white font-neodgm py-3 rounded-full shadow-[0_4px_0_#c71585] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <span className="text-xl">✉️</span>
                    SENDING MAIL
                </button>
            </div>
        </div>
    );

    const renderWrite = () => (
        <div className="flex flex-col h-full bg-[#ffe4e1] p-6">
            <div className="bg-white border-4 border-[#ffb6c1] p-4 rounded-lg shadow-xl flex-1 flex flex-col relative">
                {/* Window Title Bar */}
                <div className="absolute -top-5 left-0 right-0 h-8 bg-[#ffb6c1] border-x-4 border-t-4 border-[#ffb6c1] rounded-t-lg flex items-center justify-end px-2 gap-1">
                    <div className="w-3 h-3 bg-white border border-gray-300"></div>
                    <div className="w-3 h-3 bg-white border border-gray-300"></div>
                    <button onClick={() => setView('HOME')} className="w-4 h-4 bg-[#ff69b4] text-white flex items-center justify-center text-xs font-bold leading-none">x</button>
                </div>

                <div className="mt-4 flex items-center gap-2 border-b-2 border-[#ffb6c1] pb-2 mb-4">
                    <img src={envelopeImg} alt="Env" className="w-6 h-6 pixelated" />
                    <span className="font-neodgm text-[#ff69b4]">NAME.</span>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex-1 bg-transparent border-none outline-none font-neodgm text-black placeholder-gray-300"
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="flex-1 w-full resize-none border-none outline-none font-neodgm text-black bg-transparent placeholder-gray-300 leading-relaxed"
                    placeholder="축하 메시지를 남겨주세요..."
                />

                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-[#ffb6c1] px-8 py-2 border-2 border-black text-black font-neodgm font-bold hover:bg-[#ff69b4] hover:text-white transition-colors shadow-[2px_2px_0_#000]"
                    >
                        {isSubmitting ? 'SENDING...' : 'SEND'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderList = () => (
        <div className="flex flex-col h-full bg-[#fff0f5]">
            {/* Header */}
            <div className="bg-white border-b-4 border-[#ffb6c1] p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <img src={envelopeImg} alt="Env" className="w-6 h-6 pixelated" />
                    <span className="font-neodgm font-bold">It's mail box</span>
                </div>
                <button onClick={() => setView('HOME')} className="font-bold text-lg">✕</button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-white border-2 border-[#ffb6c1] p-3 rounded-lg shadow-sm flex items-start gap-3">
                        <div className="bg-[#ffe4e1] p-2 rounded-md border border-[#ffb6c1] flex-shrink-0">
                            <img src={envelopeImg} alt="Icon" className="w-6 h-6 pixelated" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-neodgm font-bold text-[#ff69b4] mb-1">[{msg.name}]</h4>
                            <p className="font-neodgm text-sm text-gray-700 whitespace-pre-wrap break-all">{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Nav */}
            <div className="bg-[#ffc0cb] p-2 flex justify-center gap-4 border-t-4 border-white">
                <button onClick={() => setView('HOME')} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                    <span className="text-xl">🏠</span>
                </button>
                <button onClick={() => setView('WRITE')} className="px-4 py-1 bg-white/50 rounded-full font-neodgm text-white font-bold hover:bg-white hover:text-[#ff69b4] transition-colors border-2 border-white border-dashed">
                    MY MAIL
                </button>
            </div>
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

            {/* Main App Container */}
            <div
                className={`relative w-full h-full md:max-w-md md:max-h-[85vh] bg-[#fff0f5] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {view === 'HOME' && renderHome()}
                {view === 'WRITE' && renderWrite()}
                {view === 'LIST' && renderList()}
            </div>
        </div>
    );
};

export default MailScreen;
