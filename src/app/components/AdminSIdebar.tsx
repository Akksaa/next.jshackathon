'use client';

import React, { useState } from 'react';
import { ChevronLeft, Home, Settings, Users, HelpCircle } from 'lucide-react';

const AdminSIdebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: <Home size={24} />, label: 'Home' },
    { icon: <Users size={24} />, label: 'Users' },
    { icon: <Settings size={24} />, label: 'Settings' },
    { icon: <HelpCircle size={24} />, label: 'Help' }
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-black text-primYellow transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-slate-800 p-1 rounded-full"
      >
        <ChevronLeft 
          size={20} 
          className={`transition-transform duration-300 ${
            !isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className="p-4">
        <div className="flex items-center mb-8 openSans">
          {isOpen && <h2 className="text-xl font-bold">Menu</h2>}
        </div>

        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-slate-700 transition-colors ${
                    !isOpen ? 'justify-center' : ''
                  }`}
                >
                  <span>{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSIdebar;