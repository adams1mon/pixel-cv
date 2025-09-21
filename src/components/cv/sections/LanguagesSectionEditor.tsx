'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeLanguage, createEmptyLanguage } from '../../../types/jsonresume';
import { Plus, Globe } from 'lucide-react';
import { LanguageEntry } from './shared/LanguageEntry';

export const LanguagesSectionEditor: React.FC = () => {
  const { cvData, updateLanguages } = useCV();
  
  const languages = cvData.languages || [];

  // Language array management
  const addLanguage = () => {
    const newLanguage = createEmptyLanguage();
    const updatedLanguages = [...languages, newLanguage];
    updateLanguages(updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    updateLanguages(updatedLanguages);
  };

  const updateSingleLanguage = (index: number, language: JsonResumeLanguage) => {
    const updatedLanguages = languages.map((l, i) => i === index ? language : l);
    updateLanguages(updatedLanguages);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Languages</h2>
        <p className="text-gray-600">
          List the languages you speak and your proficiency level in each.
        </p>
      </div>

      <div className="space-y-6">
        {languages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Globe className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No languages added yet</h3>
            <p className="text-gray-600 mb-6">Add the languages you speak to showcase your communication abilities.</p>
            <button
              type="button"
              onClick={addLanguage}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Language
            </button>
          </div>
        ) : (
          <>
            {languages.map((language, index) => (
              <LanguageEntry
                key={index}
                language={language}
                
                index={index}
                onLanguageChange={(updatedLanguage) => updateSingleLanguage(index, updatedLanguage)}
                onRemove={() => removeLanguage(index)}
              />
            ))}
            
            {/* Add New Language Button */}
            <button
              type="button"
              onClick={addLanguage}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Language
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 