'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeVolunteer, createEmptyVolunteer } from '../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { VolunteerEntry } from './shared/VolunteerEntry';

export const VolunteerSectionEditor: React.FC = () => {
  const { cvData, updateVolunteer } = useCV();
  const [expandedVolunteers, setExpandedVolunteers] = useState<Set<number>>(new Set([0])); // First volunteer expanded by default

  const volunteers = cvData.volunteer || [];

  // Toggle expandable volunteer entries
  const toggleVolunteerExpanded = (index: number) => {
    const newExpanded = new Set(expandedVolunteers);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedVolunteers(newExpanded);
  };

  // Volunteers array management
  const addVolunteer = () => {
    const newVolunteer = createEmptyVolunteer();
    const updatedVolunteers = [...volunteers, newVolunteer];
    updateVolunteer(updatedVolunteers);
    
    // Expand the new volunteer entry
    setExpandedVolunteers(prev => new Set([...prev, updatedVolunteers.length - 1]));
  };

  const removeVolunteer = (index: number) => {
    const updatedVolunteers = volunteers.filter((_, i) => i !== index);
    updateVolunteer(updatedVolunteers);
    
    // Update expanded set to account for removed item
    const newExpanded = new Set<number>();
    expandedVolunteers.forEach(expandedIndex => {
      if (expandedIndex < index) {
        newExpanded.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpanded.add(expandedIndex - 1);
      }
    });
    setExpandedVolunteers(newExpanded);
  };

  const updateSingleVolunteer = (index: number, updates: Partial<JsonResumeVolunteer>) => {
    const updatedVolunteers = volunteers.map((volunteerItem, i) => 
      i === index ? { ...volunteerItem, ...updates } : volunteerItem
    );
    updateVolunteer(updatedVolunteers);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Heart className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Work</h2>
        </div>
        <p className="text-gray-600">
          Add your community service, volunteer experiences, and charitable work.
        </p>
      </div>

      {/* Volunteers List */}
      <div className="space-y-4">
        {volunteers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No volunteer work yet</h3>
            <p className="text-gray-600 mb-4">Add your first volunteer experience to get started</p>
            <button
              type="button"
              onClick={addVolunteer}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Volunteer Work
            </button>
          </div>
        ) : (
          volunteers.map((volunteer, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Volunteer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center flex-1">
                  <button
                    type="button"
                    onClick={() => toggleVolunteerExpanded(index)}
                    className="flex items-center text-left flex-1 hover:bg-gray-50 p-2 -m-2 rounded-md"
                  >
                    {expandedVolunteers.has(index) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {volunteer.organization || `Volunteer Work ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {volunteer.position && volunteer.startDate 
                          ? `${volunteer.position} • ${volunteer.startDate}`
                          : volunteer.position || volunteer.startDate || 'No details yet'
                        }
                      </p>
                    </div>
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeVolunteer(index)}
                  className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove volunteer work"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Volunteer Content */}
              {expandedVolunteers.has(index) && (
                <div className="p-6">
                  <VolunteerEntry
                    volunteer={volunteer}
                    onVolunteerChange={(updatedVolunteer) => 
                      updateSingleVolunteer(index, updatedVolunteer)
                    }
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Volunteer Button */}
      {volunteers.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={addVolunteer}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Another Volunteer Experience
          </button>
        </div>
      )}
    </div>
  );
}; 