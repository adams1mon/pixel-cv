'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeAward, createEmptyAward } from '../../../types/jsonresume';
import { Plus, Award as AwardIcon } from 'lucide-react';
import { AwardEntry } from './shared/AwardEntry';

export const AwardsSectionEditor: React.FC = () => {
  const { cvData, updateAwards } = useCV();

  const awards = cvData.awards || [];

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
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Awards & Achievements</h2>
        <p className="text-gray-600">
          List your awards, recognitions, and notable achievements.
        </p>
      </div>

      <div className="space-y-6">
        {awards.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <AwardIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No awards added yet</h3>
            <p className="text-gray-600 mb-6">Add your first award to get started.</p>
            <button
              type="button"
              onClick={addAward}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Award
            </button>
          </div>
        ) : (
          <>
            {awards.map((award, index) => (
              <AwardEntry
                key={index}
                index={index}
                award={award}
                onAwardChange={(updated) => updateSingleAward(index, updated)}
                onRemove={() => removeAward(index)}
              />
            ))}

            {/* Add New Award Button */}
            <button
              type="button"
              onClick={addAward}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Award
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 