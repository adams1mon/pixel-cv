'use client';

import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderSectionEditorProps {
  sectionName: string;
  description: string;
}

export const PlaceholderSectionEditor: React.FC<PlaceholderSectionEditorProps> = ({ 
  sectionName, 
  description 
}) => {
  return (
    <div className="section-editor">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{sectionName}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <div className="text-center py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="max-w-sm mx-auto">
          <Construction className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500 mb-4">
            The {sectionName.toLowerCase()} section editor is not yet implemented.
          </p>
          <p className="text-sm text-gray-400">
            This section will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}; 