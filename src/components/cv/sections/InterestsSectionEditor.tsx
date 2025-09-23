"use client";

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeInterest, createEmptyInterest } from '../../../types/jsonresume';
import { Plus, Heart } from 'lucide-react';
import { InterestEntry } from './shared/InterestEntry';

export const InterestsSectionEditor: React.FC = () => {
  const { cvData, updateInterests } = useCV();

  const interests = cvData.interests || [];

  // Interests array management
  const addInterest = () => {
    const newInterest = createEmptyInterest();
    const updatedInterests = [...interests, newInterest];
    updateInterests(updatedInterests);
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    updateInterests(updatedInterests);
  };

  const updateSingleInterest = (index: number, updated: JsonResumeInterest) => {
    const updatedInterests = interests.map((interestItem, i) => 
      i === index ? updated : interestItem
    );
    updateInterests(updatedInterests);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interests & Hobbies</h2>
        <p className="text-gray-600">
          Share your personal interests to add personality to your CV.
        </p>
      </div>

      <div className="space-y-6">
        {interests.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No interests yet</h3>
            <p className="text-gray-600 mb-6">Add your first interest to get started.</p>
            <button
              type="button"
              onClick={addInterest}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Interest
            </button>
          </div>
        ) : (
          <>
            {interests.map((interest, index) => (
              <InterestEntry
                key={index}
                index={index}
                interest={interest}
                onInterestChange={(updated) => updateSingleInterest(index, updated)}
                onRemove={() => removeInterest(index)}
              />
            ))}

            {/* Add New Interest Button */}
            <button
              type="button"
              onClick={addInterest}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Interest
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 