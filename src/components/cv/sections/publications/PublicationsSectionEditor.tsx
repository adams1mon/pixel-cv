'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { EnrichedJsonResumePublication, createEmptyPublication } from '../../../../types/jsonresume';
import { Plus, BookOpen } from 'lucide-react';
import { PublicationEntry } from './PublicationEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';

export const PublicationsSectionEditor: React.FC = () => {
  const publications = useCVStore(s => s.data.publications || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Publications array management
  const addPublication = () => {
    const newPublication = createEmptyPublication();
    const updatedPublications = [...publications, newPublication];
    updateSection("publications", updatedPublications);
  };

  const removePublication = (index: number) => {
    const updatedPublications = publications.filter((_, i) => i !== index);
    updateSection("publications", updatedPublications);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Publications'
        subtitle='Add your academic papers, articles, books, and other published works.'
      />

      <div className="space-y-6">
        {publications.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Publication'
            addItem={addPublication}
            icon={
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No publications yet'
            subtitle='Add your publications to showcase your contributions.'
          />

        ) : (

          <ListItems
            addItem={addPublication}
            buttonText='Add Another Publication'
            listItems={
              publications.map((publication, index) => (
                <PublicationEntry
                  key={index}
                  index={index}
                  publication={publication}
                  onPublicationChange={(updated) => updateSectionItem("publications", index, updated)}
                  onRemove={() => removePublication(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 