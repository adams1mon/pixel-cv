'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface ListPlaceholderProps {
  addItem: (item: unknown) => void;
  buttonText: string;
  icon: React.ReactNode; 
  title: string;
  subtitle: string;
}

export const ListPlaceholder = React.memo<ListPlaceholderProps>((props) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      {props.icon}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{props.title}</h3>
      <p className="text-gray-600 mb-6">{props.subtitle}</p>
      <button
        type="button"
        onClick={props.addItem}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-5 h-5 mr-2" />
        {props.buttonText}
      </button>
    </div>
  );
});

ListPlaceholder.displayName = 'ListPlaceholder';
