'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { createEmptySkill } from '../../../types/cv-data';
import { Plus, Trash2 } from 'lucide-react';

const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export const SkillsSectionEditor: React.FC = () => {
  const { cvData, updateSkills } = useCV();
  
  // Local state for new skill input
  const [newSkillName, setNewSkillName] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Helper to update skills array
  const updateSkillsArray = (updatedSkills: typeof cvData.sections.skills.skills) => {
    updateSkills({
      ...cvData.sections.skills,
      skills: updatedSkills
    });
  };

  // Add new skill
  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const newSkill = {
        ...createEmptySkill(),
        name: newSkillName.trim()
      };
      updateSkillsArray([...cvData.sections.skills.skills, newSkill]);
      setNewSkillName('');
    }
  };

  // Handle Enter key in skill input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillId: string) => {
    updateSkillsArray(
      cvData.sections.skills.skills.filter(skill => skill.id !== skillId)
    );
  };

  // Update single skill
  const handleUpdateSkill = (skillId: string, field: string, value: any) => {
    updateSkillsArray(
      cvData.sections.skills.skills.map(skill =>
        skill.id === skillId 
          ? { ...skill, [field]: value }
          : skill
      )
    );
  };

  // Toggle section visibility
  const handleToggleVisibility = () => {
    updateSkills({
      ...cvData.sections.skills,
      isVisible: !cvData.sections.skills.isVisible
    });
  };

  return (
    <div className="section-editor">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
            <p className="text-sm text-gray-600">Add your professional skills, technologies, and competencies.</p>
          </div>
        </div>
      </div>

      {/* Section Visibility Toggle */}
      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="skills-visible"
              type="checkbox"
              checked={cvData.sections.skills.isVisible}
              onChange={handleToggleVisibility}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="skills-visible" className="text-sm font-medium text-gray-700">
              Show skills section
            </label>
            <p className="text-xs text-gray-500">
              Uncheck to hide this section from your CV while keeping the content saved.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Skill */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h3>
        <div className="flex flex-col items-center gap-2">
          <input
            id='add-new-skill'
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g. React, Python, Project Management..."
            className="w-full flex-1 text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddSkill}
            disabled={!newSkillName.trim()}
            className="w-full flex justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div className="mb-4">
        <div className="flex items-start p-4">
          <div className="flex items-center h-5">
            <input
              id="advanced-options"
              type="checkbox"
              checked={showAdvancedOptions}
              onChange={(e) => setShowAdvancedOptions(e.target.checked)}
              className="mt-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="advanced-options" className="text-sm font-medium text-gray-700">
              Show advanced options
            </label>
            <p className="text-xs text-gray-500">
              Add proficiency levels and years of experience to your skills.
            </p>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {cvData.sections.skills.skills.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
              <p className="text-gray-500">Start adding your professional skills above.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {cvData.sections.skills.skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {skill.name}
                    </span>
                    {skill.proficiency && (
                      <span className="text-xs text-gray-500 capitalize">
                        {skill.proficiency}
                      </span>
                    )}
                    {skill.yearsOfExperience && (
                      <span className="text-xs text-gray-500">
                        {skill.yearsOfExperience} years
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Advanced Options */}
                {showAdvancedOptions && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Proficiency</label>
                      <select
                        value={skill.proficiency || ''}
                        onChange={(e) => handleUpdateSkill(skill.id, 'proficiency', e.target.value || undefined)}
                        className="w-full text-black px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        {PROFICIENCY_LEVELS.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Years of Experience</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={skill.yearsOfExperience || ''}
                        onChange={(e) => handleUpdateSkill(skill.id, 'yearsOfExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-full text-black px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add More Skills Button (when skills exist) */}
      {cvData.sections.skills.skills.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              // Focus the skill input
              const input = document.querySelector('input#add-new-skill') as HTMLInputElement;
              input?.focus();
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More Skills
          </button>
        </div>
      )}
    </div>
  );
}; 