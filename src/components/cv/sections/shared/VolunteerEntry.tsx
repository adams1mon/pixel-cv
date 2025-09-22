'use client';

import React, { useState } from 'react';
import { JsonResumeVolunteer } from '@/types/jsonresume';
import { Building2, MapPin, Calendar, Globe, Link, FileText, Star, Trash2, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

interface VolunteerEntryProps {
  volunteer: JsonResumeVolunteer;
  index: number;
  onVolunteerChange: (volunteer: JsonResumeVolunteer) => void;
  onRemove: () => void;
}

export const VolunteerEntry: React.FC<VolunteerEntryProps> = ({
  volunteer,
  index,
  onVolunteerChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumeVolunteer, value: any) => {
    onVolunteerChange({
      ...volunteer,
      [field]: value
    });
  };

  // Highlights management
  const addHighlight = () => {
    const highlights = volunteer.highlights || [];
    updateField('highlights', [...highlights, '']);
  };

  const updateHighlight = (highlightIndex: number, value: string) => {
    const highlights = [...(volunteer.highlights || [])];
    highlights[highlightIndex] = value;
    updateField('highlights', highlights);
  };

  const removeHighlight = (highlightIndex: number) => {
    const highlights = (volunteer.highlights || []).filter((_, i) => i !== highlightIndex);
    updateField('highlights', highlights);
  };

  const contributionsCount = (volunteer.highlights || []).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Heart className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {volunteer.organization || 'New Volunteer Experience'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {volunteer.position ? volunteer.position : 'Role not set'}
                {contributionsCount > 0 && ` • ${contributionsCount} contribution${contributionsCount !== 1 ? 's' : ''}`}
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
              aria-label="Remove volunteer experience"
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
              <Building2 className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Organization & Role</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Organization"
                value={volunteer.organization || ''}
                onChange={(value) => updateField('organization', value)}
                placeholder="e.g., Red Cross, Local Food Bank, Habitat for Humanity"
                required={true}
              />
              
              <InputField
                label="Position/Role"
                value={volunteer.position || ''}
                onChange={(value) => updateField('position', value)}
                placeholder="e.g., Volunteer Coordinator, Event Organizer, Tutor"
              />
            </div>
          </div>

          {/* Location and Dates */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Location & Dates</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Location"
                containerClassName="col-span-1 md:col-span-2"
                value={volunteer.location || ''}
                onChange={(value) => updateField('location', value)}
                placeholder="e.g., New York, NY or Remote"
              />
              
              <InputField
                label="Start Date"
                value={volunteer.startDate || ''}
                onChange={(value) => updateField('startDate', value)}
                placeholder="YYYY-MM-DD"
              />
              
              <InputField
                label="End Date"
                value={volunteer.endDate || ''}
                onChange={(value) => updateField('endDate', value)}
                placeholder="YYYY-MM-DD"
                helpText="Leave blank if ongoing"
              />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Links</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UrlField
                label="Organization Website"
                value={volunteer.website || ''}
                onChange={(value) => updateField('website', value)}
                placeholder="https://organization.com"
              />
              
              <UrlField
                label="Volunteer Profile/URL"
                value={volunteer.url || ''}
                onChange={(value) => updateField('url', value)}
                placeholder="https://volunteer-profile.com"
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
              value={volunteer.summary || ''}
              onChange={(value) => updateField('summary', value)}
              placeholder="Describe your volunteer work, the organization's mission, and your role..."
              helpText="Explain what you did, the impact you made, and what you learned"
              rows={4}
            />
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900">Key Contributions</h4>
              </div>
              <button
                type="button"
                onClick={addHighlight}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Add Contribution
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              Highlight your key achievements, responsibilities, and impact during this volunteer experience.
            </p>
            
            {(volunteer.highlights || []).length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p className="mb-2">No contributions added yet</p>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Add your first contribution
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {(volunteer.highlights || []).map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex gap-3">
                    <div className="flex-1">
                      <InputField
                        label={`Contribution ${highlightIndex + 1}`}
                        value={highlight}
                        onChange={(value) => updateHighlight(highlightIndex, value)}
                        placeholder="e.g., Organized fundraising event that raised $10,000"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHighlight(highlightIndex)}
                      className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                      aria-label="Remove contribution"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Keywords */}
          <KeywordsEntry
            keywords={volunteer.keywords || []}
            onKeywordsChange={(keywords) => updateField('keywords', keywords)}
            skillName="volunteer"
          />
        </div>
      )}
    </div>
  );
};