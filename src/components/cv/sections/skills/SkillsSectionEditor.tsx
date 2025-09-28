'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { JsonResumeSkill, createEmptySkill } from '../../../../types/jsonresume';
import { Plus, Lightbulb } from 'lucide-react';
import { SkillEntry } from './SkillEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';

export const SkillsSectionEditor: React.FC = () => {
  const skills = useCVStore(s => s.data.skills || []);
  const updateSkills = useCVStore(s => s.updateSkills);

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

      <EditorHeader
        title='Skills'
        subtitle='List your professional skills and competencies with proficiency levels and related keywords.'
      />

      <div className="space-y-6">
        {skills.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Skill'
            addItem={addSkill}
            icon={
              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No skills added yet'
            subtitle='Add your professional skills to showcase your expertise.'
          />

        ) : (

          <ListItems
            addItem={addSkill}
            buttonText='Add Another Skill'
            listItems={
              skills.map((skill, index) => (
                <SkillEntry
                  key={index}
                  skill={skill}
                  index={index}
                  onSkillChange={(updatedSkill) => updateSingleSkill(index, updatedSkill)}
                  onRemove={() => removeSkill(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 