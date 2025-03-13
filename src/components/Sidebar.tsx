
import React from 'react';
import { 
  Home, 
  Zap, 
  Target, 
  Award, 
  Gift, 
  Users, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  Headphones, 
  Globe
} from 'lucide-react';

const Sidebar = () => {
  const sidebarItems = [
    { icon: <Home size={20} />, color: 'text-white' },
    { icon: <Zap size={20} />, color: 'text-white' },
    { icon: <Target size={20} />, color: 'text-white' },
    { icon: <Award size={20} />, color: 'text-white' },
    { icon: <Gift size={20} />, color: 'text-white' },
    { icon: <Users size={20} />, color: 'text-white' },
    { icon: <BarChart2 size={20} />, color: 'text-white' },
    { icon: <MessageSquare size={20} />, color: 'text-white' },
    { icon: <Settings size={20} />, color: 'text-white' },
    { icon: <Headphones size={20} />, color: 'text-white' },
    { icon: <Globe size={20} />, color: 'text-white' }
  ];

  return (
    <div className="w-16 bg-dark-200 h-screen flex flex-col items-center pt-4">
      {sidebarItems.map((item, index) => (
        <div 
          key={index}
          className="w-12 h-12 flex items-center justify-center mb-2 rounded-lg hover:bg-dark-300 cursor-pointer"
        >
          <div className={`${item.color}`}>{item.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
