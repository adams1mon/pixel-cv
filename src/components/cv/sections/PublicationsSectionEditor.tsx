'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumePublication, createEmptyPublication } from '../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { PublicationEntry } from './shared/PublicationEntry';

export const PublicationsSectionEditor: React.FC = () => {
  const { cvData, updatePublications } = useCV();
  const [expandedPublications, setExpandedPublications] = useState<Set<number>>(new Set([0])); // First publication expanded by default

  const publications = cvData.publications || [];

  // Toggle expandable publication entries
  const togglePublicationExpanded = (index: number) => {
    const newExpanded = new Set(expandedPublications);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPublications(newExpanded);
  };

  // Publications array management
  const addPublication = () => {
    const newPublication = createEmptyPublication();
    const updatedPublications = [...publications, newPublication];
    updatePublications(updatedPublications);
    
    // Expand the new publication entry
    setExpandedPublications(prev => new Set([...prev, updatedPublications.length - 1]));
  };

  const removePublication = (index: number) => {
    const updatedPublications = publications.filter((_, i) => i !== index);
    updatePublications(updatedPublications);
    
    // Update expanded set to account for removed item
    const newExpanded = new Set<number>();
    expandedPublications.forEach(expandedIndex => {
      if (expandedIndex < index) {
        newExpanded.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpanded.add(expandedIndex - 1);
      }
    });
    setExpandedPublications(newExpanded);
  };

  const updateSinglePublication = (index: number, updates: Partial<JsonResumePublication>) => {
    const updatedPublications = publications.map((pubItem, i) => 
      i === index ? { ...pubItem, ...updates } : pubItem
    );
    updatePublications(updatedPublications);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
        </div>
        <p className="text-gray-600">
          Add your academic papers, articles, books, and other published works.
        </p>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {publications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications yet</h3>
            <p className="text-gray-600 mb-4">Add your first publication to get started</p>
            <button
              type="button"
              onClick={addPublication}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
            </button>
          </div>
        ) : (
          publications.map((publication, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Publication Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center flex-1">
                  <button
                    type="button"
                    onClick={() => togglePublicationExpanded(index)}
                    className="flex items-center text-left flex-1 hover:bg-gray-50 p-2 -m-2 rounded-md"
                  >
                    {expandedPublications.has(index) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {publication.name || `Publication ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {publication.publisher && publication.releaseDate 
                          ? `${publication.publisher} • ${publication.releaseDate}`
                          : publication.publisher || publication.releaseDate || 'No details yet'
                        }
                      </p>
                    </div>
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => removePublication(index)}
                  className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove publication"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Publication Content */}
              {expandedPublications.has(index) && (
                <div className="p-6">
                  <PublicationEntry
                    publication={publication}
                    onPublicationChange={(updatedPublication) => 
                      updateSinglePublication(index, updatedPublication)
                    }
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Publication Button */}
      {publications.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={addPublication}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Another Publication
          </button>
        </div>
      )}
    </div>
  );
}; 