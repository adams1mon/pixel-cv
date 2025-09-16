'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Section types following CV top-down structure
export type CVSection = 'header' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';

// Section configuration for navigation
export interface SectionConfig {
  id: CVSection;
  label: string;
}

// UI Context interface
interface UIContextType {
  // Section navigation
  activeSection: CVSection;
  setActiveSection: (section: CVSection) => void;
  
  // Sidebar state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  
  // Section configuration
  sections: SectionConfig[];
}

// Section configuration following top-down CV structure
const SECTIONS: SectionConfig[] = [
  { id: 'header', label: 'Personal Information'},
  { id: 'summary', label: 'Professional Summary'},
  { id: 'experience', label: 'Experience'},
  { id: 'education', label: 'Education'},
  { id: 'skills', label: 'Skills'},
  { id: 'projects', label: 'Projects'},
];

// Create context
const UIContext = createContext<UIContextType | undefined>(undefined);

// Provider component
interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // Section navigation state - default to first section (header)
  const [activeSection, setActiveSection] = useState<CVSection>('header');
  
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

// Helper function to get section by id
export const getSectionConfig = (sectionId: CVSection): SectionConfig | undefined => {
  return SECTIONS.find(section => section.id === sectionId);
}; 