
import React from 'react';
import { Search, Gift, MessageSquare, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-dark-200 border-b border-dark-300">
      <div className="flex items-center">
        <Logo />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <div className="bg-dark-300 rounded-lg flex items-center h-9">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none text-sm pl-10 pr-4 text-gray-300 w-40"
            />
          </div>
        </div>
        
        <div className="flex items-center bg-dark-300 rounded-lg px-3 py-1 text-sm">
          <span className="mr-1">🇮🇩</span>
          <span>IDR 0.00</span>
          <span className="ml-1">▼</span>
        </div>
        
        <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-md px-6">
          Deposit
        </Button>
        
        <Gift className="h-5 w-5 text-gray-400" />
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <Bell className="h-5 w-5 text-gray-400" />
        
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
