'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeSkill, createEmptySkill } from '../../../types/jsonresume';
import { Plus, Lightbulb } from 'lucide-react';
import { SkillEntry } from './shared/SkillEntry';

export const SkillsSectionEditor: React.FC = () => {
  const { cvData, updateSkills } = useCV();
  
  const skills = cvData.skills || [];

  // Skill array management
  const addSkill = () => {
    const newSkill = createEmptySkill();
    const updatedSkills = [...skills, newSkill];
    updateSkills(updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateSkills(updatedSkills);
  };

  const updateSingleSkill = (index: number, skill: JsonResumeSkill) => {
    const updatedSkills = skills.map((s, i) => i === index ? skill : s);
    updateSkills(updatedSkills);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">
          List your professional skills, technologies, and competencies with proficiency levels and related keywords.
        </p>
      </div>

      <div className="space-y-6">
        {skills.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
            <p className="text-gray-600 mb-6">Add your professional skills to showcase your expertise.</p>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Skill
            </button>
          </div>
        ) : (
          <>
            {skills.map((skill, index) => (
              <SkillEntry
                key={index}
                skill={skill}
                index={index}
                onSkillChange={(updatedSkill) => updateSingleSkill(index, updatedSkill)}
                onRemove={() => removeSkill(index)}
              />
            ))}
            
            {/* Add New Skill Button */}
            <button
              type="button"
              onClick={addSkill}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Skill
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 