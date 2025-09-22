'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumePublication, createEmptyPublication } from '../../../types/jsonresume';
import { Plus, BookOpen } from 'lucide-react';
import { PublicationEntry } from './shared/PublicationEntry';

export const PublicationsSectionEditor: React.FC = () => {
  const { cvData, updatePublications } = useCV();

  const publications = cvData.publications || [];

  // Publications array management
  const addPublication = () => {
    const newPublication = createEmptyPublication();
    const updatedPublications = [...publications, newPublication];
    updatePublications(updatedPublications);
  };

  const removePublication = (index: number) => {
    const updatedPublications = publications.filter((_, i) => i !== index);
    updatePublications(updatedPublications);
  };

  const updateSinglePublication = (index: number, updated: JsonResumePublication) => {
    const updatedPublications = publications.map((pubItem, i) => 
      i === index ? updated : pubItem
    );
    updatePublications(updatedPublications);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Publications</h2>
        <p className="text-gray-600">
          Add your academic papers, articles, books, and other published works.
        </p>
      </div>

      <div className="space-y-6">
        {publications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications yet</h3>
            <p className="text-gray-600 mb-6">Add your publications to showcase your contributions.</p>
            <button
              type="button"
              onClick={addPublication}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Publication
            </button>
          </div>
        ) : (
          <>
            {publications.map((publication, index) => (
              <PublicationEntry
                key={index}
                index={index}
                publication={publication}
                onPublicationChange={(updated) => updateSinglePublication(index, updated)}
                onRemove={() => removePublication(index)}
              />
            ))}

            {/* Add New Publication Button */}
            <button
              type="button"
              onClick={addPublication}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Publication
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 