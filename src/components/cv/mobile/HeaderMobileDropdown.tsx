'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Upload, FileDown, FileText } from 'lucide-react';
import { clsx } from 'clsx';

interface MobileActionsDropdownProps {
  onLoadSample: () => void;
  onImportJson: () => void;
  onExportJson: () => void;
}

export const MobileActionsDropdown: React.FC<MobileActionsDropdownProps> = ({
  onLoadSample,
  onImportJson,
  onExportJson,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
          "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        )}
        aria-label="More actions"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            <DropdownButton 
              onClick={() => handleAction(onLoadSample)}
            >
              <FileText className="w-4 h-4 mr-3" />
              Load Sample
            </DropdownButton>
            <DropdownButton 
              onClick={() => handleAction(onImportJson)}
            >
              <Upload className="w-4 h-4 mr-3" />
              Import JSON
            </DropdownButton>
            <DropdownButton 
              onClick={() => handleAction(onExportJson)}
            >
              <FileDown className="w-4 h-4 mr-3" />
              Export JSON
            </DropdownButton>
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownButton: React.FC<{onClick: () => void} & React.PropsWithChildren> = ({
  onClick,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
    >
      {children}
    </button>
  );
}