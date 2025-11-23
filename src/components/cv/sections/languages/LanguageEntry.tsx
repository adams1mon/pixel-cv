import React, { useCallback, useState } from 'react';
import { Globe } from 'lucide-react';
import { EnrichedJsonResumeLanguage } from '../../../../types/jsonresume';
import { InputField } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

const LANGUAGE_SUGGESTIONS = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Hungarian',
  'Chinese (Mandarin)',
  'Japanese',
  'Korean',
  'Arabic',
  'Hindi',
  'Russian',
  'Dutch',
  'Swedish',
  'Norwegian',
  'Polish',
  'Turkish',
  'Hebrew',
  'Thai',
  'Vietnamese'
];

const FLUENCY_SUGGESTIONS = [
  'Native speaker',
  'Fluent', 
  'Conversational',
  'Intermediate',
  'Elementary'
];

interface LanguageEntryProps {
  language: EnrichedJsonResumeLanguage;
  index: number;
  onLanguageChange: (language: EnrichedJsonResumeLanguage) => void;
  onRemove: () => void;
}

export const LanguageEntry: React.FC<LanguageEntryProps> = ({
  language,
  index,
  onLanguageChange,
  onRemove
}) => {
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);
  const [showFluencySuggestions, setShowFluencySuggestions] = useState(false);

  const updateLanguage = (updates: Partial<EnrichedJsonResumeLanguage>) => {
    onLanguageChange({ ...language, ...updates });
  };

  const handleLanguageSuggestion = (languageName: string) => {
    updateLanguage({ language: languageName });
    setShowLanguageSuggestions(false);
  };

  const handleFluencySuggestion = (fluency: string) => {
    updateLanguage({ fluency });
    setShowFluencySuggestions(false);
  };

  const title = `${language.language || 'New Language'}${language.fluency ? ` (${language.fluency})` : ''}`;
  const subtitle = `Language #${index + 1}`;

  const toggleVisibility = useCallback(() => {
    onLanguageChange({
      ...language,
      _visible: !language._visible
    });
  }, [language, onLanguageChange]);

  return (
    <ExpandableEntry
      icon={<Globe className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove language"
      className="overflow-visible"
      visible={language._visible}
      onToggleVisible={toggleVisibility}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Name */}
        <div className="space-y-2 relative">
          <InputField
            label="Language"
            value={language.language || ''}
            onChange={(value) => updateLanguage({ language: value })}
            placeholder="e.g., English, Spanish, French"
            required={true}
            helpText="Name of the language"
          />
          
          {/* Language Suggestions - Below Input */}
          <div>
            <button
              type="button"
              onClick={() => setShowLanguageSuggestions(!showLanguageSuggestions)}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
            >
              💡 Common languages
            </button>
            
            {showLanguageSuggestions && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                <div className="p-2 text-xs text-gray-600 border-b">
                  Popular languages:
                </div>
                {LANGUAGE_SUGGESTIONS.map((languageName) => (
                  <button
                    key={languageName}
                    type="button"
                    onClick={() => handleLanguageSuggestion(languageName)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {languageName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Fluency Level */}
        <div className="space-y-2 relative">
          <InputField
            label="Fluency"
            value={language.fluency || ''}
            onChange={(value) => updateLanguage({ fluency: value || undefined })}
            placeholder="e.g., Native speaker, Fluent, Conversational"
            helpText="Your fluency level in this language"
          />
          
          {/* Fluency Suggestions - Below Input */}
          <div>
            <button
              type="button"
              onClick={() => setShowFluencySuggestions(!showFluencySuggestions)}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
            >
              💡 Common fluency levels
            </button>
            
            {showFluencySuggestions && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="p-2 text-xs text-gray-600 border-b">
                  Common fluency levels:
                </div>
                {FLUENCY_SUGGESTIONS.map((fluency) => (
                  <button
                    key={fluency}
                    type="button"
                    onClick={() => handleFluencySuggestion(fluency)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {fluency}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ExpandableEntry>
  );
};
