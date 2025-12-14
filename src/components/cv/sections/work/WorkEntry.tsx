'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumeWork, JsonResumeWork } from '../../../../types/jsonresume';
import { Briefcase, Calendar, Building, Plus, Trash2 } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface WorkEntryProps {
  item: EnrichedJsonResumeWork;
  index: number;
  onUpdate: (work: EnrichedJsonResumeWork) => void;
  onRemove: () => void;
}

export const WorkEntry: React.FC<WorkEntryProps> = ({
  item,
  index,
  onUpdate,
  onRemove
}) => {
  // Memoize the updateField function to prevent unnecessary re-renders
  const updateField = useCallback((field: keyof JsonResumeWork, value: any) => {
    onUpdate({
      ...item,
      [field]: value
    });
  }, [item, onUpdate]);

  // Toggle visibility for this work
  const toggleVisibility = useCallback(() => {
    onUpdate({
      ...item,
      _visible: !item._visible
    });
  }, [item, onUpdate]);

  const title = item.position || 'New Position';
  const subtitle = item.name 
    ? `${item.name}${item.startDate ? ` • ${item.startDate}` : ''}${item.endDate ? ` - ${item.endDate}` : ''}`
    : 'Company not set';

  // Highlight management
  const addHighlight = () => {
    const highlights = item.highlights || [];
    updateField('highlights', [...highlights, '']);
  };

  const updateHighlight = (highlightIndex: number, value: string) => {
    const highlights = [...(item.highlights || [])];
    highlights[highlightIndex] = value;
    updateField('highlights', highlights);
  };

  const removeHighlight = (highlightIndex: number) => {
    const highlights = (item.highlights || []).filter((_, i) => i !== highlightIndex);
    updateField('highlights', highlights);
  };

  // Keywords/Technologies management
  const addKeyword = () => {
    const keywords = item.keywords || [];
    updateField('keywords', [...keywords, '']);
  };

  const updateKeyword = (keywordIndex: number, value: string) => {
    const keywords = [...(item.keywords || [])];
    keywords[keywordIndex] = value;
    updateField('keywords', keywords);
  };

  const removeKeyword = (keywordIndex: number) => {
    const keywords = (item.keywords || []).filter((_, i) => i !== keywordIndex);
    updateField('keywords', keywords);
  };

  // Current position toggle
  const toggleCurrentPosition = () => {
    const isCurrentPosition = !item.endDate;
    updateField('endDate', isCurrentPosition ? new Date().toISOString().split('T')[0] : undefined);
  };

  return (
    <ExpandableEntry
      icon={<Briefcase className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove work experience"
      visible={item._visible !== false}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Building className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Company & Role</h4>
        </div>
        
        <div className="space-y-3">
          <InputField
            label="Job Title"
            value={item.position || ''}
            onChange={(value) => updateField('position', value)}
            placeholder="e.g., Senior Software Engineer"
            required={true}
          />
          
          <InputField
            label="Company Name"
            value={item.name || ''}
            onChange={(value) => updateField('name', value)}
            placeholder="e.g., Tech Corp Inc."
            required={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Location"
            value={item.location || ''}
            onChange={(value) => updateField('location', value)}
            placeholder="e.g., San Francisco, CA"
          />
          
          <UrlField
            label="Company Website"
            value={item.website || ''}
            onChange={(value) => updateField('website', value)}
            placeholder="https://company.com"
          />
        </div>
      </div>

      {/* Employment Period */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Employment Period</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Start Date"
            value={item.startDate || ''}
            onChange={(value) => updateField('startDate', value)}
            type="text"
            placeholder="YYYY-MM"
            helpText="Format: YYYY-MM (e.g., 2023-01)"
            required={true}
          />
          
          <div>
            <InputField
              label="End Date"
              value={item.endDate || ''}
              onChange={(value) => updateField('endDate', value)}
              type="text"
              placeholder="YYYY-MM"
              helpText="Format: YYYY-MM (e.g., 2024-06)"
              disabled={!item.endDate} // Disabled when current position
            />
            
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={!item.endDate}
                onChange={toggleCurrentPosition}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">This is my current position</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-6">
        <div className="space-y-4">
          <TextArea
            label="Job Summary"
            value={item.summary || ''}
            onChange={(value) => updateField('summary', value)}
            rows={4}
            placeholder="Describe your role, responsibilities, and key contributions in this position..."
            helpText="Focus on your main responsibilities and impact"
            maxLength={1000}
          />
          
          <InputField
            label="Company Description"
            value={item.description || ''}
            onChange={(value) => updateField('description', value)}
            placeholder="Brief description of the company or department"
          />
        </div>
      </div>

      {/* Key Achievements */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Key Achievements & Highlights</h4>
          <button
            type="button"
            onClick={addHighlight}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </button>
        </div>
        
        {(item.highlights || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No achievements added yet</p>
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add your first achievement
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(item.highlights || []).map((highlight, hIndex) => (
              <div key={hIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    value={highlight}
                    onChange={(value) => updateHighlight(hIndex, value)}
                    placeholder="e.g., Increased team productivity by 30% through process improvements"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeHighlight(hIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove achievement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Technologies & Keywords */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Technologies & Skills</h4>
          <button
            type="button"
            onClick={addKeyword}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Technology
          </button>
        </div>
        
        {(item.keywords || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No technologies added yet</p>
            <button
              type="button"
              onClick={addKeyword}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add technologies you used
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(item.keywords || []).map((keyword, kIndex) => (
              <div key={kIndex} className="flex gap-1 items-center">
                <div className="flex-1">
                  <InputField
                    value={keyword}
                    onChange={(value) => updateKeyword(kIndex, value)}
                    placeholder="e.g., React, Python, AWS"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeKeyword(kIndex)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove technology"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ExpandableEntry>
  );
};