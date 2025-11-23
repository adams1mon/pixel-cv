"use client";

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { createEmptyReference } from '../../../../types/jsonresume';
import { IdCard } from 'lucide-react';
import { ReferenceEntry } from './ReferenceEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


export const ReferencesSectionEditor: React.FC = () => {
  const references = useCVStore(s => s.data.references || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // References array management
  const addReference = () => {
    const newReference = createEmptyReference();
    const updatedReferences = [...references, newReference];
    updateSection("references", updatedReferences);
  };

  const removeReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    updateSection("references", updatedReferences);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='References'
        subtitle='Add professional references and their contact information.'
      />

      <div className="space-y-6">
        {references.length === 0 ? (
          <ListPlaceholder
            buttonText='Add First Reference'
            addItem={addReference}
            icon={
              <IdCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No references yet'
            subtitle='Add your first reference to get started.'
          />

        ) : (

          <ListItems
            addItem={addReference}
            buttonText='Add Another Reference'
            listItems={
              references.map((referenceItem, index) => (
                <ReferenceEntry
                  key={index}
                  index={index}
                  referenceItem={referenceItem}
                  onReferenceChange={(updated) => updateSectionItem("references", index, updated)}
                  onRemove={() => removeReference(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 