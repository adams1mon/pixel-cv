'use client';

import React from 'react';
import { useUI } from '../../contexts/UIContext';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Lightbulb, 
  FolderOpen,
  Heart,
  Award,
  Globe,
  Badge,
  Star,
  BookOpen,
  UserCheck,
  Menu,
  BadgeCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeSection, 
    setActiveSection, 
    sidebarCollapsed, 
    toggleSidebar, 
    sections 
  } = useUI();

  return (
    <div 
      className={`
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-12' : 'w-52'}
        flex flex-col
      `}
    >
      {/* Header with collapse toggle */}
      <div className="border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className="w-full p-3 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors hover:cursor-pointer"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {/* Hamburger/Menu icon */}
          <Menu className="w-4 h-4 text-gray-600" />
          {!sidebarCollapsed && (
            <span className="ml-2 text-sm font-medium text-gray-700">Sections</span>
          )}
        </button>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}
                className={`
                  w-full flex items-center text-sm font-medium px-2 py-2 rounded-md transition-colors
                  hover:cursor-pointer
                  ${activeSection === section.id 
                    ? 'bg-blue-100 text-blue-700 border-l-3 border-blue-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => setActiveSection(section.id)}
                title={sidebarCollapsed ? section.label : section.description}
            >
                {/* Section icon */}
                <div className="flex-shrink-0">
                  {getSectionIcon(section.id)}
                </div>
                
                {/* Section label - hidden when collapsed */}
                {!sidebarCollapsed && (
                  <span className="ml-3 truncate">{section.label}</span>
                )}
                
                {/* Optional indicator - shown when collapsed */}
                {!sidebarCollapsed && section.optional && (
                  <span className="ml-auto text-xs text-gray-400">optional</span>
                )}
            </li>
          ))}
        </ul>
      </nav>

      {/* TODO: Mobile responsive design - convert to hamburger menu on small screens */}
    </div>
  );
};

// Helper function to get section-specific icons for all JsonResume sections
const getSectionIcon = (sectionId: string) => {
  const iconClass = "w-4 h-4";
  
  switch (sectionId) {
    // Core JsonResume sections
    case 'basics':
      return <User className={iconClass} />;
    case 'work':
      return <Briefcase className={iconClass} />;
    case 'projects':
      return <FolderOpen className={iconClass} />;
    case 'education':
      return <GraduationCap className={iconClass} />;
    case 'skills':
      return <Lightbulb className={iconClass} />;
    
    // New JsonResume sections
    case 'volunteer':
      return <Heart className={iconClass} />;
    case 'awards':
      return <Award className={iconClass} />;
    case 'languages':
      return <Globe className={iconClass} />;
    case 'certificates':
      return <BadgeCheck className={iconClass} />;
    case 'interests':
      return <Star className={iconClass} />;
    case 'publications':
      return <BookOpen className={iconClass} />;
    case 'references':
      return <UserCheck className={iconClass} />;
    
    // Legacy fallback cases (for backward compatibility)
    case 'header':
      return <User className={iconClass} />;
    case 'summary':
      return <FileText className={iconClass} />;
    case 'experience':
      return <Briefcase className={iconClass} />;
    
    // Default fallback
    default:
      return <FileText className={iconClass} />;
  }
}; 