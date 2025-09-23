'use client';

import React, { useState } from 'react';
import { JsonResumeAward } from '@/types/jsonresume';
import { Award as AwardIcon, Calendar, FileText, Trash2, ChevronDown, ChevronRight, Trophy } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';

interface AwardEntryProps {
  award: JsonResumeAward;
  index: number;
  onAwardChange: (award: JsonResumeAward) => void;
  onRemove: () => void;
}

export const AwardEntry: React.FC<AwardEntryProps> = ({
  award,
  index,
  onAwardChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumeAward, value: any) => {
    onAwardChange({
      ...award,
      [field]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Trophy className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {award.title || 'New Award'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {award.awarder ? award.awarder : 'Awarder not set'}
                {award.date ? ` • ${award.date}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
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

            <button
              type="button"
              onClick={onRemove}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
              aria-label="Remove award"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Entry Details */}
      {isExpanded && (
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <AwardIcon className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Award</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Title"
                value={award.title || ''}
                onChange={(value) => updateField('title', value)}
                placeholder="e.g., Employee of the Year"
                required={true}
              />
              
              <InputField
                label="Awarder"
                value={award.awarder || ''}
                onChange={(value) => updateField('awarder', value)}
                placeholder="e.g., ACM, Company Name"
                required={true}
              />
            </div>
          </div>

          {/* Date & Website */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Date & Website</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Date"
                value={award.date || ''}
                onChange={(value) => updateField('date', value)}
                placeholder="YYYY-MM-DD"
              />
              
              <UrlField
                label="Website"
                value={award.website || ''}
                onChange={(value) => updateField('website', value)}
                placeholder="https://organization-or-award.com"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <div className="flex items-center mb-1">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Summary</h4>
            </div>
            <TextArea
              value={award.summary || ''}
              onChange={(value) => updateField('summary', value)}
              placeholder="Describe the award, selection criteria, and impact..."
              rows={4}
            />
          </div>
        </div>
      )}
    </div>
  );
}; 