'use client';

import React, { useState } from 'react';
import { JsonResumeEducation, createEmptyEducation } from '../../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { InputField } from '../shared/InputField';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';


export const EducationSectionEditor: React.FC = () => {

  const education = useCVStore(s => s.data.education || []);
  const updateEducation = useCVStore(s => s.updateEducation);

  const [expandedEducation, setExpandedEducation] = useState<Set<number>>(new Set([0])); // First education expanded by default

  // Toggle expandable education entries
  const toggleEducationExpanded = (index: number) => {
    const newExpanded = new Set(expandedEducation);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedEducation(newExpanded);
  };

  // Education array management
  const addEducation = () => {
    const newEducation = createEmptyEducation();
    const updatedEducation = [...education, newEducation];
    updateEducation(updatedEducation);

    // Expand the new education entry
    setExpandedEducation(prev => new Set([...prev, updatedEducation.length - 1]));
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    updateEducation(updatedEducation);
    
    // Update expanded set to account for removed item
    const newExpanded = new Set<number>();
    expandedEducation.forEach(expandedIndex => {
      if (expandedIndex < index) {
        newExpanded.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpanded.add(expandedIndex - 1);
      }
    });
    setExpandedEducation(newExpanded);
  };

  const updateSingleEducation = (index: number, updates: Partial<JsonResumeEducation>) => {
    const updatedEducation = education.map((eduItem, i) => 
      i === index ? { ...eduItem, ...updates } : eduItem
    );
    updateEducation(updatedEducation);
  };

  // Courses management
  const addCourse = (eduIndex: number) => {
    const eduItem = education[eduIndex];
    const courses = eduItem.courses || [];
    updateSingleEducation(eduIndex, {
      courses: [...courses, '']
    });
  };

  const updateCourse = (eduIndex: number, courseIndex: number, value: string) => {
    const eduItem = education[eduIndex];
    const courses = [...(eduItem.courses || [])];
    courses[courseIndex] = value;
    updateSingleEducation(eduIndex, { courses });
  };

  const removeCourse = (eduIndex: number, courseIndex: number) => {
    const eduItem = education[eduIndex];
    const courses = (eduItem.courses || []).filter((_, i) => i !== courseIndex);
    updateSingleEducation(eduIndex, { courses });
  };

  // Honors management
  const addHonor = (eduIndex: number) => {
    const eduItem = education[eduIndex];
    const honors = eduItem.honors || [];
    updateSingleEducation(eduIndex, {
      honors: [...honors, '']
    });
  };

  const updateHonor = (eduIndex: number, honorIndex: number, value: string) => {
    const eduItem = education[eduIndex];
    const honors = [...(eduItem.honors || [])];
    honors[honorIndex] = value;
    updateSingleEducation(eduIndex, { honors });
  };

  const removeHonor = (eduIndex: number, honorIndex: number) => {
    const eduItem = education[eduIndex];
    const honors = (eduItem.honors || []).filter((_, i) => i !== honorIndex);
    updateSingleEducation(eduIndex, { honors });
  };

  // Activities management
  const addActivity = (eduIndex: number) => {
    const eduItem = education[eduIndex];
    const activities = eduItem.activities || [];
    updateSingleEducation(eduIndex, {
      activities: [...activities, '']
    });
  };

  const updateActivity = (eduIndex: number, activityIndex: number, value: string) => {
    const eduItem = education[eduIndex];
    const activities = [...(eduItem.activities || [])];
    activities[activityIndex] = value;
    updateSingleEducation(eduIndex, { activities });
  };

  const removeActivity = (eduIndex: number, activityIndex: number) => {
    const eduItem = education[eduIndex];
    const activities = (eduItem.activities || []).filter((_, i) => i !== activityIndex);
    updateSingleEducation(eduIndex, { activities });
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Education'
        subtitle='Your academic background, qualifications, and educational achievements.'
      />
      
      <div className="space-y-6">
        {education.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Education'
            addItem={addEducation}
            icon={
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No education added yet'
            subtitle='Add your educational background to showcase your qualifications.'
          />

        ) : (

          <ListItems
            addItem={addEducation}
            buttonText='Add Another Education'
            listItems={
              education.map((eduItem, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Education Header */}
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <GraduationCap className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {eduItem.studyType && eduItem.area ? `${eduItem.studyType} in ${eduItem.area}` :
                            eduItem.studyType || eduItem.area || 'New Education'}
                            {eduItem.institution && ` at ${eduItem.institution}`}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Education #{index + 1}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleEducationExpanded(index)}
                          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                        >
                          {expandedEducation.has(index) ? (
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
                          onClick={() => removeEducation(index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                          aria-label="Remove education"
                    >
                          <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                    </div>
                  </div>
                  
                  {/* Education Details */}
                  {expandedEducation.has(index) && (
                    <div className="p-6 space-y-8">
                      {/* Basic Information */}
                      <div className="space-y-6">
                        <div className="flex items-center mb-4">
                          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900">Institution & Program</h4>
                  </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Institution"
                            value={eduItem.institution || ''}
                            onChange={(value) => updateSingleEducation(index, { institution: value })}
                            placeholder="e.g., University of California, Berkeley"
                            required={true}
                          />
                          
                          <InputField
                            label="Field of Study"
                            value={eduItem.area || ''}
                            onChange={(value) => updateSingleEducation(index, { area: value })}
                            placeholder="e.g., Computer Science, Business Administration, Psychology"
                            helpText="Your major, specialization, or field of study"
                    />
                  </div>
                  
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Degree/Qualification"
                            value={eduItem.studyType || ''}
                            onChange={(value) => updateSingleEducation(index, { studyType: value })}
                            placeholder="e.g., Bachelor's, Master's, PhD, Diploma, Certificate"
                            helpText="Type of degree or qualification earned"
                          />
                          
                          <InputField
                            label="Academic Score"
                            value={eduItem.score || ''}
                            onChange={(value) => updateSingleEducation(index, { score: value })}
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
                            value={eduItem.startDate || ''}
                            onChange={(value) => updateSingleEducation(index, { startDate: value })}
                            type="text"
                            placeholder="YYYY-MM"
                            helpText="Format: YYYY-MM (e.g., 2019-09)"
                      />
                          
                          <InputField
                            label="End Date"
                            value={eduItem.endDate || ''}
                            onChange={(value) => updateSingleEducation(index, { endDate: value })}
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
                            onClick={() => addCourse(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Course
                          </button>
                        </div>
                        
                        {(eduItem.courses || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No courses added yet</p>
                            <button
                              type="button"
                              onClick={() => addCourse(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add relevant coursework
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {(eduItem.courses || []).map((course, cIndex) => (
                              <div key={cIndex} className="flex gap-3">
                                <div className="flex-1">
                                  <InputField
                                    label={`Course ${cIndex + 1}`}
                                    value={course}
                                    onChange={(value) => updateCourse(index, cIndex, value)}
                                    placeholder="e.g., Advanced Statistics, Organic Chemistry"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCourse(index, cIndex)}
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
                            onClick={() => addHonor(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Honor
                          </button>
                </div>

                        {(eduItem.honors || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No honors added yet</p>
                  <button
                              type="button"
                              onClick={() => addHonor(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add academic honors or recognition
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {(eduItem.honors || []).map((honor, hIndex) => (
                              <div key={hIndex} className="flex gap-3">
                                <div className="flex-1">
                                  <InputField
                                    label={`Honor ${hIndex + 1}`}
                                    value={honor}
                                    onChange={(value) => updateHonor(index, hIndex, value)}
                                    placeholder="e.g., Dean's List, Magna Cum Laude, Academic Excellence Award"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeHonor(index, hIndex)}
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
                            onClick={() => addActivity(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Activity
                          </button>
                        </div>
                        
                        {(eduItem.activities || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No activities added yet</p>
                            <button
                              type="button"
                              onClick={() => addActivity(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add extracurricular activities or leadership roles
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {(eduItem.activities || []).map((activity, aIndex) => (
                              <div key={aIndex} className="flex gap-3">
                                <div className="flex-1">
                                  <InputField
                                    label={`Activity ${aIndex + 1}`}
                                    value={activity}
                                    onChange={(value) => updateActivity(index, aIndex, value)}
                                    placeholder="e.g., Student Council President, Debate Team, Research Assistant"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeActivity(index, aIndex)}
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
                    </div>
                  )}
              </div>
            ))
            }
          />
        )}
       </div>
     </div>
   );
 }; 