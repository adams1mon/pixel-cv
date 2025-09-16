'use client';

import React from 'react';
import { useUI } from '../../contexts/UIContext';
import { HeaderSectionEditor } from './sections/HeaderSectionEditor';
import { SummarySectionEditor } from './sections/SummarySectionEditor';
import { ExperienceSectionEditor } from './sections/ExperienceSectionEditor';
import { EducationSectionEditor } from './sections/EducationSectionEditor';
import { SkillsSectionEditor } from './sections/SkillsSectionEditor';
import { ProjectsSectionEditor } from './sections/ProjectsSectionEditor';

export const SectionRouter: React.FC = () => {
  const { activeSection } = useUI();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'header':
        return <HeaderSectionEditor />;
      
      case 'summary':
        return <SummarySectionEditor />;
      
      case 'experience':
        return <ExperienceSectionEditor />;
      
      case 'education':
        return <EducationSectionEditor />;
      
      case 'skills':
        return <SkillsSectionEditor />;
      
      case 'projects':
        return <ProjectsSectionEditor />
      
      default:
        return <HeaderSectionEditor />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full overflow-y-auto">
      <div className="p-6">
        {renderActiveSection()}
      </div>
    </div>
  );
}; 