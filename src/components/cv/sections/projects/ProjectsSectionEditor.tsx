'use client';

import React, { useState } from 'react';
import { useCVStore } from '@/stores/cv-store';
import { EnrichedJsonResumeProject, createEmptyProject } from '../../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, FolderOpen, Calendar, Link, Building, Code } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';
import { VisibilityToggle } from '../../VisibilityToggle';



export const ProjectsSectionEditor: React.FC = () => {
  const projects = useCVStore(s => s.data.projects || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([0])); // First project expanded by default

  // Toggle expandable project entries
  const toggleProjectExpanded = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  // Project array management
  const addProject = () => {
    const newProject = createEmptyProject();
    const updatedProjects = [...projects, newProject];
    updateSection("projects", updatedProjects);

    // Expand the new project entry
    setExpandedProjects(prev => new Set([...prev, updatedProjects.length - 1]));
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    updateSection("projects", updatedProjects);
    
    // Update expanded set to account for removed item
    const newExpanded = new Set<number>();
    expandedProjects.forEach(expandedIndex => {
      if (expandedIndex < index) {
        newExpanded.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpanded.add(expandedIndex - 1);
      }
    });
    setExpandedProjects(newExpanded);
  };

  const updateSingleProject = (index: number, updates: Partial<EnrichedJsonResumeProject>) => {
    const project = projects[index];
    const updatedItem = { ...project, ...updates } as EnrichedJsonResumeProject;
    updateSectionItem("projects", index, updatedItem);
  };

  // Highlights management
  const addHighlight = (projectIndex: number) => {
    const project = projects[projectIndex];
    const highlights = project.highlights || [];
    updateSingleProject(projectIndex, {
      highlights: [...highlights, '']
    });
  };

  const updateHighlight = (projectIndex: number, highlightIndex: number, value: string) => {
    const project = projects[projectIndex];
    const highlights = [...(project.highlights || [])];
    highlights[highlightIndex] = value;
    updateSingleProject(projectIndex, { highlights });
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const project = projects[projectIndex];
    const highlights = (project.highlights || []).filter((_, i) => i !== highlightIndex);
    updateSingleProject(projectIndex, { highlights });
  };

  // Keywords/Technologies management
  const addKeyword = (projectIndex: number) => {
    const project = projects[projectIndex];
    const keywords = project.keywords || [];
    updateSingleProject(projectIndex, {
      keywords: [...keywords, '']
    });
  };

  const updateKeyword = (projectIndex: number, keywordIndex: number, value: string) => {
    const project = projects[projectIndex];
    const keywords = [...(project.keywords || [])];
    keywords[keywordIndex] = value;
    updateSingleProject(projectIndex, { keywords });
  };

  const removeKeyword = (projectIndex: number, keywordIndex: number) => {
    const project = projects[projectIndex];
    const keywords = (project.keywords || []).filter((_, i) => i !== keywordIndex);
    updateSingleProject(projectIndex, { keywords });
  };

  // Roles management
  const addRole = (projectIndex: number) => {
    const project = projects[projectIndex];
    const roles = project.roles || [];
    updateSingleProject(projectIndex, {
      roles: [...roles, '']
    });
  };

  const updateRole = (projectIndex: number, roleIndex: number, value: string) => {
    const project = projects[projectIndex];
    const roles = [...(project.roles || [])];
    roles[roleIndex] = value;
    updateSingleProject(projectIndex, { roles });
  };

  const removeRole = (projectIndex: number, roleIndex: number) => {
    const project = projects[projectIndex];
    const roles = (project.roles || []).filter((_, i) => i !== roleIndex);
    updateSingleProject(projectIndex, { roles });
  };

  // TODO: use ExpandableEntry

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Projects'
        subtitle='Showcase your personal and professional projects, including key achievements and technologies used.'
      />

      <div className="space-y-6">
        {projects.length === 0 ? (

          <ListPlaceholder
            buttonText='Add First Project'
            addItem={addProject}
            icon={
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No projects added yet'
            subtitle='Add your projects to demonstrate your practical skills and experience.'
          />

        ) : (

          <ListItems
            addItem={addProject}
            buttonText='Add Another Project'
            listItems={
              projects.map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Project Header */}
                  <div className="flex flex-col items-between gap-2 bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FolderOpen className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {project.name || 'New Project'}
                            {project.type && ` (${project.type})`}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Project #{index + 1}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleProjectExpanded(index)}
                          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                        >
                          {expandedProjects.has(index) ? (
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
                          onClick={() => removeProject(index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                          aria-label="Remove project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <VisibilityToggle visible={project._visible} onToggle={() => {
                      updateSingleProject(index, {
                        ...project,
                        _visible: !project._visible,
                      })
                    }}/>

                  </div>

                  {/* Project Details */}
                  {expandedProjects.has(index) && (
                    <div className="p-6 space-y-8">
                      {/* Basic Information */}
                      <div className="space-y-6">
                        <div className="flex items-center mb-4">
                          <Code className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900">Project Details</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Project Name"
                            value={project.name || ''}
                            onChange={(value) => updateSingleProject(index, { name: value })}
                            placeholder="e.g., E-commerce Platform"
                            required={true}
                          />
                          
                          <InputField
                            label="Project Type"
                            value={project.type || ''}
                            onChange={(value) => updateSingleProject(index, { type: value })}
                            placeholder="e.g., Marketing Campaign, Research Study, App, Website, Event Planning..."
                            helpText="Describe the type or category of your project"
                      />
                    </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Organization/Entity"
                            value={project.entity || ''}
                            onChange={(value) => updateSingleProject(index, { entity: value })}
                            placeholder="e.g., Personal Project, ABC Company"
                            icon={<Building className="inline w-4 h-4 mr-1" />}
                            helpText="Company, organization, or personal project"
                          />
                          
                          <UrlField
                            label="Project URL"
                            value={project.url || ''}
                            onChange={(value) => updateSingleProject(index, { url: value })}
                            placeholder="https://github.com/user/project"
                            icon={<Link className="inline w-4 h-4 mr-1" />}
                          />
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-6">
                        <div className="flex items-center mb-4">
                          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900">Timeline</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Start Date"
                            value={project.startDate || ''}
                            onChange={(value) => updateSingleProject(index, { startDate: value })}
                            type="text"
                            placeholder="YYYY-MM"
                            helpText="Format: YYYY-MM (e.g., 2023-01)"
                          />
                          
                          <InputField
                            label="End Date"
                            value={project.endDate || ''}
                            onChange={(value) => updateSingleProject(index, { endDate: value })}
                            type="text"
                            placeholder="YYYY-MM (leave empty if ongoing)"
                            helpText="Leave empty for ongoing projects"
                      />
                    </div>
                  </div>

                      {/* Description */}
                      <div className="space-y-6">
                        <TextArea
                          label="Project Description"
                          value={project.description || ''}
                          onChange={(value) => updateSingleProject(index, { description: value })}
                          rows={4}
                          placeholder="Describe what the project does, its purpose, and your role in it..."
                          helpText="Focus on the project's goals and your contributions"
                          maxLength={1000}
                        />
                      </div>

                      {/* Roles */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">Your Roles</h4>
                          <button
                            type="button"
                            onClick={() => addRole(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Role
                          </button>
                        </div>
                        
                        {(project.roles || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No roles added yet</p>
                            <button
                              type="button"
                              onClick={() => addRole(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add your role in this project
                            </button>
                      </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(project.roles || []).map((role, rIndex) => (
                              <div key={rIndex} className="flex gap-3">
                                <div className="flex-1">
                                  <InputField
                                    label={`Role ${rIndex + 1}`}
                                    value={role}
                                    onChange={(value) => updateRole(index, rIndex, value)}
                                    placeholder="e.g., Lead Developer, UI Designer"
                      />
                                </div>
                      <button
                                  type="button"
                                  onClick={() => removeRole(index, rIndex)}
                                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                                  aria-label="Remove role"
                      >
                                  <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                            ))}
                  </div>
                        )}
                      </div>
                      
                      {/* Key Features & Highlights */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">Key Features & Highlights</h4>
                        <button
                            type="button"
                            onClick={() => addHighlight(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Feature
                        </button>
                      </div>

                        {(project.highlights || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No features added yet</p>
                            <button
                              type="button"
                              onClick={() => addHighlight(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add key features and achievements
                            </button>
                          </div>
                        ) : (
                        <div className="space-y-3">
                            {(project.highlights || []).map((highlight, hIndex) => (
                              <div key={hIndex} className="flex gap-3">
                              <div className="flex-1">
                                <InputField
                                  label={`Feature ${hIndex + 1}`}
                                  value={highlight}
                                  onChange={(value) => updateHighlight(index, hIndex, value)}
                                  placeholder="e.g., Real-time chat functionality, Responsive design"
                                    />
                              </div>
                              <button
                                  type="button"
                                  onClick={() => removeHighlight(index, hIndex)}
                                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                                  aria-label="Remove feature"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                                
                      {/* Keywords */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">Keywords</h4>
                          <button
                            type="button"
                            onClick={() => addKeyword(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Keyword
                          </button>
                                  </div>
                                  
                        {(project.keywords || []).length === 0 ? (
                          <div className="text-center py-6 text-gray-500">
                            <p className="mb-3">No keywords added yet</p>
                            <button
                              type="button"
                              onClick={() => addKeyword(index)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Add relevant keywords and skills
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(project.keywords || []).map((keyword, kIndex) => (
                              <div key={kIndex} className="flex gap-3">
                                  <div className="flex-1">
                                  <InputField
                                    label={`Keyword ${kIndex + 1}`}
                                    value={keyword}
                                    onChange={(value) => updateKeyword(index, kIndex, value)}
                                    placeholder="e.g., Marketing, Adobe Creative Suite, Budget Management..."
                                    />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeKeyword(index, kIndex)}
                                  className="mt-8 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                                  aria-label="Remove keyword"
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