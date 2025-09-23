'use client';

import React from 'react';
import { useUI } from '../../contexts/UIContext';
// Existing section editors (to be updated)
import { BasicsSectionEditor } from './sections/BasicsSectionEditor';
import { WorkSectionEditor } from './sections/WorkSectionEditor';
import { EducationSectionEditor } from './sections/EducationSectionEditor';
import { SkillsSectionEditor } from './sections/SkillsSectionEditor';
import { ProjectsSectionEditor } from './sections/ProjectsSectionEditor';
import { LanguagesSectionEditor } from './sections/LanguagesSectionEditor';
import { PublicationsSectionEditor } from './sections/PublicationsSectionEditor';
import { AwardsSectionEditor } from './sections/AwardsSectionEditor';
import { VolunteerSectionEditor } from './sections/VolunteerSectionEditor';
import { CertificatesSectionEditor } from './sections/CertificatesSectionEditor';
import { InterestsSectionEditor } from './sections/InterestsSectionEditor';
import { ReferencesSectionEditor } from './sections/ReferencesSectionEditor';

// Placeholder component for sections that don't exist yet
const PlaceholderSectionEditor: React.FC<{ sectionName: string; description: string }> = ({ sectionName, description }) => (
  <div className="section-editor">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{sectionName}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <div className="text-blue-600 text-lg font-medium mb-2">
        Coming Soon! 🚧
      </div>
      <p className="text-blue-700 text-sm">
        This section editor is being developed. You'll be able to add and edit {sectionName.toLowerCase()} here soon.
      </p>
    </div>
  </div>
);

export const SectionRouter: React.FC = () => {
  const { activeSection } = useUI();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'basics':
        return <BasicsSectionEditor />;
      
      case 'work':
        return <WorkSectionEditor />;
      
      case 'projects':
        return <ProjectsSectionEditor />;
      
      case 'education':
        return <EducationSectionEditor />;
      
      case 'skills':
        return <SkillsSectionEditor />;
      
      case 'volunteer':
        return <VolunteerSectionEditor />;
      
      case 'awards':
        return <AwardsSectionEditor />;
      
      case 'languages':
        return <LanguagesSectionEditor />;
      
      case 'certificates':
        return <CertificatesSectionEditor />;
      
      case 'interests':
        return <InterestsSectionEditor />;
      
      case 'publications':
        return <PublicationsSectionEditor />;
      
      case 'references':
        return <ReferencesSectionEditor />;
      
      default:
        return (
          <PlaceholderSectionEditor
            sectionName={activeSection}
            description="This section is not implemented..."
          />
        );
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