'use client';

import React from 'react';
import { JsonResumeInterest } from '@/types/jsonresume';
import { Volleyball, FileText, Hash } from 'lucide-react';
import { InputField, TextArea } from '../shared/InputField';
import { KeywordsEntry } from '../shared/KeywordsEntry';
import { ExpandableEntry } from '../shared/ExpandableEntry';

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
  const updateField = (field: keyof JsonResumeInterest, value: any) => {
    onInterestChange({
      ...interest,
      [field]: value
    });
  };

  const keywordCount = (interest.keywords || []).length;
  const title = interest.name || 'New Interest';
  const subtitle = keywordCount > 0 ? `${keywordCount} keyword${keywordCount !== 1 ? 's' : ''}` : 'No keywords added yet';

  return (
    <ExpandableEntry
      icon={<Volleyball className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove interest"
    >
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
    </ExpandableEntry>
  );
}; 