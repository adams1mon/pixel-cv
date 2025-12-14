'use client';

import React from 'react';
import { useCVStore } from '@/stores/cv-store';
import { createEmptyProject } from '../../../../types/jsonresume';
import { FolderOpen } from 'lucide-react';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';
import { ProjectEntry } from './ProjectEntry';


export const ProjectsSectionEditor: React.FC = () => {
  const projects = useCVStore(s => s.data.projects || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Project array management
  const addProject = () => {
    const newProject = createEmptyProject();
    const updatedProjects = [...projects, newProject];
    updateSection("projects", updatedProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    updateSection("projects", updatedProjects);
  };

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
                <ProjectEntry
                  key={index}
                  index={index}
                  item={project}
                  onUpdate={(updated) => updateSectionItem("projects", index, updated)}
                  onRemove={() => removeProject(index)}
                />
              ))
            }
          />

        )}
      </div>
    </div>
  );
};