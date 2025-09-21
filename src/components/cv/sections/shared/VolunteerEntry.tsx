'use client';

import React from 'react';
import { JsonResumeVolunteer } from '@/types/jsonresume';
import { Building2, MapPin, Calendar, Globe, Link, FileText, Star, Hash, Trash2 } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

interface VolunteerEntryProps {
  volunteer: JsonResumeVolunteer;
  onVolunteerChange: (volunteer: JsonResumeVolunteer) => void;
}

export const VolunteerEntry: React.FC<VolunteerEntryProps> = ({
  volunteer,
  onVolunteerChange
}) => {
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

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...(volunteer.highlights || [])];
    highlights[index] = value;
    updateField('highlights', highlights);
  };

  const removeHighlight = (index: number) => {
    const highlights = (volunteer.highlights || []).filter((_, i) => i !== index);
    updateField('highlights', highlights);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Organization"
          value={volunteer.organization || ''}
          onChange={(value) => updateField('organization', value)}
          placeholder="e.g., Red Cross, Local Food Bank, Habitat for Humanity"
          required={true}
          icon={<Building2 className="inline w-4 h-4 mr-1" />}
        />
        
        <InputField
          label="Position/Role"
          value={volunteer.position || ''}
          onChange={(value) => updateField('position', value)}
          placeholder="e.g., Volunteer Coordinator, Event Organizer, Tutor"
        />
      </div>

      {/* Location and Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Location"
          containerClassName="col-span-1 md:col-span-2"
          value={volunteer.location || ''}
          onChange={(value) => updateField('location', value)}
          placeholder="e.g., New York, NY or Remote"
          icon={<MapPin className="inline w-4 h-4 mr-1" />}
        />
        
        <InputField
          label="Start Date"
          value={volunteer.startDate || ''}
          onChange={(value) => updateField('startDate', value)}
          placeholder="YYYY-MM-DD"
          icon={<Calendar className="inline w-4 h-4 mr-1" />}
        />
        
        <InputField
          label="End Date"
          value={volunteer.endDate || ''}
          onChange={(value) => updateField('endDate', value)}
          placeholder="YYYY-MM-DD or leave blank if ongoing"
          helpText="Leave blank if ongoing"
          icon={<Calendar className="inline w-4 h-4 mr-1" />}
        />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UrlField
          label="Organization Website"
          value={volunteer.website || ''}
          onChange={(value) => updateField('website', value)}
          placeholder="https://organization.com"
          icon={<Globe className="inline w-4 h-4 mr-1" />}
        />
        
        <UrlField
          label="Volunteer Profile/URL"
          value={volunteer.url || ''}
          onChange={(value) => updateField('url', value)}
          placeholder="https://volunteer-profile.com"
          icon={<Link className="inline w-4 h-4 mr-1" />}
        />
      </div>

      {/* Summary */}
      <TextArea
        label="Summary"
        value={volunteer.summary || ''}
        onChange={(value) => updateField('summary', value)}
        placeholder="Describe your volunteer work, the organization's mission, and your role..."
        helpText="Explain what you did, the impact you made, and what you learned"
        rows={4}
        icon={<FileText className="inline w-4 h-4 mr-1" />}
      />

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
            {(volunteer.highlights || []).map((highlight, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Contribution ${index + 1}`}
                    value={highlight}
                    onChange={(value) => updateHighlight(index, value)}
                    placeholder="e.g., Organized fundraising event that raised $10,000"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
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
  );
};