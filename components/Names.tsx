import React from 'react';

const HeartDivider: React.FC = () => (
  <div className="flex items-center justify-center w-full my-1 overflow-hidden">
    <span className="whitespace-nowrap text-lg tracking-widest w-full text-center block text-gray-800">｡♥｡‧♡˚ ‧｡♥｡‧˚♡˚ ‧｡♥｡‧˚♡˚ ‧｡♥｡</span>
  </div>
);


const Names: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-4 font-mono">
      <HeartDivider />
      <h1 className="text-3xl font-extrabold tracking-widest text-black font-neodgm">
        JINI ♥ SIWOO
      </h1>
      <HeartDivider />
    </div>
  );
};

export default Names;