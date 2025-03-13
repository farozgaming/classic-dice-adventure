
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DiceGame from './DiceGame';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DiceGame />
      </div>
    </div>
  );
};

export default MainLayout;
