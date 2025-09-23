"use client";

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeReference, createEmptyReference } from '../../../types/jsonresume';
import { Plus, IdCard } from 'lucide-react';
import { ReferenceEntry } from './shared/ReferenceEntry';

export const ReferencesSectionEditor: React.FC = () => {
  const { cvData, updateReferences } = useCV();

  const references = cvData.references || [];

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
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">References</h2>
        <p className="text-gray-600">
          Add professional references and their contact information.
        </p>
      </div>

      <div className="space-y-6">
        {references.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <IdCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No references yet</h3>
            <p className="text-gray-600 mb-6">Add your first reference to get started.</p>
            <button
              type="button"
              onClick={addReference}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Reference
            </button>
          </div>
        ) : (
          <>
            {references.map((referenceItem, index) => (
              <ReferenceEntry
                key={index}
                index={index}
                referenceItem={referenceItem}
                onReferenceChange={(updated) => updateSingleReference(index, updated)}
                onRemove={() => removeReference(index)}
              />
            ))}

            {/* Add New Reference Button */}
            <button
              type="button"
              onClick={addReference}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Reference
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 