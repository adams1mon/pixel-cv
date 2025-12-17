'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumeProject, JsonResumeProject } from '../../../../types/jsonresume';
import { FolderOpen, Calendar, Link, Building, Code, Plus, Trash2 } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface ProjectEntryProps {
  item: EnrichedJsonResumeProject;
  index: number;
  onUpdate: (project: EnrichedJsonResumeProject) => void;
  onRemove: () => void;
}

// TODO: entries are LAGGING

export const ProjectEntry: React.FC<ProjectEntryProps> = ({
  item,
  index,
  onUpdate,
  onRemove
}) => {
  // Memoize the updateField function to prevent unnecessary re-renders
  const updateField = useCallback((field: keyof JsonResumeProject, value: any) => {
    onUpdate({
      ...item,
      [field]: value
    });
  }, [item, onUpdate]);

  // Toggle visibility for this project
  const toggleVisibility = useCallback(() => {
    onUpdate({
      ...item,
      _visible: !item._visible
    });
  }, [item, onUpdate]);

  const title = item.name || 'New Project';
  const subtitle = item.entity 
    ? `${item.entity}${item.startDate ? ` • ${item.startDate}` : ''}${item.endDate ? ` - ${item.endDate}` : ''}`
    : 'Entity not set';

  // Highlights management
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

  // Keywords management
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

  // Roles management
  const addRole = () => {
    const roles = item.roles || [];
    updateField('roles', [...roles, '']);
  };

  const updateRole = (roleIndex: number, value: string) => {
    const roles = [...(item.roles || [])];
    roles[roleIndex] = value;
    updateField('roles', roles);
  };

  const removeRole = (roleIndex: number) => {
    const roles = (item.roles || []).filter((_, i) => i !== roleIndex);
    updateField('roles', roles);
  };

  return (
    <ExpandableEntry
      icon={<FolderOpen className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove project"
      visible={item._visible !== false}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Code className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Project Details</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Project Name"
            value={item.name || ''}
            onChange={(value) => updateField('name', value)}
            placeholder="e.g., E-commerce Platform"
            required={true}
          />
          
          <InputField
            label="Project Type"
            value={item.type || ''}
            onChange={(value) => updateField('type', value)}
            placeholder="e.g., Marketing Campaign, Research Study, App, Website, Event Planning..."
            helpText="Describe the type or category of your project"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Organization/Entity"
            value={item.entity || ''}
            onChange={(value) => updateField('entity', value)}
            placeholder="e.g., Personal Project, ABC Company"
            icon={<Building className="inline w-4 h-4 mr-1" />}
            helpText="Company, organization, or personal project"
          />
          
          <UrlField
            label="Project URL"
            value={item.url || ''}
            onChange={(value) => updateField('url', value)}
            placeholder="https://github.com/user/project"
            icon={<Link className="inline w-4 h-4 mr-1" />}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Timeline</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Start Date"
            value={item.startDate || ''}
            onChange={(value) => updateField('startDate', value)}
            type="text"
            placeholder="YYYY-MM"
            helpText="Format: YYYY-MM (e.g., 2023-01)"
          />
          
          <InputField
            label="End Date"
            value={item.endDate || ''}
            onChange={(value) => updateField('endDate', value)}
            type="text"
            placeholder="YYYY-MM (leave empty if ongoing)"
            helpText="Leave empty for ongoing projects"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-6">
        <TextArea
          label="Project Description"
          value={item.description || ''}
          onChange={(value) => updateField('description', value)}
          rows={4}
          placeholder="Describe what the project does, its purpose, and your role in it..."
          helpText="Focus on the project's goals and your contributions"
          maxLength={1000}
        />
      </div>

      {/* Roles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Your Roles</h4>
          <button
            type="button"
            onClick={addRole}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Role
          </button>
        </div>
        
        {(item.roles || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No roles added yet</p>
            <button
              type="button"
              onClick={addRole}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add your role in this project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(item.roles || []).map((role, rIndex) => (
              <div key={rIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Role ${rIndex + 1}`}
                    value={role}
                    onChange={(value) => updateRole(rIndex, value)}
                    placeholder="e.g., Lead Developer, UI Designer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeRole(rIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Key Features & Highlights */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Key Features & Highlights</h4>
          <button
            type="button"
            onClick={addHighlight}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Feature
          </button>
        </div>

        {(item.highlights || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No features added yet</p>
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add key features and achievements
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(item.highlights || []).map((highlight, hIndex) => (
              <div key={hIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Feature ${hIndex + 1}`}
                    value={highlight}
                    onChange={(value) => updateHighlight(hIndex, value)}
                    placeholder="e.g., Real-time chat functionality, Responsive design"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeHighlight(hIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove feature"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Keywords */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Keywords</h4>
          <button
            type="button"
            onClick={addKeyword}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Keyword
          </button>
        </div>
        
        {(item.keywords || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No keywords added yet</p>
            <button
              type="button"
              onClick={addKeyword}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add relevant keywords and skills
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(item.keywords || []).map((keyword, kIndex) => (
              <div key={kIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Keyword ${kIndex + 1}`}
                    value={keyword}
                    onChange={(value) => updateKeyword(kIndex, value)}
                    placeholder="e.g., Marketing, Adobe Creative Suite, Budget Management..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeKeyword(kIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove keyword"
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
