'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumePublication } from '@/types/jsonresume';
import { BookOpen, Calendar, FileText, BookCheck } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { KeywordsEntry } from '../shared/KeywordsEntry';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface PublicationEntryProps {
  publication: EnrichedJsonResumePublication;
  index: number;
  onPublicationChange: (publication: EnrichedJsonResumePublication) => void;
  onRemove: () => void;
}

export const PublicationEntry: React.FC<PublicationEntryProps> = ({
  publication,
  index,
  onPublicationChange,
  onRemove
}) => {
  const updateField = (field: keyof EnrichedJsonResumePublication, value: any) => {
    onPublicationChange({
      ...publication,
      [field]: value
    });
  };

  const keywordsCount = (publication.keywords || []).length;
  const title = publication.name || 'New Publication';
  const subtitle = `${publication.publisher ? publication.publisher : 'Publisher not set'}${publication.releaseDate ? ` • ${publication.releaseDate}` : ''}${keywordsCount > 0 ? ` • ${keywordsCount} keyword${keywordsCount !== 1 ? 's' : ''}` : ''}`;

  const toggleVisibility = useCallback(() => {
    onPublicationChange({
      ...publication,
      _visible: !publication._visible
    });
  }, [publication, onPublicationChange]);


  return (
    <ExpandableEntry
      icon={<BookCheck className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove publication"
      visible={publication._visible}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Publication</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            value={publication.name || ''}
            onChange={(value) => updateField('name', value)}
            placeholder="e.g., Machine Learning in Healthcare"
            required={true}
          />
          
          <InputField
            label="Publisher"
            value={publication.publisher || ''}
            onChange={(value) => updateField('publisher', value)}
            placeholder="e.g., IEEE, Nature, ACM"
            required={true}
          />
        </div>
      </div>

      {/* Date & Links */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Date & Links</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Release Date"
            value={publication.releaseDate || ''}
            onChange={(value) => updateField('releaseDate', value)}
            placeholder="YYYY-MM-DD"
          />
          
          <UrlField
            label="URL"
            value={publication.url || ''}
            onChange={(value) => updateField('url', value)}
            placeholder="https://doi.org/10.1234/example"
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
          value={publication.summary || ''}
          onChange={(value) => updateField('summary', value)}
          placeholder="Describe the publication, its key findings, your contribution, and impact..."
          rows={4}
        />
      </div>

      {/* Keywords */}
      <KeywordsEntry
        keywords={publication.keywords || []}
        onKeywordsChange={(keywords) => updateField('keywords', keywords)}
        skillName="publication"
      />
    </ExpandableEntry>
  );
}; 