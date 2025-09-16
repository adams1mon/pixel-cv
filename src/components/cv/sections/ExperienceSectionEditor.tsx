'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { createEmptyExperience } from '../../../types/cv-data';
import { Plus, Trash2 } from 'lucide-react';

export const ExperienceSectionEditor: React.FC = () => {
  const { 
    cvData, 
    addExperience: addExp, 
    updateSingleExperience, 
    removeExperience 
  } = useCV();

  // Helper to update experience
  const handleExperienceUpdate = (index: number, field: string, value: any) => {
    const experience = cvData.sections.experience[index];
    if (experience) {
      updateSingleExperience(experience.id, {
        ...experience,
        [field]: value
      });
    }
  };

  // Add new experience using context
  const handleAddExperience = () => {
    const newExperience = createEmptyExperience();
    addExp(newExperience);
  };

  // Remove experience by index
  const handleRemoveExperience = (index: number) => {
    const experience = cvData.sections.experience[index];
    if (experience) {
      removeExperience(experience.id);
    }
  };

  return (
    <div className="section-editor">
      <div className="mb-6">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
          <p className="text-sm text-gray-600">Your professional work history and achievements.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {cvData.sections.experience.length === 0 ?
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No experience entries yet</h3>
              <p className="text-gray-500 mb-4">Add your first work experience to get started.</p>
              <button
                onClick={handleAddExperience}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>
          </div>
          :
          <>
            {cvData.sections.experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Experience #{index + 1}</h3>
                  <button
                    onClick={() => handleRemoveExperience(index)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceUpdate(index, 'company', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleExperienceUpdate(index, 'position', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExperienceUpdate(index, 'location', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceUpdate(index, 'startDate', e.target.value)}
                      placeholder="2023-01"
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-3">
                      <input
                        id={`current-position-${exp.id}`}
                        type="checkbox"
                        checked={exp.isCurrentPosition}
                        onChange={(e) => {
                          handleExperienceUpdate(index, 'isCurrentPosition', e.target.checked);
                          if (e.target.checked) {
                            handleExperienceUpdate(index, 'endDate', null);
                          }
                        }}
                        className="h-4 w-4itext-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                      />
                      <label htmlFor={`current-position-${exp.id}`} className="text-sm font-medium text-gray-700">
                        Current position
                      </label>
                    </div>
                    
                    {!exp.isCurrentPosition && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate || ''}
                          onChange={(e) => handleExperienceUpdate(index, 'endDate', e.target.value || null)}
                          placeholder="2024-01"
                          className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceUpdate(index, 'description', e.target.value)}
                      rows={4}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder="Describe your role, responsibilities, and key achievements..."
                    />
                  </div>
                </div>

              </div>
            ))}

            <div className="w-full flex justify-center">
              <button
                onClick={handleAddExperience}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
}; 