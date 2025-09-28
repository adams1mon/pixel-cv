'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Section types following JsonResume standard - ALL 12 sections included
export type SidebarSection = 
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
  | 'references'
  | 'template';

// Section configuration for navigation
export interface SectionConfig {
  id: SidebarSection;
  label: string;
  description: string;
}

// UI Context interface
interface UIContextType {
  // Section navigation
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
  
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
    id: 'template', 
    label: 'Template Settings', 
    description: 'Choose and customize your CV template',
  },
  { 
    id: 'basics', 
    label: 'Personal Information', 
    description: 'Name, contact info, location, social profiles, and summary',
  },
  { 
    id: 'work', 
    label: 'Work Experience', 
    description: 'Professional work history and achievements',
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    description: 'Personal and professional projects',
  },
  { 
    id: 'education', 
    label: 'Education', 
    description: 'Academic background and qualifications',
  },
  { 
    id: 'skills', 
    label: 'Skills', 
    description: 'Technical and professional skills',
  },
  { 
    id: 'volunteer', 
    label: 'Volunteer Work', 
    description: 'Community service and volunteer experiences',
  },
  { 
    id: 'awards', 
    label: 'Awards & Achievements', 
    description: 'Recognition and accomplishments',
  },
  { 
    id: 'languages', 
    label: 'Languages', 
    description: 'Language proficiencies and fluency levels',
  },
  { 
    id: 'certificates', 
    label: 'Certifications', 
    description: 'Professional certifications and licenses',
  },
  { 
    id: 'interests', 
    label: 'Interests & Hobbies', 
    description: 'Personal interests and activities',
  },
  { 
    id: 'publications', 
    label: 'Publications', 
    description: 'Articles, books, papers, and other publications',
  },
  { 
    id: 'references', 
    label: 'References', 
    description: 'Professional references and testimonials',
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
  const [activeSection, setActiveSection] = useState<SidebarSection>('basics');
  
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
