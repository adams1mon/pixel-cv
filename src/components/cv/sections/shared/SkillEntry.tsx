import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronRight, Lightbulb, Target } from 'lucide-react';
import { JsonResumeSkill } from '../../../../types/jsonresume';
import { InputField } from './InputField';
import { KeywordsEntry } from './KeywordsEntry';

const SKILL_NAME_SUGGESTIONS = [
  'Programming',
  'Software Development',
  'Project Management',
  'Communication',
  'Leadership',
  'Data Analysis',
  'Marketing',
  'Sales',
  'Public Speaking',
  'Graphic Design',
  'Customer Service',
  'Problem Solving',
  'Teaching',
  'Research',
  'Financial Analysis',
  'Social Media',
  'Content Writing',
  'Team Management'
];

const PROFICIENCY_SUGGESTIONS = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Expert',
];

interface SkillEntryProps {
  skill: JsonResumeSkill;
  index: number;
  onSkillChange: (skill: JsonResumeSkill) => void;
  onRemove: () => void;
}

export const SkillEntry: React.FC<SkillEntryProps> = ({
  skill,
  index,
  onSkillChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First skill expanded by default
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLevelSuggestions, setShowLevelSuggestions] = useState(false);

  const updateSkill = (updates: Partial<JsonResumeSkill>) => {
    onSkillChange({ ...skill, ...updates });
  };

  const handleKeywordsChange = (keywords: string[]) => {
    updateSkill({ keywords });
  };

  const handleSkillSuggestion = (skillName: string) => {
    updateSkill({ name: skillName });
    setShowSkillSuggestions(false);
  };

  const handleLevelSuggestion = (level: string) => {
    updateSkill({ level });
    setShowLevelSuggestions(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Skill Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {skill.name || 'New Skill'}
                {skill.level && ` (${skill.level})`}
              </h3>
              <p className="text-sm text-gray-600">
                {(skill.keywords || []).length > 0 
                  ? `${(skill.keywords || []).length} keyword${(skill.keywords || []).length !== 1 ? 's' : ''}`
                  : 'No keywords added yet'
                }
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
              aria-label="Remove skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Skill Details */}
      {isExpanded && (
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Skill & Level</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Name */}
              <div className="space-y-2">
                <InputField
                  label="Skill Name"
                  value={skill.name || ''}
                  onChange={(value) => updateSkill({ name: value })}
                  placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
                  required={true}
                  helpText="Name of your skill"
                />
                
                {/* Skill Suggestions - Below Input */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSkillSuggestions(!showSkillSuggestions)}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    💡 Skill suggestions
                  </button>
                  
                  {showSkillSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      <div className="p-2 text-xs text-gray-600 border-b">
                        Popular skills:
                      </div>
                      {SKILL_NAME_SUGGESTIONS.map((skillName) => (
                        <button
                          key={skillName}
                          type="button"
                          onClick={() => handleSkillSuggestion(skillName)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {skillName}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Proficiency Level */}
              <div className="space-y-2">
                <InputField
                  label="Proficiency Level"
                  value={skill.level || ''}
                  onChange={(value) => updateSkill({ level: value || undefined })}
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  helpText="Your proficiency level in this skill"
                />
                
                {/* Level Suggestions - Below Input */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLevelSuggestions(!showLevelSuggestions)}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    💡 Common levels
                  </button>
                  
                  {showLevelSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                      <div className="p-2 text-xs text-gray-600 border-b">
                        Common proficiency levels:
                      </div>
                      {PROFICIENCY_SUGGESTIONS.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleLevelSuggestion(level)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Section */}
          <KeywordsEntry
            keywords={skill.keywords || []}
            onKeywordsChange={handleKeywordsChange}
            skillName={skill.name}
          />
        </div>
      )}
    </div>
  );
}; 