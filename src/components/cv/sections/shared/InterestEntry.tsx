'use client';

import React, { useState } from 'react';
import { JsonResumeInterest } from '@/types/jsonresume';
import { Volleyball, FileText, Hash, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { InputField, TextArea } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

interface InterestEntryProps {
  interest: JsonResumeInterest;
  index: number;
  onInterestChange: (interest: JsonResumeInterest) => void;
  onRemove: () => void;
}

export const InterestEntry: React.FC<InterestEntryProps> = ({
  interest,
  index,
  onInterestChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumeInterest, value: any) => {
    onInterestChange({
      ...interest,
      [field]: value
    });
  };

  const keywordCount = (interest.keywords || []).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Volleyball className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {interest.name || 'New Interest'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {keywordCount > 0 ? `${keywordCount} keyword${keywordCount !== 1 ? 's' : ''}` : 'No keywords added yet'}
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
              aria-label="Remove interest"
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
              <Hash className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Interest</h4>
            </div>
            <div className="space-y-3">
              <InputField
                label="Name"
                value={interest.name || ''}
                onChange={(value) => updateField('name', value)}
                placeholder="e.g., Rock Climbing, Photography, Chess"
                required={true}
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
              value={interest.summary || ''}
              onChange={(value) => updateField('summary', value)}
              placeholder="Briefly describe your involvement, achievements, or what you enjoy about this interest..."
              rows={3}
            />
          </div>

          {/* Keywords */}
          <KeywordsEntry
            keywords={interest.keywords || []}
            onKeywordsChange={(keywords) => updateField('keywords', keywords)}
            skillName={interest.name}
          />
        </div>
      )}
    </div>
  );
}; 