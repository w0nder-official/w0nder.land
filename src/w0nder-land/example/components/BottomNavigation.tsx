import React, { useState } from 'react';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  bgColor: string;
}

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems: NavItem[] = [
    { id: 'home', icon: '🏠', label: 'HOME', bgColor: 'bg-neo-pink' },
    { id: 'search', icon: '🔍', label: 'FIND', bgColor: 'bg-neo-blue' },
    { id: 'create', icon: '➕', label: 'ADD', bgColor: 'bg-neo-yellow' },
    { id: 'activity', icon: '❤️', label: 'LOVE', bgColor: 'bg-neo-green' },
    { id: 'profile', icon: '👤', label: 'ME', bgColor: 'bg-neo-purple' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-5 border-black shadow-brutal-2xl max-w-md mx-auto">
      <div className="flex items-center justify-between p-2">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              flex flex-col items-center space-y-1 p-3 border-brutal shadow-brutal
              transition-all duration-200 flex-1 mx-1
              ${activeTab === item.id 
                ? `${item.bgColor} text-black shadow-brutal-lg transform -translate-y-1` 
                : 'bg-white text-black hover:shadow-brutal-lg hover:transform hover:-translate-y-1'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-brutal uppercase tracking-wider">{item.label}</span>
            
            {/* Active indicator */}
            {activeTab === item.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black border border-black transform rotate-45"></div>
            )}
          </button>
        ))}
      </div>
      
      {/* Decorative bottom strip */}
      <div className="bg-black h-2 flex">
        <div className="bg-neo-red flex-1"></div>
        <div className="bg-neo-yellow flex-1"></div>
        <div className="bg-neo-blue flex-1"></div>
        <div className="bg-neo-green flex-1"></div>
        <div className="bg-neo-purple flex-1"></div>
      </div>
    </div>
  );
}