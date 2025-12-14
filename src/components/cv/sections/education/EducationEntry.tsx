'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumeEducation, JsonResumeEducation } from '../../../../types/jsonresume';
import { GraduationCap, Calendar, BookOpen, Plus, Trash2 } from 'lucide-react';
import { InputField } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface EducationEntryProps {
  item: EnrichedJsonResumeEducation;
  index: number;
  onUpdate: (education: EnrichedJsonResumeEducation) => void;
  onRemove: () => void;
}

export const EducationEntry: React.FC<EducationEntryProps> = ({
  item,
  index,
  onUpdate,
  onRemove
}) => {
  const updateField = useCallback((field: keyof JsonResumeEducation, value: any) => {
    onUpdate({
      ...item,
      [field]: value
    });
  }, [item, onUpdate]);

  // Toggle visibility for this education
  const toggleVisibility = useCallback(() => {
    onUpdate({
      ...item,
      _visible: !item._visible
    });
  }, [item, onUpdate]);

  const title = item.studyType && item.area ? `${item.studyType} in ${item.area}` :
    item.studyType || item.area || 'New Education';
  const subtitle = item.institution 
    ? `${item.institution}${item.startDate ? ` • ${item.startDate}` : ''}${item.endDate ? ` - ${item.endDate}` : ''}`
    : 'Institution not set';

  // Courses management
  const addCourse = () => {
    const courses = item.courses || [];
    updateField('courses', [...courses, '']);
  };

  const updateCourse = (courseIndex: number, value: string) => {
    const courses = [...(item.courses || [])];
    courses[courseIndex] = value;
    updateField('courses', courses);
  };

  const removeCourse = (courseIndex: number) => {
    const courses = (item.courses || []).filter((_, i) => i !== courseIndex);
    updateField('courses', courses);
  };

  // Honors management
  const addHonor = () => {
    const honors = item.honors || [];
    updateField('honors', [...honors, '']);
  };

  const updateHonor = (honorIndex: number, value: string) => {
    const honors = [...(item.honors || [])];
    honors[honorIndex] = value;
    updateField('honors', honors);
  };

  const removeHonor = (honorIndex: number) => {
    const honors = (item.honors || []).filter((_, i) => i !== honorIndex);
    updateField('honors', honors);
  };

  // Activities management
  const addActivity = () => {
    const activities = item.activities || [];
    updateField('activities', [...activities, '']);
  };

  const updateActivity = (activityIndex: number, value: string) => {
    const activities = [...(item.activities || [])];
    activities[activityIndex] = value;
    updateField('activities', activities);
  };

  const removeActivity = (activityIndex: number) => {
    const activities = (item.activities || []).filter((_, i) => i !== activityIndex);
    updateField('activities', activities);
  };

  return (
    <ExpandableEntry
      icon={<GraduationCap className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove education"
      visible={item._visible !== false}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Institution & Program</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Institution"
            value={item.institution || ''}
            onChange={(value) => updateField('institution', value)}
            placeholder="e.g., University of California, Berkeley"
            required={true}
          />
          
          <InputField
            label="Field of Study"
            value={item.area || ''}
            onChange={(value) => updateField('area', value)}
            placeholder="e.g., Computer Science, Business Administration, Psychology"
            helpText="Your major, specialization, or field of study"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Degree/Qualification"
            value={item.studyType || ''}
            onChange={(value) => updateField('studyType', value)}
            placeholder="e.g., Bachelor's, Master's, PhD, Diploma, Certificate"
            helpText="Type of degree or qualification earned"
          />
          
          <InputField
            label="Academic Score"
            value={item.score || ''}
            onChange={(value) => updateField('score', value)}
            placeholder="e.g., 3.8, First Class, 85%, A, Distinction"
            helpText="Optional: Your grade or academic achievement"
          />
        </div>
      </div>
      
      {/* Timeline */}
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Duration</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Start Date"
            value={item.startDate || ''}
            onChange={(value) => updateField('startDate', value)}
            type="text"
            placeholder="YYYY-MM"
            helpText="Format: YYYY-MM (e.g., 2019-09)"
          />
          
          <InputField
            label="End Date"
            value={item.endDate || ''}
            onChange={(value) => updateField('endDate', value)}
            type="text"
            placeholder="YYYY-MM (leave empty if ongoing)"
            helpText="Leave empty for current studies"
          />
        </div>
      </div>

      {/* Relevant Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Relevant Courses</h4>
          <button
            type="button"
            onClick={addCourse}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Course
          </button>
        </div>
        
        {(item.courses || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No courses added yet</p>
            <button
              type="button"
              onClick={addCourse}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add relevant coursework
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(item.courses || []).map((course, cIndex) => (
              <div key={cIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Course ${cIndex + 1}`}
                    value={course}
                    onChange={(value) => updateCourse(cIndex, value)}
                    placeholder="e.g., Advanced Statistics, Organic Chemistry"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCourse(cIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Academic Honors */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Academic Honors & Awards</h4>
          <button
            type="button"
            onClick={addHonor}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Honor
          </button>
        </div>

        {(item.honors || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No honors added yet</p>
            <button
              type="button"
              onClick={addHonor}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add academic honors or recognition
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(item.honors || []).map((honor, hIndex) => (
              <div key={hIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Honor ${hIndex + 1}`}
                    value={honor}
                    onChange={(value) => updateHonor(hIndex, value)}
                    placeholder="e.g., Dean's List, Magna Cum Laude, Academic Excellence Award"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeHonor(hIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove honor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Extracurricular Activities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Activities & Leadership</h4>
          <button
            type="button"
            onClick={addActivity}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Activity
          </button>
        </div>
        
        {(item.activities || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-3">No activities added yet</p>
            <button
              type="button"
              onClick={addActivity}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add extracurricular activities or leadership roles
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(item.activities || []).map((activity, aIndex) => (
              <div key={aIndex} className="flex gap-3">
                <div className="flex-1">
                  <InputField
                    label={`Activity ${aIndex + 1}`}
                    value={activity}
                    onChange={(value) => updateActivity(aIndex, value)}
                    placeholder="e.g., Student Council President, Debate Team, Research Assistant"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeActivity(aIndex)}
                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  aria-label="Remove activity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ExpandableEntry>
  );
};
