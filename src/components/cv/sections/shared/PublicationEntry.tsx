'use client';

import React, { useState } from 'react';
import { JsonResumePublication } from '@/types/jsonresume';
import { BookOpen, Calendar, Globe, Link, FileText, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

interface PublicationEntryProps {
  publication: JsonResumePublication;
  index: number;
  onPublicationChange: (publication: JsonResumePublication) => void;
  onRemove: () => void;
}

export const PublicationEntry: React.FC<PublicationEntryProps> = ({
  publication,
  index,
  onPublicationChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumePublication, value: any) => {
    onPublicationChange({
      ...publication,
      [field]: value
    });
  };

  const keywordsCount = (publication.keywords || []).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {publication.name || 'New Publication'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {publication.publisher ? publication.publisher : 'Publisher not set'}
                {publication.releaseDate ? ` • ${publication.releaseDate}` : ''}
                {keywordsCount > 0 && ` • ${keywordsCount} keyword${keywordsCount !== 1 ? 's' : ''}`}
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
              aria-label="Remove publication"
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
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Publication</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Publication Title"
                value={publication.name || ''}
                onChange={(value) => updateField('name', value)}
                placeholder="e.g., Advanced Machine Learning Techniques"
                required={true}
              />
              
              <InputField
                label="Publisher"
                value={publication.publisher || ''}
                onChange={(value) => updateField('publisher', value)}
                placeholder="e.g., ACM, IEEE, Nature Publishing"
                required={true}
              />
            </div>
          </div>

          {/* Date and Links */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Dates & Links</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Release Date"
                value={publication.releaseDate || ''}
                onChange={(value) => updateField('releaseDate', value)}
                placeholder="YYYY-MM-DD"
              />
              
              <UrlField
                label="Publisher Website"
                value={publication.website || ''}
                onChange={(value) => updateField('website', value)}
                placeholder="https://publisher.com"
              />
              
              <UrlField
                containerClassName="col-span-1 md:col-span-2"
                label="Publication URL"
                value={publication.url || ''}
                onChange={(value) => updateField('url', value)}
                placeholder="https://link-to-publication.com"
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
              placeholder="Brief description of the publication, its significance, and key findings..."
              helpText="Describe the publication's content, methodology, and impact"
              rows={4}
            />
          </div>

          {/* Keywords */}
          <KeywordsEntry
            keywords={publication.keywords || []}
            onKeywordsChange={(keywords) => updateField('keywords', keywords)}
            skillName="publication"
          />
        </div>
      )}
    </div>
  );
}; 