'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { VisibilityToggle } from '../../VisibilityToggle';

interface ExpandableEntryProps {
  // Header content
  icon: ReactNode;
  title: string;
  subtitle?: string;
  
  // Expansion behavior
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  
  // Actions
  onRemove?: () => void;
  removeAriaLabel?: string;

  visible: boolean;
  onToggleVisible: () => void;
  
  // Content
  children: ReactNode;
  
  // Styling
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const ExpandableEntry: React.FC<ExpandableEntryProps> = ({
  icon,
  title,
  subtitle,
  defaultExpanded = false,
  onToggle,
  onRemove,
  removeAriaLabel = "Remove item",
  visible = true,
  onToggleVisible,
  children,
  className = "",
  headerClassName = "",
  contentClassName = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Entry Header */}
      <div className={`flex flex-col gap-2 items-between bg-gray-50 px-6 py-4 ${headerClassName}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="text-blue-600 mr-3">
              {icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-600 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleToggle}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </button>

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                aria-label={removeAriaLabel}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <VisibilityToggle visible={visible} onToggle={onToggleVisible} />
      </div>

      {/* Entry Details */}
      {isExpanded && (
        <div className={`p-6 space-y-8 ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};
