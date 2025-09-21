'use client';

import React from 'react';
import { JsonResumePublication } from '@/types/jsonresume';
import { BookOpen, Calendar, Globe, Link, FileText } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

interface PublicationEntryProps {
  publication: JsonResumePublication;
  onPublicationChange: (publication: JsonResumePublication) => void;
}

export const PublicationEntry: React.FC<PublicationEntryProps> = ({
  publication,
  onPublicationChange
}) => {
  const updateField = (field: keyof JsonResumePublication, value: any) => {
    onPublicationChange({
      ...publication,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Publication Title"
          value={publication.name || ''}
          onChange={(value) => updateField('name', value)}
          placeholder="e.g., Advanced Machine Learning Techniques"
          required={true}
          icon={<BookOpen className="inline w-4 h-4 mr-1" />}
        />
        
        <InputField
          label="Publisher"
          value={publication.publisher || ''}
          onChange={(value) => updateField('publisher', value)}
          placeholder="e.g., ACM, IEEE, Nature Publishing"
          required={true}
        />
      </div>

      {/* Date and Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Release Date"
          value={publication.releaseDate || ''}
          onChange={(value) => updateField('releaseDate', value)}
          placeholder="YYYY-MM-DD"
          icon={<Calendar className="inline w-4 h-4 mr-1" />}
        />
        
        <UrlField
          label="Publisher Website"
          value={publication.website || ''}
          onChange={(value) => updateField('website', value)}
          placeholder="https://publisher.com"
          icon={<Globe className="inline w-4 h-4 mr-1" />}
        />
        
        <UrlField
          containerClassName="col-span-1 md:col-span-2"
          label="Publication URL"
          value={publication.url || ''}
          onChange={(value) => updateField('url', value)}
          placeholder="https://link-to-publication.com"
          icon={<Link className="inline w-4 h-4 mr-1" />}
        />
      </div>

      {/* Summary */}
      <TextArea
        label="Summary"
        value={publication.summary || ''}
        onChange={(value) => updateField('summary', value)}
        placeholder="Brief description of the publication, its significance, and key findings..."
        helpText="Describe the publication's content, methodology, and impact"
        rows={4}
        icon={<FileText className="inline w-4 h-4 mr-1" />}
      />

      {/* Keywords */}
      <KeywordsEntry
        keywords={publication.keywords || []}
        onKeywordsChange={(keywords) => updateField('keywords', keywords)}
        skillName="publication"
      />
    </div>
  );
}; 