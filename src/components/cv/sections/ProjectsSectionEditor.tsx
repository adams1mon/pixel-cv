'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { createEmptyProject, ProjectLink } from '../../../types/cv-data';
import { Plus, Trash2, X } from 'lucide-react';

export const ProjectsSectionEditor: React.FC = () => {
  const { 
    cvData, 
    addProject, 
    updateSingleProject, 
    removeProject 
  } = useCV();

  // Local state for new technology input
  const [newTechInputs, setNewTechInputs] = useState<Record<string, string>>({});

  // Helper to update project
  const handleProjectUpdate = (index: number, field: string, value: any) => {
    const project = cvData.sections.projects[index];
    if (project) {
      updateSingleProject(project.id, {
        ...project,
        [field]: value
      });
    }
  };

  // Add new project
  const handleAddProject = () => {
    const newProject = createEmptyProject();
    addProject(newProject);
  };

  // Remove project
  const handleRemoveProject = (index: number) => {
    const project = cvData.sections.projects[index];
    if (project) {
      removeProject(project.id);
    }
  };

  // Technology management
  const handleAddTechnology = (projectIndex: number) => {
    const techName = newTechInputs[projectIndex]?.trim();
    if (techName) {
      const project = cvData.sections.projects[projectIndex];
      if (project) {
        handleProjectUpdate(projectIndex, 'technologies', [...project.technologies, techName]);
        setNewTechInputs(prev => ({ ...prev, [projectIndex]: '' }));
      }
    }
  };

  const handleRemoveTechnology = (projectIndex: number, techIndex: number) => {
    const project = cvData.sections.projects[projectIndex];
    if (project) {
      const updatedTechnologies = project.technologies.filter((_, i) => i !== techIndex);
      handleProjectUpdate(projectIndex, 'technologies', updatedTechnologies);
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent, projectIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology(projectIndex);
    }
  };

  // Links management
  const handleAddLink = (projectIndex: number) => {
    const project = cvData.sections.projects[projectIndex];
    if (project) {
      const newLink: ProjectLink = {
        type: '',
        url: '',
        label: ''
      };
      handleProjectUpdate(projectIndex, 'links', [...project.links, newLink]);
    }
  };

  const handleUpdateLink = (projectIndex: number, linkIndex: number, field: keyof ProjectLink, value: string) => {
    // TODO: perf optimization
    const project = cvData.sections.projects[projectIndex];
    if (project) {
      const updatedLinks = project.links.map((link, i) => 
        i === linkIndex ? { ...link, [field]: value } : link
      );
      handleProjectUpdate(projectIndex, 'links', updatedLinks);
    }
  };

  const handleRemoveLink = (projectIndex: number, linkIndex: number) => {
    const project = cvData.sections.projects[projectIndex];
    if (project) {
      const updatedLinks = project.links.filter((_, i) => i !== linkIndex);
      handleProjectUpdate(projectIndex, 'links', updatedLinks);
    }
  };

  return (
    <div className="section-editor">
      <div className="mb-6">
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Projects</h2>
          <p className="text-sm text-gray-600">Showcase your personal projects, portfolio work, and notable achievements.</p>
        </div>
      </div>

      <div className="space-y-6">
        {cvData.sections.projects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects added yet</h3>
              <p className="text-gray-500 mb-4">Add your first project to get started.</p>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </button>
            </div>
          </div>
        ) : (
          <>
            {cvData.sections.projects.map((project, index) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Project #{index + 1}</h3>
                  <button
                    onClick={() => handleRemoveProject(index)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectUpdate(index, 'name', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Personal Portfolio Website"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectUpdate(index, 'description', e.target.value)}
                      rows={4}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder="Describe your project, its purpose, and key features..."
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Technologies Used</label>
                  
                  {/* Technology Tags */}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                          <button
                            onClick={() => handleRemoveTechnology(index, techIndex)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add Technology */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechInputs[index] || ''}
                      onChange={(e) => setNewTechInputs(prev => ({ ...prev, [index]: e.target.value }))}
                      onKeyDown={(e) => handleTechKeyPress(e, index)}
                      placeholder="e.g. React, Python, PostgreSQL..."
                      className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleAddTechnology(index)}
                      disabled={!newTechInputs[index]?.trim()}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Additional Details</h4>
                  
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Start Date (Optional)</label>
                      <input
                        type="text"
                        value={project.startDate || ''}
                        onChange={(e) => handleProjectUpdate(index, 'startDate', e.target.value || undefined)}
                        placeholder="2024-01"
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">End Date (Optional)</label>
                      <input
                        type="text"
                        value={project.endDate || ''}
                        onChange={(e) => handleProjectUpdate(index, 'endDate', e.target.value || undefined)}
                        placeholder="2024-03"
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-600">Project Links</label>
                      <button
                        onClick={() => handleAddLink(index)}
                        className="flex items-center p-2 text-sm rounded-md bg-slate-200 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Plus className='w-4 h-4 mr-1'/>
                        Add Link
                      </button>
                    </div>

                    {project.links.length > 0 && (
                      <div className="space-y-3">
                        {project.links.map((link, linkIndex) => (
                          <div key={linkIndex} className="p-3 bg-gray-50 rounded-md">
                            <div className="flex flex-col gap-3">
                              {/* First line: URL only */}
                              <div className="flex items-end gap-2">
                                <div className="flex-1">
                                  <label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
                                  <div className="flex justify-between items-center">
                                    <input
                                      type="url"
                                      value={link.url}
                                      onChange={(e) => handleUpdateLink(index, linkIndex, 'url', e.target.value)}
                                      placeholder="https://..."
                                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                      onClick={() => handleRemoveLink(index, linkIndex)}
                                      className="px-2 py-2 text-red-600 hover:text-red-800 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Second line: Type and Label with equal widths */}
                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                                  <input
                                    type="text"
                                    value={link.type}
                                    onChange={(e) => handleUpdateLink(index, linkIndex, 'type', e.target.value)}
                                    placeholder="github"
                                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                
                                <div className="flex-1">
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                                  <input
                                    type="text"
                                    value={link.label || ''}
                                    onChange={(e) => handleUpdateLink(index, linkIndex, 'label', e.target.value)}
                                    placeholder="Custom label"
                                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.links.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No links added yet.</p>
                    )}

                    <div className="mt-2 text-xs text-gray-500">
                      💡 Read the template description to see what links are supported by the template.
                    </div>
                  </div>

                  {/* Project Visibility */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`project-visible-${project.id}`}
                        type="checkbox"
                        checked={project.isVisible}
                        onChange={(e) => handleProjectUpdate(index, 'isVisible', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor={`project-visible-${project.id}`} className="text-sm font-medium text-gray-700">
                        Show this project
                      </label>
                      <p className="text-xs text-gray-500">
                        Uncheck to hide this project from your CV while keeping it saved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Projects Button */}
            <div className="text-center">
              <button
                onClick={handleAddProject}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add More Projects
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 