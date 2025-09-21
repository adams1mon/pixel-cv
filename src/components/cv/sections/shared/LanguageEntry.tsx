import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { JsonResumeLanguage } from '../../../../types/jsonresume';
import { InputField } from './InputField';

const LANGUAGE_SUGGESTIONS = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
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
  language: JsonResumeLanguage;
  index: number;
  onLanguageChange: (language: JsonResumeLanguage) => void;
  onRemove: () => void;
}

export const LanguageEntry: React.FC<LanguageEntryProps> = ({
  language,
  index,
  onLanguageChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First language expanded by default
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);
  const [showFluencySuggestions, setShowFluencySuggestions] = useState(false);

  const updateLanguage = (updates: Partial<JsonResumeLanguage>) => {
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* Language Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {language.language || 'New Language'}
                {language.fluency && ` (${language.fluency})`}
              </h3>
              <p className="text-sm text-gray-600">
                Language #{index + 1}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onRemove}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
              aria-label="Remove language"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Details */}
      {isExpanded && (
        <div className="p-6 space-y-6 overflow-visible">
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
                label="Fluency Level"
                value={language.fluency || ''}
                onChange={(value) => updateLanguage({ fluency: value })}
                placeholder="e.g., Native speaker, Fluent, Conversational"
                required={true}
                helpText="Your proficiency level in this language"
              />
              
              {/* Fluency Suggestions - Below Input */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowFluencySuggestions(!showFluencySuggestions)}
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                >
                  💡 Common levels
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
        </div>
      )}
    </div>
  );
};
