'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeVolunteer, createEmptyVolunteer } from '../../../types/jsonresume';
import { Plus, Heart, Lightbulb } from 'lucide-react';
import { VolunteerEntry } from './shared/VolunteerEntry';

// TODO: resolve UI differences between this, the publications section and the rest 

export const VolunteerSectionEditor: React.FC = () => {
  const { cvData, updateVolunteer } = useCV();

  const volunteers = cvData.volunteer || [];

  // Volunteers array management
  const addVolunteer = () => {
    const newVolunteer = createEmptyVolunteer();
    const updatedVolunteers = [...volunteers, newVolunteer];
    updateVolunteer(updatedVolunteers);
  };

  const removeVolunteer = (index: number) => {
    const updatedVolunteers = volunteers.filter((_, i) => i !== index);
    updateVolunteer(updatedVolunteers);
  };

  const updateSingleVolunteer = (index: number, updated: JsonResumeVolunteer) => {
    const updatedVolunteers = volunteers.map((volunteerItem, i) => 
      i === index ? updated : volunteerItem
    );
    updateVolunteer(updatedVolunteers);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Volunteer Work</h2>
        <p className="text-gray-600">
          Add your community service, volunteer experiences, and charitable work.
        </p>
      </div>

      <div className="space-y-6">
        {volunteers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No volunteer work yet</h3>
            <p className="text-gray-600 mb-6">Add your volunteer experiences to showcase your impact.</p>
            <button
              type="button"
              onClick={addVolunteer}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Volunteer Experience
            </button>
          </div>
        ) : (
          <>
            {volunteers.map((volunteer, index) => (
              <VolunteerEntry
                key={index}
                index={index}
                volunteer={volunteer}
                onVolunteerChange={(updated) => updateSingleVolunteer(index, updated)}
                onRemove={() => removeVolunteer(index)}
              />
            ))}

            {/* Add New Volunteer Button */}
            <button
              type="button"
              onClick={addVolunteer}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Volunteer Experience
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 