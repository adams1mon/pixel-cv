'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumeAward, JsonResumeAward } from '@/types/jsonresume';
import { Award as AwardIcon, Calendar, FileText, Trophy } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface AwardEntryProps {
  item: EnrichedJsonResumeAward;
  index: number;
  onUpdate: (award: EnrichedJsonResumeAward) => void;
  onRemove: () => void;
}

export const AwardEntry: React.FC<AwardEntryProps> = ({
  item,
  index,
  onUpdate,
  onRemove
}) => {
  // Memoize the updateField function to prevent unnecessary re-renders
  const updateField = useCallback((field: keyof JsonResumeAward, value: any) => {
    onUpdate({
      ...item,
      [field]: value
    });
  }, [item, onUpdate]);

  // Toggle visibility for this award
  const toggleVisibility = useCallback(() => {
    onUpdate({
      ...item,
      _visible: !item._visible
    });
  }, [item, onUpdate]);

  const title = item.title || 'New Award';
  const subtitle = item.awarder 
    ? `${item.awarder}${item.date ? ` • ${item.date}` : ''}`
    : 'Awarder not set';

  return (
    <ExpandableEntry
      icon={<Trophy className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove award"
      visible={item._visible !== false}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <AwardIcon className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Award</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title"
            value={item.title || ''}
            onChange={(value) => updateField('title', value)}
            placeholder="e.g., Employee of the Year"
            required={true}
          />
          
          <InputField
            label="Awarder"
            value={item.awarder || ''}
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
            value={item.date || ''}
            onChange={(value) => updateField('date', value)}
            placeholder="YYYY-MM-DD"
          />
          
          <UrlField
            label="Website"
            value={item.website || ''}
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
          value={item.summary || ''}
          onChange={(value) => updateField('summary', value)}
          placeholder="Describe the award, selection criteria, and impact..."
          rows={4}
        />
      </div>
    </ExpandableEntry>
  );
};
