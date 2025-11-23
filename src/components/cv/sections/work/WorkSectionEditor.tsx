'use client';

import React, { useState } from 'react';
import { useCVStore } from '@/stores/cv-store';
import { EnrichedJsonResumeWork, createEmptyWork } from '../../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, Briefcase, Calendar, Building } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';
import { VisibilityToggle } from '../../VisibilityToggle';


export const WorkSectionEditor: React.FC = () => {
  const work = useCVStore(s => s.data.work || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);
  const [expandedWork, setExpandedWork] = useState<Set<number>>(new Set([0])); // First work expanded by default

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
    updateSection("work", updatedWork);
    
    // Expand the new work entry
    setExpandedWork(prev => new Set([...prev, updatedWork.length - 1]));
  };

  const removeWork = (index: number) => {
    const updatedWork = work.filter((_, i) => i !== index);
    updateSection("work", updatedWork);
    
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

  const updateSingleWork = (index: number, updates: Partial<EnrichedJsonResumeWork>) => {
    const workItem = work[index];
    const updatedItem = { ...workItem, ...updates } as EnrichedJsonResumeWork;
    updateSectionItem("work", index, updatedItem);
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

  // TODO: use ExpandableEntry

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Work Experience'
        subtitle='Your professional work history, achievements, and responsibilities. Start with your most recent position.'
      />

      <div className="space-y-6">
        {work.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Work Experience'
            addItem={addWork}
            icon={
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No work experience added yet'
            subtitle='Add your professional experience to showcase your career journey.'
          />

        ) : (

          <ListItems
            addItem={addWork}
            buttonText='Add Another Work Experience'
            listItems={
              work.map((workItem, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Work Header */}
                  <div className="flex flex-col items-between gap-2 bg-gray-50 px-6 py-4">
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

                    <VisibilityToggle visible={workItem._visible} onToggle={() => {
                      updateSingleWork(index, {
                        ...workItem,
                        _visible: !workItem._visible,
                      })
                    }}/>
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
                        
                        <div className="space-y-3">
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
                              <div key={kIndex} className="flex gap-1 items-center">
                                <div className="flex-1">
                                  <InputField
                                    value={keyword}
                                    onChange={(value) => updateKeyword(index, kIndex, value)}
                                    placeholder="e.g., React, Python, AWS"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeKeyword(index, kIndex)}
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
                    </div>
                  )}
                </div>
              ))
            }
          />
        )}
      </div>
    </div>
  );
}; 