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


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 via-purple-50 to-white font-sans text-gray-800">
      <div className="container mx-auto max-w-sm p-4 flex flex-col min-h-screen relative">
        <Names />

        <main className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4 items-start">
          <div className="col-span-1 flex flex-col items-center">
            <DdayWidget />
            <span className="mt-2 text-sm font-medium font-neodgm">Dday</span>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-y-6 gap-x-2">
            <AppIcon imageUrl={mapsIcon} label="Maps" onClick={handleMapClick} />
            <AppIcon imageUrl={photosIcon} label="Photos" onClick={handlePhotosClick} />
            <AppIcon imageUrl={mailIcon} label="Mail" onClick={handleMailClick} />
            <AppIcon imageUrl={calendarIcon} label="Calendar" />
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-y-6 gap-x-2">
            <AppIcon imageUrl={walletIcon} label="Wallet" onClick={handleWalletClick} />
            <AppIcon imageUrl={messagesIcon} label="Messages" onClick={handleMessagesClick} />
            <AppIcon imageUrl={weatherIcon} label="Weather" />
            <AppIcon imageUrl={newsIcon} label="News" onClick={() => window.open('https://www.notepet.co.kr/news/article/article_view/?idx=14720', '_blank')} />
          </div>

          <div className="col-span-1 flex flex-col items-center">
            <CalendarWidget />
            <span className="mt-2 text-sm font-medium font-neodgm">Calendar</span>
          </div>

        </main>

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
      </div>
    </div>
  );
};


export default App;