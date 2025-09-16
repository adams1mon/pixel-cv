'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { createEmptyEducation } from '../../../types/cv-data';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const COMMON_DEGREES = [
  { value: 'BSc', label: 'Bachelor of Science (BSc)' },
  { value: 'BA', label: 'Bachelor of Arts (BA)' },
  { value: 'BEng', label: 'Bachelor of Engineering (BEng)' },
  { value: 'MSc', label: 'Master of Science (MSc)' },
  { value: 'MA', label: 'Master of Arts (MA)' },
  { value: 'MEng', label: 'Master of Engineering (MEng)' },
  { value: 'MBA', label: 'Master of Business Administration (MBA)' },
  { value: 'PhD', label: 'Doctor of Philosophy (PhD)' },
  { value: 'MD', label: 'Doctor of Medicine (MD)' },
  { value: 'JD', label: 'Juris Doctor (JD)' },
  { value: 'other', label: 'Other' },
];

export const EducationSectionEditor: React.FC = () => {
  const { 
    cvData, 
    addEducation, 
    updateSingleEducation, 
    removeEducation 
  } = useCV();

  // Track which education entries have expanded optional fields
  const [expandedOptional, setExpandedOptional] = useState<Set<string>>(new Set());

  // Helper to update education
  const handleEducationUpdate = (index: number, field: string, value: any) => {
    const education = cvData.sections.education[index];
    if (education) {
      updateSingleEducation(education.id, {
        ...education,
        [field]: value
      });
    }
  };

  // Add new education using context
  const handleAddEducation = () => {
    const newEducation = createEmptyEducation();
    addEducation(newEducation);
  };

  // Remove education by index
  const handleRemoveEducation = (index: number) => {
    const education = cvData.sections.education[index];
    if (education) {
      removeEducation(education.id);
    }
  };

  // Toggle optional fields for a specific education entry
  const toggleOptionalFields = (educationId: string) => {
    const newExpanded = new Set(expandedOptional);
    if (newExpanded.has(educationId)) {
      newExpanded.delete(educationId);
    } else {
      newExpanded.add(educationId);
    }
    setExpandedOptional(newExpanded);
  };

  // TODO: currently studying broken

  return (
    <div className="section-editor">
      <div className="mb-6">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
          <p className="text-sm text-gray-600">Your academic background, degrees, and educational achievements.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {cvData.sections.education.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No education entries yet</h3>
              <p className="text-gray-500 mb-4">Add your first educational background to get started.</p>
              <button
                onClick={handleAddEducation}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </button>
            </div>
          </div>
        ) : (
          <>
            {cvData.sections.education.map((edu, index) => (
              <div key={edu.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Education #{index + 1}</h3>
                  <button
                    onClick={() => handleRemoveEducation(index)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationUpdate(index, 'institution', e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="University name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Degree</label>
                  <select
                    value={edu.degree}
                    onChange={(e) => handleEducationUpdate(index, 'degree', e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select degree</option>
                    {COMMON_DEGREES.map((degree) => (
                      <option key={degree.value} value={degree.value}>
                        {degree.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom degree field - only show if "other" is selected */}
                {edu.degree === 'other' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Custom Degree</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy} // We'll use fieldOfStudy to store custom degree temporarily
                      onChange={(e) => handleEducationUpdate(index, 'fieldOfStudy', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your degree title"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={edu.degree === 'other' ? '' : edu.fieldOfStudy}
                    onChange={(e) => handleEducationUpdate(index, 'fieldOfStudy', e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Computer Science"
                    disabled={edu.degree === 'other'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleEducationUpdate(index, 'location', e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => handleEducationUpdate(index, 'startDate', e.target.value)}
                    placeholder="2020-09"
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center mb-3">
                    <input
                      id={`ongoing-${edu.id}`}
                      type="checkbox"
                      checked={edu.isOngoing}
                      onChange={(e) => {
                        handleEducationUpdate(index, 'isOngoing', e.target.checked);
                        if (e.target.checked) {
                          handleEducationUpdate(index, 'endDate', null);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                    />
                    <label htmlFor={`ongoing-${edu.id}`} className="text-sm font-medium text-gray-700">
                      Currently studying
                    </label>
                  </div>
                  
                  {!edu.isOngoing && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) => handleEducationUpdate(index, 'endDate', e.target.value || null)}
                        placeholder="2024-06"
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Fields - Collapsible */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <button
                  onClick={() => toggleOptionalFields(edu.id)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {expandedOptional.has(edu.id) ? (
                    <ChevronUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  )}
                  Additional Details
                </button>

                {expandedOptional.has(edu.id) && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">GPA</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={edu.gpa || ''}
                        onChange={(e) => handleEducationUpdate(index, 'gpa', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.8"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Honors</label>
                      <input
                        type="text"
                        value={edu.honors || ''}
                        onChange={(e) => handleEducationUpdate(index, 'honors', e.target.value || undefined)}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Magna Cum Laude"
                      />
                    </div>
                  </div>
                )}
                </div>
             </div>
           ))}

           <div className="w-full flex justify-center">
             <button
               onClick={handleAddEducation}
               className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
             >
               <Plus className="w-4 h-4 mr-2" />
               Add Education
             </button>
           </div>
         </>
        )}
       </div>
     </div>
   );
 }; 