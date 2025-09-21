'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Section types following JsonResume standard - ALL 12 sections included
export type JsonResumeSection = 
  | 'basics' 
  | 'work' 
  | 'projects' 
  | 'education' 
  | 'skills' 
  | 'volunteer' 
  | 'awards' 
  | 'languages' 
  | 'certificates' 
  | 'interests' 
  | 'publications' 
  | 'references';

// Section configuration for navigation
export interface SectionConfig {
  id: JsonResumeSection;
  label: string;
  description: string;
  optional: boolean;
}

// UI Context interface
interface UIContextType {
  // Section navigation
  activeSection: JsonResumeSection;
  setActiveSection: (section: JsonResumeSection) => void;
  
  // Sidebar state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  
  // Section configuration
  sections: SectionConfig[];
}

// Section configuration following JsonResume standard - ALL 12 sections
const SECTIONS: SectionConfig[] = [
  { 
    id: 'basics', 
    label: 'Personal Information', 
    description: 'Name, contact info, location, social profiles, and summary',
    optional: false // Only required section in JsonResume
  },
  { 
    id: 'work', 
    label: 'Work Experience', 
    description: 'Professional work history and achievements',
    optional: true 
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    description: 'Personal and professional projects',
    optional: true 
  },
  { 
    id: 'education', 
    label: 'Education', 
    description: 'Academic background and qualifications',
    optional: true 
  },
  { 
    id: 'skills', 
    label: 'Skills', 
    description: 'Technical and professional skills',
    optional: true 
  },
  { 
    id: 'volunteer', 
    label: 'Volunteer Work', 
    description: 'Community service and volunteer experiences',
    optional: true 
  },
  { 
    id: 'awards', 
    label: 'Awards & Achievements', 
    description: 'Recognition and accomplishments',
    optional: true 
  },
  { 
    id: 'languages', 
    label: 'Languages', 
    description: 'Language proficiencies and fluency levels',
    optional: true 
  },
  { 
    id: 'certificates', 
    label: 'Certifications', 
    description: 'Professional certifications and licenses',
    optional: true 
  },
  { 
    id: 'interests', 
    label: 'Interests & Hobbies', 
    description: 'Personal interests and activities',
    optional: true 
  },
  { 
    id: 'publications', 
    label: 'Publications', 
    description: 'Articles, books, papers, and other publications',
    optional: true 
  },
  { 
    id: 'references', 
    label: 'References', 
    description: 'Professional references and testimonials',
    optional: true 
  },
];

// Create context
const UIContext = createContext<UIContextType | undefined>(undefined);

// Provider component
interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Section navigation state - default to basics (the required JsonResume section)
  const [activeSection, setActiveSection] = useState<JsonResumeSection>('basics');
  
  // Sidebar state - default to expanded for desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  
  // Toggle sidebar helper
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };
  
  const contextValue: UIContextType = {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    sections: SECTIONS,
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hook for using UI context
export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
