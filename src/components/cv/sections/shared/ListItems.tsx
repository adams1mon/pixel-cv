'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface ListItemsProps {
  addItem: () => void;
  buttonText: string;
  listItems: React.ReactNode[];
}

export const ListItems = React.memo<ListItemsProps>((props) => {
  return (
    <>
      {props.listItems}

      {/* Add New Award Button */}
      <button
        type="button"
        onClick={props.addItem}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-5 h-5 inline mr-2" />
        {props.buttonText}
      </button>
    </>
  );
});

ListItems.displayName = 'ListItems'; 