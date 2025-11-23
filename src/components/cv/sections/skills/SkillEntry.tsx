import React, { useCallback, useState } from 'react';
import { Lightbulb, Target } from 'lucide-react';
import { EnrichedJsonResumeSkill } from '../../../../types/jsonresume';
import { InputField } from '../shared/InputField';
import { KeywordsEntry } from '../shared/KeywordsEntry';
import { ExpandableEntry } from '../shared/ExpandableEntry';

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
  skill: EnrichedJsonResumeSkill;
  index: number;
  onSkillChange: (skill: EnrichedJsonResumeSkill) => void;
  onRemove: () => void;
}

export const SkillEntry: React.FC<SkillEntryProps> = ({
  skill,
  index,
  onSkillChange,
  onRemove
}) => {
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLevelSuggestions, setShowLevelSuggestions] = useState(false);

  const updateSkill = (updates: Partial<EnrichedJsonResumeSkill>) => {
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

  const title = `${skill.name || 'New Skill'}${skill.level ? ` (${skill.level})` : ''}`;
  const subtitle = (skill.keywords || []).length > 0 
    ? `${(skill.keywords || []).length} keyword${(skill.keywords || []).length !== 1 ? 's' : ''}`
    : 'No keywords added yet';

  const toggleVisibility = useCallback(() => {
    onSkillChange({
      ...skill,
      _visible: !skill._visible
    });
  }, [skill, onSkillChange]);

  return (
    <ExpandableEntry
      icon={<Lightbulb className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove skill"
      visible={skill._visible}
      onToggleVisible={toggleVisibility}
    >
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
    </ExpandableEntry>
  );
}; 