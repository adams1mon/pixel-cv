"use client";

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { JsonResumeReference, createEmptyReference } from '../../../../types/jsonresume';
import { IdCard } from 'lucide-react';
import { ReferenceEntry } from './ReferenceEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


export const ReferencesSectionEditor: React.FC = () => {
  const references = useCVStore(s => s.data.references || []);
  const updateReferences = useCVStore(s => s.updateReferences);

  // References array management
  const addReference = () => {
    const newReference = createEmptyReference();
    const updatedReferences = [...references, newReference];
    updateReferences(updatedReferences);
  };

  const removeReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    updateReferences(updatedReferences);
  };

  const updateSingleReference = (index: number, updated: JsonResumeReference) => {
    const updatedReferences = references.map((refItem, i) => 
      i === index ? updated : refItem
    );
    updateReferences(updatedReferences);
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
                  onReferenceChange={(updated) => updateSingleReference(index, updated)}
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