'use client';

import React from 'react';
import { Edit, Eye } from 'lucide-react';
import { clsx } from 'clsx';
import { useUI } from '../../../contexts/UIContext';

export const MobileBottomTabs: React.FC = () => {
  const { activeMobileTab, setActiveMobileTab } = useUI();

  const tabs = [
    {
      id: 'editor' as const,
      label: 'Editor',
      icon: Edit,
    },
    {
      id: 'preview' as const,
      label: 'Preview',
      icon: Eye,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-40 shadow-sm">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMobileTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMobileTab(tab.id)}
              className={clsx(
                "flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-colors min-w-0 flex-1",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5 mb-[2px]" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};