'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { createEmptyLanguage } from '../../../../types/jsonresume';
import { Globe } from 'lucide-react';
import { LanguageEntry } from './LanguageEntry';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


export const LanguagesSectionEditor: React.FC = () => {
  const languages = useCVStore(s => s.data.languages || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Language array management
  const addLanguage = () => {
    const newLanguage = createEmptyLanguage();
    const updatedLanguages = [...languages, newLanguage];
    updateSection("languages", updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    updateSection("languages", updatedLanguages);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Languages'
        subtitle='List the languages you speak and your proficiency level in each.'
      />

      <div className="space-y-6">
        {languages.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Language'
            addItem={addLanguage}
            icon={
              <Globe className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No lanugages added yet'
            subtitle='Add the languages you speak to showcase your communication abilities.'
          />

        ) : (

          <ListItems
            addItem={addLanguage}
            buttonText='Add Another Language'
            listItems={
              languages.map((language, index) => (
                <LanguageEntry
                  key={index}
                  language={language}
                  
                  index={index}
                  onLanguageChange={(updatedLanguage) => updateSectionItem("languages", index, updatedLanguage)}
                  onRemove={() => removeLanguage(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
}; 