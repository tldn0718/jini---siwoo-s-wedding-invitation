import React, { useState } from 'react';
import Names from './components/Names';
import DdayWidget from './components/DdayWidget';
import AppIcon from './components/AppIcon';
import CalendarWidget from './components/CalendarWidget';
import Dock from './components/Dock';
import MapScreen from './components/MapScreen';
import WalletScreen from './components/WalletScreen';
import PhotosScreen from './components/PhotosScreen';
import MessagesScreen from './components/MessagesScreen';
import MailScreen from './components/MailScreen';
import InviteScreen from './components/InviteScreen';

import mapsIcon from './assets/icons/maps.png';
import photosIcon from './assets/icons/photos.png';
import mailIcon from './assets/icons/mail.png';
import calendarIcon from './assets/icons/calendar.png';
import walletIcon from './assets/icons/wallet.png';
import weatherIcon from './assets/icons/weather.png';
import newsIcon from './assets/icons/news.png';
import messagesIcon from './assets/icons/messages.png';

const App: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMapClosing, setIsMapClosing] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isWalletClosing, setIsWalletClosing] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [isPhotosClosing, setIsPhotosClosing] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isMessagesClosing, setIsMessagesClosing] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [isMailClosing, setIsMailClosing] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isInviteClosing, setIsInviteClosing] = useState(false);


  const handleMapClick = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapClosing(true);
    setTimeout(() => {
      setIsMapOpen(false);
      setIsMapClosing(false);
    }, 300);
  };

  const handleWalletClick = () => {
    setIsWalletOpen(true);
  };

  const handleCloseWallet = () => {
    setIsWalletClosing(true);
    setTimeout(() => {
      setIsWalletOpen(false);
      setIsWalletClosing(false);
    }, 300);
  };

  const handlePhotosClick = () => {
    setIsPhotosOpen(true);
  };

  const handleClosePhotos = () => {
    setIsPhotosClosing(true);
    setTimeout(() => {
      setIsPhotosOpen(false);
      setIsPhotosClosing(false);
    }, 300);
  };

  const handleMessagesClick = () => {
    setIsMessagesOpen(true);
  };

  const handleCloseMessages = () => {
    setIsMessagesClosing(true);
    setTimeout(() => {
      setIsMessagesOpen(false);
      setIsMessagesClosing(false);
    }, 300);
  };

  const handleMailClick = () => {
    setIsMailOpen(true);
  };

  const handleCloseMail = () => {
    setIsMailClosing(true);
    setTimeout(() => {
      setIsMailOpen(false);
      setIsMailClosing(false);
    }, 300);
  };

  const handleInviteClick = () => {
    setIsInviteOpen(true);
  };

  const handleCloseInvite = () => {
    setIsInviteClosing(true);
    setTimeout(() => {
      setIsInviteOpen(false);
      setIsInviteClosing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen font-sans text-gray-800 overflow-hidden bg-gray-100 md:flex md:items-center md:justify-center">
      {/* Phone Container: Full screen on mobile, Fixed size on desktop */}
      <div className="w-full h-full md:w-[390px] md:h-[844px] md:max-h-[95vh] bg-gradient-to-b from-pink-50 via-purple-50 to-white md:rounded-[3rem] md:shadow-2xl md:border-[8px] md:border-white overflow-hidden flex flex-col relative shadow-2xl">
        <div className="flex-1 flex flex-col px-4 py-2 h-full relative">
          {/* Centered Content Group (Names + Main) */}
          <div className="flex-1 flex flex-col justify-center w-full gap-y-4 tall:gap-y-8 taller:gap-y-12 md:gap-y-10">
            <Names />

            <main className="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-6 items-start overflow-hidden">
              <div className="col-span-1 flex flex-col items-center self-end">
                <DdayWidget />
                <span className="mt-1 text-xs font-medium font-neodgm">Dday</span>
              </div>

              <div className="col-span-1 grid grid-cols-2 gap-y-4 gap-x-2 md:gap-y-6 self-end">
                <AppIcon imageUrl={mapsIcon} label="Maps" onClick={handleMapClick} />
                <AppIcon imageUrl={photosIcon} label="Photos" onClick={handlePhotosClick} />
                <AppIcon imageUrl={mailIcon} label="Mail" onClick={handleMailClick} />
                <AppIcon imageUrl={calendarIcon} label="Invite" onClick={handleInviteClick} />
              </div>

              <div className="col-span-1 grid grid-cols-2 gap-y-4 gap-x-2 md:gap-y-6">
                <AppIcon imageUrl={walletIcon} label="Wallet" onClick={handleWalletClick} />
                <AppIcon imageUrl={messagesIcon} label="Messages" onClick={handleMessagesClick} />
                <AppIcon imageUrl={weatherIcon} label="Weather" />
                <AppIcon imageUrl={newsIcon} label="News" onClick={() => window.open('https://www.notepet.co.kr/news/article/article_view/?idx=14720', '_blank')} />
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <CalendarWidget />
                <span className="mt-1 text-xs font-medium font-neodgm">Calendar</span>
              </div>
            </main>
          </div>

          <Dock />

          {isMapOpen && (
            <MapScreen onClose={handleCloseMap} isClosing={isMapClosing} />
          )}

          {isWalletOpen && (
            <WalletScreen onClose={handleCloseWallet} isClosing={isWalletClosing} />
          )}

          {isPhotosOpen && (
            <PhotosScreen onClose={handleClosePhotos} isClosing={isPhotosClosing} />
          )}

          {isMessagesOpen && (
            <MessagesScreen onClose={handleCloseMessages} isClosing={isMessagesClosing} />
          )}

          {isMailOpen && (
            <MailScreen onClose={handleCloseMail} isClosing={isMailClosing} />
          )}

          {isInviteOpen && (
            <InviteScreen onClose={handleCloseInvite} isClosing={isInviteClosing} />
          )}
        </div>
      </div>
    </div>
  );
};


export default App;