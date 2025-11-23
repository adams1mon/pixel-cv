"use client";

import React from 'react';
import { createEmptyInterest } from '../../../../types/jsonresume';
import { Heart } from 'lucide-react';
import { InterestEntry } from './InterestEntry';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


export const InterestsSectionEditor: React.FC = () => {

  const interests = useCVStore(s => s.data.interests || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Interests array management
  const addInterest = () => {
    const newInterest = createEmptyInterest();
    const updatedInterests = [...interests, newInterest];
    updateSection("interests", updatedInterests);
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    updateSection("interests", updatedInterests);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Interests & Hobbies'
        subtitle='Share your personal interests to add personality to your CV.'
      />

      <div className="space-y-6">
        {interests.length === 0 ? (

          <ListPlaceholder 
            buttonText='Add First Interest'
            addItem={addInterest}
            icon={
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No interests yet'
            subtitle='Add your first interest to get started.'
          />

        ) : (

          <ListItems
            addItem={addInterest}
            buttonText='Add Another Interest'
            listItems={
              interests.map((interest, index) => (
                <InterestEntry
                  key={index}
                  index={index}
                  interest={interest}
                  onInterestChange={(updated) => updateSectionItem("interests", index, updated)}
                  onRemove={() => removeInterest(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 