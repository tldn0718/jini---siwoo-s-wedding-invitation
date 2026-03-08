import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Proposal Easter Egg ---
const PROPOSAL_QUIZ = '우리의 1일은? (YYYYMMDD)';
const PROPOSAL_ANSWER = '20150123';
const PROPOSAL_MUSIC_URL =
    'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/across_the_universe.mp3?alt=media&token=c4f3046c-9ad2-4995-a6cb-797f04f43d51';
const PROPOSAL_LETTER = `소중한 나의 지니에게.

산전수전을 다 거쳐 이 말을 전하는 날이 드디어 오네요!
참 오랜 시간을 만나고 이미 결혼까지 확정짓고 같이 살면서 한 몸처럼 지내고 있는데도
막상 이 말을 전하려니까 좀 쑥스러운거같아요.
그래도 중요한 말이니까 한 번 최대한 JJS를 담아 말해볼게요 ^___^

아무래도 이 이야기를 시작하려니 우리의 첫만남부터 생각나는거같아요.
결혼까지 하게 되는 사람은 처음부터 잘 맞는 사람이라고 많이들 얘기하는데
생각해보면 지니도 그런 사람이었던거같아요.
매점에서 갑작스럽게 이야기를 하게 됐을 때도
이런저런 주제에 대해서 잘 맞고 재밌었던 기억이 있어요.
아니, 어쩌면 훨씬 그 전부터,
지니가 제게 머리핀 이쁘냐고 물었을 때 제가 막 귀여워했던 그 순간부터 우리는 잘 맞는 사이,
그러니까 결혼할 운명이었던건지도 모르겠네요.
그때부터 전 지니의 숨겨진 귀여움을 알아챈 사람이니까요!

중간중간 부침도 있었죠.
하지만 그런 과정이 있었기 때문에 우리는 서로를 더 소중히 여기고 잘 이해할 수 있게 됐다고 생각해요. 
망치질에 쇠가 단단해지듯 어느덧 10년이 지난 우리 사이는 앞으로 평생을 같이 살기에 누구보다 튼튼해진 관계라고 믿어요.
우리가 함께 할 시간이 언제나 꽃길일 수도 없고
우리 사이에 항상 웃음만 있을 수도 없겠지만
그래도 우리는 그걸 다 딛고 나아갈 수 있는 둘이니까요.

저는 진심으로 지니가 좋은 사람이자 좋은 여자라고 생각해요.
사실 제가 우슷개소리로 지니가 결혼하자고 해서 결혼했다고 얘기하지만
당연히 저도 지니와 결혼하고 싶은 마음이 컸으니 마음을 먹은거에요.
항상 사람들에게 말하곤 하거든요.
내 여자친구는, 아니 이제 곧 와이프가 될 사람은
길거리에서 전단지를 받을 때도 “감사합니다” 인사하며 받는다고.
이렇게 좋은 사람과 어떻게 결혼을 하지 않을 수 있겠어요! 그게 바보죠 :-)
내가 아무리 실패하고 모든걸 잃어도 옆에 있어줄 사람
내 편이 되어줄거라는 믿음을 주는 사람
그런 사람이 어디 둘이 있겠어요.
그래서 저도 지니랑 결혼하고 싶었던거에요.

그리고 사실 무엇보다 전 지니를 사랑해요!
항상 지니를 볼 때마다 너무 사랑스럽게 느껴져요.
또 지니를 바라보다보면 새삼 참 이쁘다는 생각도 들고요.
언제나 저를 미소짓게 만들고 끌어안고 싶게 만드는 여자가 바로 당신, 최지니랍니다 :-)

그래서 저도 이제 제가 먼저 말해볼게요.
지니와 결혼하고 싶어요.
지니와 평생을 함께 하고 싶어요.
인생을 함께 살며 일상을 같이 보내고
기쁜 일이 있을 때 함께 기뻐하고
힘든 일이 있으면 서로 도와주며
가장 이쁠 때를 함께 한 우리가
노부부가 되어서도 같이 알콩달콩
귀여운 일상을 보내고 싶어요.
지니도 노부부를 보면 그런 생각을 하지 않나요?
우리 같이 저렇게 지내고 싶다고.
저도 항상 그런 생각을 해요.

제가 항상 최고의 모습만 보여준다고 약속은 못할거같아요.
매일 매순간 지니에게 행복한 날만이 있을거라고 보장할 수 없어요.
하지만 제가 지니의 평온하고 행복한 일상을 위해 항상 노력하겠다는 것.
항상 지니의 편에서 우리 가정을 지키겠다는 것.
그리고 연애하는 것처럼 알콩달콩한 결혼 생활을 하겠다는 것은 약속할게요!
아 참! 그리고 지니가 바라는 단 하나.
배신 안 한다는거까지요 :-)

그럼 서론이 길었던 것 같은데
드디어 이 말을 할게요!
지니.
저, 박시우랑 결혼해줄래요?
Will you merry me?

항상 고맙고
사랑해요.

지니의 시우가.`;

const SCROLL_DURATION_MS = 120000;
function letterScrollEase(t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return 1 - (1 - t) * (1 - t);
}
const ProposalLetterView: React.FC<{ letterContent: string; onClose: () => void }> = ({ letterContent, onClose }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const startRef = useRef<number>(0);
    const rafRef = useRef<number>(0);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        startRef.current = performance.now();
        const animate = (now: number) => {
            const elapsed = now - startRef.current;
            const t = Math.min(elapsed / SCROLL_DURATION_MS, 1);
            const eased = letterScrollEase(t);
            const maxScroll = el.scrollHeight - el.clientHeight;
            if (maxScroll > 0) el.scrollTop = eased * maxScroll;
            if (t < 1) rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);
    return (
        <div className="absolute inset-0 z-[70] bg-[#FFFEF2] flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8">
                <pre className="whitespace-pre-wrap font-letter text-lg leading-loose text-gray-800">{letterContent}</pre>
            </div>
            <div className="p-4 border-t border-black/10">
                <button className="w-full py-3 rounded-full border-2 border-black bg-[#EEFF6E] font-bold active:bg-[#E5F55D]" onClick={onClose}>🩷</button>
            </div>
        </div>
    );
};

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

// Profile Avatar Component (Handles Image Loading & Fallback)
const ProfileAvatar: React.FC<{
    src?: string;
    alt: string;
    className?: string; // Applied to wrapper
    landscapeClassName?: string; // Applied to LandscapeAvatar
}> = ({ src, alt, className, landscapeClassName }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative w-full h-full ${className || ''}`}>
            <LandscapeAvatar className={`absolute inset-0 w-full h-full ${landscapeClassName || ''}`} />
            {src && (
                <img
                    src={src}
                    alt={alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
            )}
        </div>
    );
};

// Types
interface MessageProfile {
    id: string;
    name: string;
    statusMsg?: string;
    avatarUrl?: string; // If present, use img, else use LandscapeAvatar
    thumbnailUrl?: string; // For list view
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

    const [showProposalQuiz, setShowProposalQuiz] = useState(false);
    const [showProposalConfirm, setShowProposalConfirm] = useState(false);
    const [showProposalLetter, setShowProposalLetter] = useState(false);
    const [proposalPassword, setProposalPassword] = useState('');
    const [proposalError, setProposalError] = useState('');
    const proposalLetterRef = useRef<HTMLDivElement>(null);
    const proposalAudioRef = useRef<HTMLAudioElement | null>(null);
    const SWIPE_ACTION_WIDTH = 100;
    const [siwooRowSwipeOffset, setSiwooRowSwipeOffset] = useState(0);
    const swipeStartX = useRef(0);
    const swipeStartOffset = useRef(0);
    const swipeCurrentOffset = useRef(0);
    const hiddenMessageButtonRef = useRef<HTMLButtonElement>(null);

    const closeProposalLetter = useCallback(() => {
        if (proposalAudioRef.current) {
            proposalAudioRef.current.pause();
            proposalAudioRef.current = null;
        }
        setShowProposalLetter(false);
    }, []);

    const closeProposalQuiz = useCallback(() => {
        setShowProposalQuiz(false);
        setProposalPassword('');
        setProposalError('');
        if (proposalAudioRef.current) {
            proposalAudioRef.current.pause();
            proposalAudioRef.current = null;
        }
    }, []);

    const handleProposalSubmit = useCallback(() => {
        setProposalError('');
        const answer = proposalPassword.trim();
        const yyyymmdd = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
        if (!yyyymmdd.test(answer)) {
            setProposalError('20200101 형식으로 입력해야해용.');
            return;
        }
        const answerLower = answer;
        const correct = PROPOSAL_ANSWER.trim();
        if (answerLower !== correct) {
            setProposalError("역시나 기억력이 Short하군요! 그날은 11년 전, 지니의 생일이었습니당");
            return;
        }
        setShowProposalQuiz(false);
        setProposalPassword('');
        setProposalError('');
        setShowProposalConfirm(true);
    }, [proposalPassword]);

    const handleProposalConfirm = useCallback(() => {
        setShowProposalConfirm(false);
        setShowProposalLetter(true);
        try {
            const audio = new Audio(PROPOSAL_MUSIC_URL);
            audio.loop = true;
            proposalAudioRef.current = audio;
            audio.play().catch(() => {});
        } catch {
            // no-op
        }
    }, []);

    const handleProposalConfirmCancel = useCallback(() => {
        setShowProposalConfirm(false);
    }, []);

    useEffect(() => {
        const preload = new Audio(PROPOSAL_MUSIC_URL);
        preload.load();
    }, []);

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
                if (showProposalLetter) {
                    closeProposalLetter();
                } else if (showProposalConfirm) {
                    handleProposalConfirmCancel();
                } else if (showProposalQuiz) {
                    closeProposalQuiz();
                } else if (showProfileModal) {
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
    }, [onClose, currentView, showProfileModal, showProposalQuiz, showProposalConfirm, showProposalLetter, closeProposalLetter, closeProposalQuiz, handleProposalConfirmCancel]);

    // Data - Using the same data
    const profiles: MessageProfile[] = [
        {
            id: 'siwoo',
            name: '시우',
            statusMsg: '오랜만에 학교 가겠네...',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_orig.jpg?alt=media&token=2b3e3a00-6550-4d34-9035-76d857ecd70e',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_orig.jpg?alt=media&token=2b3e3a00-6550-4d34-9035-76d857ecd70e',
            lastMessage: '여러분들의 축복 속에서 앞으로도 매일매일을 행복하고 성실하게 지내겠습니다! 예식날 뵙겠습니다! 👋',
            chatContent: [
                { text: '안녕하세요, 신랑 시우입니다. 결혼식의 자리를 빌려 오랜 인연인 여러분들을 다시 뵙게되어 정말로 기쁩니다.', time: '20:41' },
                { text: '10년 전에 만난 소중한 인연이 시간이 흘러 어느덧 이 자리까지 이어지게 되었습니다.', time: '20:41' },
                { text: '저도 이 사랑스럽고 현명한 아내와 함께할 제 인생의 2막이 설레고 기대됩니다.', time: '20:41' },
                { text: '평소에 표현은 잘 하지 못했지만, 이 글을 보고 계신 여러분 한 분 한 분은 제게 참 소중하고 감사한 분들입니다.', time: '20:41' },
                { text: '저희의 새로운 시작에 여러분이 곁에서 함께해 주셨으면 하는 마음을 담아 진심 어린 초대를 드립니다.', time: '20:41' },
                { text: '여러분들의 축복 속에서 앞으로도 매일매일을 행복하고 성실하게 지내겠습니다! 예식날 뵙겠습니다! 👋', time: '20:41' }
            ]
        },
        {
            id: 'jini',
            name: '지니',
            statusMsg: '저 시집 가용 ><',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_orig.jpg?alt=media&token=53b4047d-ea62-4463-9409-e69fa6c84e9e',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_orig.jpg?alt=media&token=53b4047d-ea62-4463-9409-e69fa6c84e9e',
            lastMessage: '한분한분 제 눈에 담기 위해 최선을 다하겠습니다.',
            chatContent: [
                { text: '지난 일 년 동안 남자친구와 함께 결혼식을 준비했는데요. 곧 이 프로젝트가 끝이라니...! 신기합니다.', time: '20:41' },
                { text: '처음 결혼 준비를 시작했을 때만해도 결혼식 자체에 큰 의미를 두지 않았어요. 그러나 결혼을 준비하며 생각이 점차 바뀌었어요. 결혼식이 부부가 되기 위한 통과의례인 이유가 있구나합니다. 돌이켜 보니 준비 과정 자체가 소중한 추억이 됐어요.', time: '20:41' },
                { text: '곁에서 물심양면 도와주신 가족과 따뜻한 조언을 아끼지 않으셨던 지인분들 덕에 결승선 가까이 온 것 같아요.', time: '20:41' },
                { text: '지금 이 메시지를 읽고 계신 모든 분들께 진심으로 감사드립니다. (꾸벅)', time: '20:41' },
                { text: '다가올 26년 3월 28일은 제게 죽을 때까지 두고두고 꺼내 볼 기억이 되겠죠? 부끄럽지만, 여러분께서 결혼식에 함께해주신다면, 더할나위 없이 행복할 것 같아요. 한분한분 제 눈에 담기 위해 최선을 다하겠습니다.', time: '20:41' }
            ]
        },
        {
            id: 'siwooMom',
            name: '백윤정',
            statusMsg: '우리 아들 화이팅',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_mom_orig.JPG?alt=media&token=52ae069b-789e-4ac3-8df6-ddaa38f604b3',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_mom_thumb.jpg?alt=media&token=9f0a271f-3b97-497f-9f47-13a4adbbe86d',
            lastMessage: '따뜻한 축하와 격려 부탁합니다',
            chatContent: [
                { text: '어느새 자라 결혼을 앞둔 우리 아이가 서로의 반쪽을 만나 새로운 인생을 시작하려 합니다', time: '20:41' },
                { text: '따뜻한 축하와 격려 부탁합니다', time: '20:41' }
            ]
        },
        {
            id: 'siwooDad',
            name: '박성동',
            statusMsg: '우리 아들 최고다!',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_papa_orig.jpg?alt=media&token=b291dd72-2cdf-456c-8311-11436e8f1cbd',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fsiwoo_papa_thumb.jpg?alt=media&token=f194429e-e47b-4e21-8f9b-f46b7ba772a4',
            lastMessage: '두사람이 함께하는 새로운 시작에 귀한 발걸음으로 축복해 주시면 감사하겠습니다',
            chatContent: [
                { text: '두사람이 함께하는 새로운 시작에 귀한 발걸음으로 축복해 주시면 감사하겠습니다', time: '20:41' }
            ]
        },
        {
            id: 'jiniMom',
            name: '김현규',
            statusMsg: '우리딸 최고 이뿌네',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_mom_orig.jpg?alt=media&token=8cc06218-f752-48d2-a791-9d549ad8e529',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_mom_thumb.jpg?alt=media&token=26314190-b72d-4529-8880-80922c324f12',
            lastMessage: '오셔서 두 사람의 앞날을 축복해 주시면 큰 영광이겠습니다.',
            chatContent: [
                { text: '저희 자녀가 소중한 인연을 만나 새로운 가정을 이루게 되었습니다.', time: '20:41' },
                { text: '오셔서 두 사람의 앞날을 축복해 주시면 큰 영광이겠습니다.', time: '20:41' }
            ]
        },
        {
            id: 'jiniDad',
            name: '최석봉',
            statusMsg: '우리 큰공주 모델이네',
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_papa_orig.jpg?alt=media&token=8ef654b2-e819-47c7-9b47-a2adb5dae981',
            thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0630377070.firebasestorage.app/o/profiles%2Fjini_papa_thumb.jpg?alt=media&token=db3862a0-3595-446f-a673-7ea59eb7c7bd',
            lastMessage: '귀한 시간 내어 결혼식에 참석해주시면 더없이 감사하겠습니다',
            chatContent: [
                { text: '귀한 시간 내어 결혼식에 참석해주시면 더없이 감사하겠습니다', time: '20:41' }
            ]
        },
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

    const handleSiwooRowSwipeStart = useCallback((clientX: number) => {
        swipeStartX.current = clientX;
        swipeStartOffset.current = siwooRowSwipeOffset;
    }, [siwooRowSwipeOffset]);

    const handleSiwooRowSwipeMove = useCallback((clientX: number) => {
        const delta = clientX - swipeStartX.current;
        const next = Math.min(0, Math.max(-SWIPE_ACTION_WIDTH, swipeStartOffset.current + delta));
        swipeCurrentOffset.current = next;
        setSiwooRowSwipeOffset(next);
    }, []);

    const handleSiwooRowSwipeEnd = useCallback((e?: React.PointerEvent) => {
        const current = swipeCurrentOffset.current;
        const threshold = SWIPE_ACTION_WIDTH / 2;
        const wasRevealed = current < -threshold;
        if (wasRevealed && e) {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (hiddenMessageButtonRef.current && (el === hiddenMessageButtonRef.current || hiddenMessageButtonRef.current.contains(el as Node))) {
                setSiwooRowSwipeOffset(0);
                setShowProposalQuiz(true);
                return;
            }
        }
        if (wasRevealed) {
            setSiwooRowSwipeOffset(-SWIPE_ACTION_WIDTH);
        } else {
            setSiwooRowSwipeOffset(0);
        }
    }, []);

    const handleOpenHiddenMessage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSiwooRowSwipeOffset(0);
        setShowProposalQuiz(true);
    }, []);

    // Render List
    const renderList = () => (
        <div className="flex-1 overflow-y-auto bg-[#FFFEF2] min-h-0">
            {/* Header */}
            <div className="relative pt-2 px-4 pb-4 bg-[#FFFEF2]">
                <button onClick={onClose} className="absolute left-4 top-3">
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
                    className="overflow-hidden w-full"
                    onPointerDown={(e) => {
                        if (e.button !== 0) return;
                        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                        handleSiwooRowSwipeStart(e.clientX);
                    }}
                    onPointerMove={(e) => {
                        if (e.buttons !== 1) return;
                        handleSiwooRowSwipeMove(e.clientX);
                    }}
                    onPointerUp={(e) => {
                        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                        handleSiwooRowSwipeEnd(e);
                    }}
                    onPointerCancel={(e) => {
                        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                        handleSiwooRowSwipeEnd(e);
                    }}
                >
                    <div
                        className="flex transition-transform duration-200 ease-out"
                        style={{
                            width: `calc(100% + ${SWIPE_ACTION_WIDTH}px)`,
                            transform: `translateX(${siwooRowSwipeOffset}px)`,
                        }}
                    >
                        <div
                            className="flex items-center px-4 py-2 tall:py-3 taller:py-4 active:bg-[#f0f0e0] transition-colors cursor-pointer flex-[1_1_0] min-w-0"
                            onClick={() => handleRowClick(profiles[0])}
                        >
                            <div
                                className="relative w-14 h-14 tall:w-16 tall:h-16 taller:w-20 taller:h-20 rounded-full bg-[#D0F0FF] flex-shrink-0 cursor-pointer overflow-hidden border-2 border-black"
                                onClick={(e) => handleProfileClick(e, profiles[0])}
                            >
                                <ProfileAvatar
                                    src={profiles[0].thumbnailUrl || profiles[0].avatarUrl}
                                    alt={profiles[0].name}
                                />
                            </div>
                            <div className="ml-4 tall:ml-5 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-lg tall:text-xl taller:text-2xl font-bold text-black truncate">{profiles[0].name}</span>
                                </div>
                                <p className="text-gray-500 text-sm tall:text-base taller:text-lg truncate pr-4">{profiles[0].lastMessage}</p>
                            </div>
                        </div>
                        <button
                            ref={hiddenMessageButtonRef}
                            type="button"
                            className="flex-shrink-0 w-[100px] min-w-[100px] h-full min-h-[72px] flex items-center justify-center bg-[#EEFF6E] text-black font-bold text-sm border-l-2 border-black/10 active:bg-[#E5F55D]"
                            onClick={handleOpenHiddenMessage}
                        >
                            For You
                        </button>
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
                        className="flex items-center px-4 py-2 tall:py-3 taller:py-4 active:bg-[#f0f0e0] transition-colors cursor-pointer"
                        onClick={() => handleRowClick(profile)}
                    >
                        <div
                            className="relative w-14 h-14 tall:w-16 tall:h-16 taller:w-20 taller:h-20 rounded-full bg-[#D0F0FF] flex-shrink-0 cursor-pointer overflow-hidden border-2 border-black"
                            onClick={(e) => handleProfileClick(e, profile)}
                        >
                            <ProfileAvatar
                                src={profile.thumbnailUrl || profile.avatarUrl}
                                alt={profile.name}
                            />
                        </div>
                        <div className="ml-4 tall:ml-5 flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-lg tall:text-xl taller:text-2xl font-bold text-black truncate">{profile.name}</span>
                            </div>
                            <p className="text-gray-500 text-sm tall:text-base taller:text-lg truncate pr-4">{profile.lastMessage}</p>
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
                <div className="bg-[#FFFEF2] px-4 py-3 flex items-center justify-between sticky top-0 md:rounded-t-3xl border-b border-black/5 z-30">
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
                    <div
                        className="flex flex-col items-center mb-8 mt-4 cursor-pointer active:scale-95 transition-transform"
                        onClick={() => setShowProfileModal(true)}
                    >
                        <div className="w-20 h-20 rounded-full border-2 border-black overflow-hidden mb-2">
                            <ProfileAvatar
                                src={selectedProfile.avatarUrl}
                                alt={selectedProfile.name}
                            />
                        </div>
                        <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
                        <p className="text-gray-500 text-sm">iMessage</p>
                    </div>

                    {selectedProfile.chatContent?.map((msg, idx) => (
                        <div key={idx} className="flex gap-3 mb-4 items-end">
                            <div
                                className="w-10 h-10 rounded-full border border-black overflow-hidden flex-shrink-0 cursor-pointer active:scale-90 transition-transform"
                                onClick={() => setShowProfileModal(true)}
                            >
                                <ProfileAvatar
                                    src={selectedProfile.thumbnailUrl || selectedProfile.avatarUrl}
                                    alt={selectedProfile.name}
                                />
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
                        <ProfileAvatar
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            landscapeClassName="scale-150 translate-y-10"
                        />
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

    const renderProposalConfirmModal = () => {
        if (!showProposalConfirm) return null;
        return (
            <div className="absolute inset-0 z-[65] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleProposalConfirmCancel}>
                <div className="bg-[#FFFEF2] w-[90%] max-w-sm rounded-3xl p-6 shadow-2xl border-2 border-black/10" onClick={e => e.stopPropagation()}>
                    <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
                        이 메시지를 확인하면 시우와 평생을 함께하는 것을 승낙한다는 의미입니다.
                        <br />
                        확인하시겠습니까?
                    </p>
                    <div className="flex gap-2">
                        <button
                            className="flex-1 py-3 rounded-full border-2 border-black bg-white font-bold active:bg-gray-100"
                            onClick={handleProposalConfirmCancel}
                        >
                            취소
                        </button>
                        <button
                            className="flex-1 py-3 rounded-full border-2 border-black bg-[#EEFF6E] font-bold active:bg-[#E5F55D]"
                            onClick={handleProposalConfirm}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderProposalQuizModal = () => {
        if (!showProposalQuiz) return null;
        return (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => closeProposalQuiz()}>
                <div className="bg-[#FFFEF2] w-[90%] max-w-sm rounded-3xl p-6 shadow-2xl border-2 border-black/10" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold text-center mb-4 text-black">비밀번호를 입력해주세요</h3>
                    <p className="text-sm text-gray-600 text-center mb-4 whitespace-pre-line">{PROPOSAL_QUIZ}</p>
                    <input
                        type="text"
                        value={proposalPassword}
                        onChange={e => { setProposalPassword(e.target.value); setProposalError(''); }}
                        placeholder="정답 입력"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={8}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#EEFF6E] focus:outline-none text-black placeholder-gray-400"
                    />
                    {proposalError ? <p className="text-red-500 text-sm mt-2">{proposalError}</p> : null}
                    <div className="flex gap-2 mt-4">
                        <button
                            className="flex-1 py-3 rounded-full border-2 border-black bg-white font-bold active:bg-gray-100"
                            onClick={closeProposalQuiz}
                        >
                            닫기
                        </button>
                        <button
                            className="flex-1 py-3 rounded-full border-2 border-black bg-[#EEFF6E] font-bold active:bg-[#E5F55D]"
                            onClick={handleProposalSubmit}
                        >
                            확인
                        </button>
                    </div>
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
                className={`relative w-full h-full md:max-w-md md:h-[85vh] md:max-h-[85vh] bg-[#FFFEF2] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-spring ${animationClass}`}
                style={{ pointerEvents: 'auto', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Views */}
                <div className="relative flex-1 flex flex-col bg-[#FFFEF2] overflow-hidden pt-4">
                    {currentView === 'LIST' && renderList()}
                    {currentView === 'CHAT_ROOM' && renderChatRoom()}
                </div>

                {renderProfileModal()}
                {renderProposalQuizModal()}
                {renderProposalConfirmModal()}
                {showProposalLetter && <ProposalLetterView letterContent={PROPOSAL_LETTER} onClose={closeProposalLetter} />}
            </div>
        </div>
    );
};

export default MessagesScreen;
