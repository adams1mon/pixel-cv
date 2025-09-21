'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeWork, createEmptyWork } from '../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, Briefcase, MapPin, Calendar, Building } from 'lucide-react';
import { InputField, UrlField, TextArea } from './shared/InputField';

export const WorkSectionEditor: React.FC = () => {
  const { cvData, updateWork } = useCV();
  const [expandedWork, setExpandedWork] = useState<Set<number>>(new Set([0])); // First work expanded by default

  const work = cvData.work || [];

  // Toggle expandable work entries
  const toggleWorkExpanded = (index: number) => {
    const newExpanded = new Set(expandedWork);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedWork(newExpanded);
  };

  // Work array management
  const addWork = () => {
    const newWork = createEmptyWork();
    const updatedWork = [...work, newWork];
    updateWork(updatedWork);
    
    // Expand the new work entry
    setExpandedWork(prev => new Set([...prev, updatedWork.length - 1]));
  };

  const removeWork = (index: number) => {
    const updatedWork = work.filter((_, i) => i !== index);
    updateWork(updatedWork);
    
    // Update expanded set to account for removed item
    const newExpanded = new Set<number>();
    expandedWork.forEach(expandedIndex => {
      if (expandedIndex < index) {
        newExpanded.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpanded.add(expandedIndex - 1);
      }
    });
    setExpandedWork(newExpanded);
  };

  const updateSingleWork = (index: number, updates: Partial<JsonResumeWork>) => {
    const updatedWork = work.map((workItem, i) => 
      i === index ? { ...workItem, ...updates } : workItem
    );
    updateWork(updatedWork);
  };

  // Highlight management
  const addHighlight = (workIndex: number) => {
    const workItem = work[workIndex];
    const highlights = workItem.highlights || [];
    updateSingleWork(workIndex, {
      highlights: [...highlights, '']
    });
  };

  const updateHighlight = (workIndex: number, highlightIndex: number, value: string) => {
    const workItem = work[workIndex];
    const highlights = [...(workItem.highlights || [])];
    highlights[highlightIndex] = value;
    updateSingleWork(workIndex, { highlights });
  };

  const removeHighlight = (workIndex: number, highlightIndex: number) => {
    const workItem = work[workIndex];
    const highlights = (workItem.highlights || []).filter((_, i) => i !== highlightIndex);
    updateSingleWork(workIndex, { highlights });
  };

  // Keywords/Technologies management
  const addKeyword = (workIndex: number) => {
    const workItem = work[workIndex];
    const keywords = workItem.keywords || [];
    updateSingleWork(workIndex, {
      keywords: [...keywords, '']
    });
  };

  const updateKeyword = (workIndex: number, keywordIndex: number, value: string) => {
    const workItem = work[workIndex];
    const keywords = [...(workItem.keywords || [])];
    keywords[keywordIndex] = value;
    updateSingleWork(workIndex, { keywords });
  };

  const removeKeyword = (workIndex: number, keywordIndex: number) => {
    const workItem = work[workIndex];
    const keywords = (workItem.keywords || []).filter((_, i) => i !== keywordIndex);
    updateSingleWork(workIndex, { keywords });
  };

  // Current position toggle
  const toggleCurrentPosition = (workIndex: number) => {
    const workItem = work[workIndex];
    const isCurrentPosition = !workItem.endDate;
    updateSingleWork(workIndex, {
      endDate: isCurrentPosition ? new Date().toISOString().split('T')[0] : undefined
    });
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">
          Your professional work history, achievements, and responsibilities. Start with your most recent position.
        </p>
      </div>

      <div className="space-y-6">
        {work.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h3>
            <p className="text-gray-600 mb-6">Add your professional experience to showcase your career journey.</p>
            <button
              type="button"
              onClick={addWork}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Work Experience
            </button>
          </div>
        ) : (
          <>
            {work.map((workItem, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Work Header */}
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {workItem.position || 'New Position'} 
                          {workItem.name && ` at ${workItem.name}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Work Experience #{index + 1}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleWorkExpanded(index)}
                        className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                      >
                        {expandedWork.has(index) ? (
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
                        onClick={() => removeWork(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                        aria-label="Remove work experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Work Details */}
                {expandedWork.has(index) && (
                  <div className="p-6 space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="text-lg font-semibold text-gray-900">Company & Role</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Job Title"
                          value={workItem.position || ''}
                          onChange={(value) => updateSingleWork(index, { position: value })}
                          placeholder="e.g., Senior Software Engineer"
                          required={true}
                        />
                        
                        <InputField
                          label="Company Name"
                          value={workItem.name || ''}
                          onChange={(value) => updateSingleWork(index, { name: value })}
                          placeholder="e.g., Tech Corp Inc."
                          required={true}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Location"
                          value={workItem.location || ''}
                          onChange={(value) => updateSingleWork(index, { location: value })}
                          placeholder="e.g., San Francisco, CA"
                          icon={<MapPin className="inline w-4 h-4 mr-1" />}
                        />
                        
                        <UrlField
                          label="Company Website"
                          value={workItem.website || ''}
                          onChange={(value) => updateSingleWork(index, { website: value })}
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
                          value={workItem.startDate || ''}
                          onChange={(value) => updateSingleWork(index, { startDate: value })}
                          type="text"
                          placeholder="YYYY-MM"
                          helpText="Format: YYYY-MM (e.g., 2023-01)"
                          required={true}
                        />
                        
                        <div>
                          <InputField
                            label="End Date"
                            value={workItem.endDate || ''}
                            onChange={(value) => updateSingleWork(index, { endDate: value })}
                            type="text"
                            placeholder="YYYY-MM"
                            helpText="Format: YYYY-MM (e.g., 2024-06)"
                            disabled={!workItem.endDate} // Disabled when current position
                          />
                          
                          <label className="flex items-center mt-3">
                            <input
                              type="checkbox"
                              checked={!workItem.endDate}
                              onChange={() => toggleCurrentPosition(index)}
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
                          value={workItem.summary || ''}
                          onChange={(value) => updateSingleWork(index, { summary: value })}
                          rows={4}
                          placeholder="Describe your role, responsibilities, and key contributions in this position..."
                          helpText="Focus on your main responsibilities and impact"
                          maxLength={1000}
                        />
                        
                        <InputField
                          label="Company Description"
                          value={workItem.description || ''}
                          onChange={(value) => updateSingleWork(index, { description: value })}
                          placeholder="Brief description of the company or department"
                          helpText="Optional: Help context about the organization"
                        />
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Key Achievements & Highlights</h4>
                        <button
                          type="button"
                          onClick={() => addHighlight(index)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Achievement
                        </button>
                      </div>
                      
                      {(workItem.highlights || []).length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                          <p className="mb-3">No achievements added yet</p>
                          <button
                            type="button"
                            onClick={() => addHighlight(index)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Add your first achievement
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {(workItem.highlights || []).map((highlight, hIndex) => (
                            <div key={hIndex} className="flex gap-3">
                              <div className="flex-1">
                                <InputField
                                  label={`Achievement ${hIndex + 1}`}
                                  value={highlight}
                                  onChange={(value) => updateHighlight(index, hIndex, value)}
                                  placeholder="e.g., Increased team productivity by 30% through process improvements"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeHighlight(index, hIndex)}
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
                          onClick={() => addKeyword(index)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Technology
                        </button>
                      </div>
                      
                      {(workItem.keywords || []).length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                          <p className="mb-3">No technologies added yet</p>
                          <button
                            type="button"
                            onClick={() => addKeyword(index)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Add technologies you used
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(workItem.keywords || []).map((keyword, kIndex) => (
                            <div key={kIndex} className="flex gap-3">
                              <div className="flex-1">
                                <InputField
                                  label={`Technology ${kIndex + 1}`}
                                  value={keyword}
                                  onChange={(value) => updateKeyword(index, kIndex, value)}
                                  placeholder="e.g., React, Python, AWS"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeKeyword(index, kIndex)}
                                className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                                aria-label="Remove technology"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Add New Work Button */}
            <button
              type="button"
              onClick={addWork}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Work Experience
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 