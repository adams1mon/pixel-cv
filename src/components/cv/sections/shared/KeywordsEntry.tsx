import React from 'react';
import { Plus, Trash2, Hash } from 'lucide-react';
import { InputField } from './InputField';

interface KeywordsEntryProps {
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  skillName?: string;
}

export const KeywordsEntry: React.FC<KeywordsEntryProps> = ({
  keywords,
  onKeywordsChange,
  skillName
}) => {
  const addKeyword = () => {
    onKeywordsChange([...keywords, '']);
  };

  const updateKeyword = (index: number, value: string) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = value;
    onKeywordsChange(updatedKeywords);
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    onKeywordsChange(updatedKeywords);
  };

  // Generate contextual placeholders based on skill name
  const getPlaceholder = (skillName?: string) => {
    if (!skillName) return "e.g., React, ES6, Node.js, Agile, Photoshop";
    
    const name = skillName.toLowerCase();
    if (name.includes('programming') || name.includes('software')) {
      return "e.g., JavaScript, Python, React";
    } else if (name.includes('design') || name.includes('photoshop')) {
      return "e.g., Illustrator, InDesign, UI/UX, Branding";
    } else if (name.includes('marketing')) {
      return "e.g., Google Analytics, SEO, Social Media, Email Marketing";
    } else if (name.includes('management')) {
      return "e.g., Agile, Scrum, JIRA, Gantt Charts";
    } else if (name.includes('excel')) {
      return "e.g., Pivot Tables, VLOOKUP, Macros, Data Analysis";
    } else {
      return "e.g., Tools, Technologies, Frameworks, Methods";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Hash className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Keywords</h4>
        </div>
        <button
          type="button"
          onClick={addKeyword}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Keyword
        </button>
      </div>
      
      {keywords.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p className="mb-3">No keywords added yet</p>
          <button
            type="button"
            onClick={addKeyword}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Add your first keyword
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keywords.map((keyword, index) => (
            <div key={index} className="flex gap-1 items-center">
              <div className="flex-1">
                <InputField
                  value={keyword}
                  onChange={(value) => updateKeyword(index, value)}
                  placeholder={getPlaceholder(skillName)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                aria-label="Remove keyword"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 