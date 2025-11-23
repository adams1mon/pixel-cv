'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { createEmptyVolunteer } from '../../../../types/jsonresume';
import { Heart } from 'lucide-react';
import { VolunteerEntry } from './VolunteerEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


// TODO: resolve UI differences between this, the publications section and the rest 

export const VolunteerSectionEditor: React.FC = () => {
  const volunteers = useCVStore(s => s.data.volunteer || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Volunteers array management
  const addVolunteer = () => {
    const newVolunteer = createEmptyVolunteer();
    const updatedVolunteers = [...volunteers, newVolunteer];
    updateSection("volunteer", updatedVolunteers);
  };

  const removeVolunteer = (index: number) => {
    const updatedVolunteers = volunteers.filter((_, i) => i !== index);
    updateSection("volunteer", updatedVolunteers);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Volunteer Work'
        subtitle='Add your community service, volunteer experiences, and charitable work.'
      />

      <div className="space-y-6">
        {volunteers.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Volunteer Experience'
            addItem={addVolunteer}
            icon={
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No volunteer work yet'
            subtitle='Add your volunteer experiences to showcase your impact.'
          />

        ) : (

          <ListItems
            addItem={addVolunteer}
            buttonText='Add Another Volunteer Experience'
            listItems={
              volunteers.map((volunteer, index) => (
                <VolunteerEntry
                  key={index}
                  index={index}
                  volunteer={volunteer}
                  onVolunteerChange={(updated) => updateSectionItem("volunteer", index, updated)}
                  onRemove={() => removeVolunteer(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 