'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { createEmptyWork } from '../../../../types/jsonresume';
import { Briefcase } from 'lucide-react';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';
import { WorkEntry } from './WorkEntry';


export const WorkSectionEditor: React.FC = () => {
  const work = useCVStore(s => s.data.work || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Work array management
  const addWork = () => {
    const newWork = createEmptyWork();
    const updatedWork = [...work, newWork];
    updateSection("work", updatedWork);
  };

  const removeWork = (index: number) => {
    const updatedWork = work.filter((_, i) => i !== index);
    updateSection("work", updatedWork);
  };

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
                <WorkEntry
                  key={index}
                  index={index}
                  item={workItem}
                  onUpdate={(updated) => updateSectionItem("work", index, updated)}
                  onRemove={() => removeWork(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
};