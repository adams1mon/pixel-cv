'use client';

import React from 'react';
import { JsonResumeAward, createEmptyAward } from '../../../../types/jsonresume';
import { Award as AwardIcon } from 'lucide-react';
import { AwardEntry } from './AwardEntry';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';

export const AwardsSectionEditor: React.FC = () => {

  const awards = useCVStore(s => s.data.awards || []);
  const updateAwards = useCVStore(s => s.updateAwards);

  console.count("awards section render");

  // Awards array management
  const addAward = () => {
    const newAward = createEmptyAward();
    const updatedAwards = [...awards, newAward];
    updateAwards(updatedAwards);
  };

  const removeAward = (index: number) => {
    const updatedAwards = awards.filter((_, i) => i !== index);
    updateAwards(updatedAwards);
  };

  const updateSingleAward = (index: number, updated: JsonResumeAward) => {
    const updatedAwards = awards.map((awardItem, i) => 
      i === index ? updated : awardItem
    );
    updateAwards(updatedAwards);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader 
        title='No awards added yet'
        subtitle='Add your first award to get started.'
      />

      <div className="space-y-6">
        {awards.length === 0 ? (

          <ListPlaceholder 
            title='No awards added yet'
            subtitle='Add your first award to get started.'
            addItem={addAward}
            icon={
              <AwardIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            buttonText='Add First Award'
          />

        ) : (

          <ListItems
            addItem={addAward} 
            buttonText='Add Another Award'
            listItems={
              awards.map((award, index) => (
                // <AwardEntry
                <AwardEntry
                  key={index}
                  index={index}
                  item={award}
                  onUpdate={(updated) => updateSingleAward(index, updated)}
                  onRemove={() => removeAward(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 