'use client';

import React from 'react';
import { createEmptyEducation } from '../../../../types/jsonresume';
import { GraduationCap } from 'lucide-react';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';
import { EducationEntry } from './EducationEntry';


export const EducationSectionEditor: React.FC = () => {

  const education = useCVStore(s => s.data.education || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Education array management
  const addEducation = () => {
    const newEducation = createEmptyEducation();
    const updatedEducation = [...education, newEducation];
    updateSection("education", updatedEducation);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    updateSection("education", updatedEducation);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Education'
        subtitle='Your academic background, qualifications, and educational achievements.'
      />
      
      <div className="space-y-6">
        {education.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Education'
            addItem={addEducation}
            icon={
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No education added yet'
            subtitle='Add your educational background to showcase your qualifications.'
          />

        ) : (

          <ListItems
            addItem={addEducation}
            buttonText='Add Another Education'
            listItems={
              education.map((eduItem, index) => (
                <EducationEntry
                  key={index}
                  index={index}
                  item={eduItem}
                  onUpdate={(updated) => updateSectionItem("education", index, updated)}
                  onRemove={() => removeEducation(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
};