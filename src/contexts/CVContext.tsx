'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  CVData, 
  HeaderData, 
  SummaryData, 
  ExperienceData, 
  EducationData, 
  SkillsData, 
  ProjectData,
  createEmptyCV 
} from '../types/cv-data';

// Action types for CV data updates
type CVAction = 
  | { type: 'SET_CV_DATA'; payload: CVData }
  | { type: 'UPDATE_HEADER'; payload: HeaderData }
  | { type: 'UPDATE_SUMMARY'; payload: SummaryData }
  | { type: 'UPDATE_EXPERIENCE'; payload: ExperienceData[] }
  | { type: 'ADD_EXPERIENCE'; payload: ExperienceData }
  | { type: 'UPDATE_SINGLE_EXPERIENCE'; payload: { id: string; data: ExperienceData } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'UPDATE_EDUCATION'; payload: EducationData[] }
  | { type: 'ADD_EDUCATION'; payload: EducationData }
  | { type: 'UPDATE_SINGLE_EDUCATION'; payload: { id: string; data: EducationData } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'UPDATE_SKILLS'; payload: SkillsData }
  | { type: 'UPDATE_PROJECTS'; payload: ProjectData[] }
  | { type: 'ADD_PROJECT'; payload: ProjectData }
  | { type: 'UPDATE_SINGLE_PROJECT'; payload: { id: string; data: ProjectData } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'UPDATE_METADATA'; payload: { title?: string; templateId?: string } };

// CV Context interface
interface CVContextType {
  cvData: CVData;
  updateHeader: (data: HeaderData) => void;
  updateSummary: (data: SummaryData) => void;
  updateExperience: (data: ExperienceData[]) => void;
  addExperience: (data: ExperienceData) => void;
  updateSingleExperience: (id: string, data: ExperienceData) => void;
  removeExperience: (id: string) => void;
  updateEducation: (data: EducationData[]) => void;
  addEducation: (data: EducationData) => void;
  updateSingleEducation: (id: string, data: EducationData) => void;
  removeEducation: (id: string) => void;
  updateSkills: (data: SkillsData) => void;
  updateProjects: (data: ProjectData[]) => void;
  addProject: (data: ProjectData) => void;
  updateSingleProject: (id: string, data: ProjectData) => void;
  removeProject: (id: string) => void;
  updateMetadata: (metadata: { title?: string; templateId?: string }) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  // TODO: Add export functionality (JSON, PDF)
  // TODO: Add import functionality
  // TODO: Add undo/redo functionality
}

// Reducer function
const cvReducer = (state: CVData, action: CVAction): CVData => {
  const newState = (() => {
    switch (action.type) {
      case 'SET_CV_DATA':
        return action.payload;
      
      case 'UPDATE_HEADER':
        return {
          ...state,
          sections: {
            ...state.sections,
            header: action.payload,
          },
        };
      
      case 'UPDATE_SUMMARY':
        return {
          ...state,
          sections: {
            ...state.sections,
            summary: action.payload,
          },
        };
      
      case 'UPDATE_EXPERIENCE':
        return {
          ...state,
          sections: {
            ...state.sections,
            experience: action.payload,
          },
        };
      
      case 'ADD_EXPERIENCE':
        return {
          ...state,
          sections: {
            ...state.sections,
            experience: [...state.sections.experience, action.payload],
          },
        };
      
      case 'UPDATE_SINGLE_EXPERIENCE':
        return {
          ...state,
          sections: {
            ...state.sections,
            experience: state.sections.experience.map(exp =>
              exp.id === action.payload.id ? action.payload.data : exp
            ),
          },
        };
      
      case 'REMOVE_EXPERIENCE':
        return {
          ...state,
          sections: {
            ...state.sections,
            experience: state.sections.experience.filter(exp => exp.id !== action.payload),
          },
        };
      
      case 'UPDATE_EDUCATION':
        return {
          ...state,
          sections: {
            ...state.sections,
            education: action.payload,
          },
        };
      
      case 'ADD_EDUCATION':
        return {
          ...state,
          sections: {
            ...state.sections,
            education: [...state.sections.education, action.payload],
          },
        };
      
      case 'UPDATE_SINGLE_EDUCATION':
        return {
          ...state,
          sections: {
            ...state.sections,
            education: state.sections.education.map(edu =>
              edu.id === action.payload.id ? action.payload.data : edu
            ),
          },
        };
      
      case 'REMOVE_EDUCATION':
        return {
          ...state,
          sections: {
            ...state.sections,
            education: state.sections.education.filter(edu => edu.id !== action.payload),
          },
        };
      
      case 'UPDATE_SKILLS':
        return {
          ...state,
          sections: {
            ...state.sections,
            skills: action.payload,
          },
        };
      
      case 'UPDATE_PROJECTS':
        return {
          ...state,
          sections: {
            ...state.sections,
            projects: action.payload,
          },
        };
      
      case 'ADD_PROJECT':
        return {
          ...state,
          sections: {
            ...state.sections,
            projects: [...state.sections.projects, action.payload],
          },
        };
      
      case 'UPDATE_SINGLE_PROJECT':
        return {
          ...state,
          sections: {
            ...state.sections,
            projects: state.sections.projects.map(project =>
              project.id === action.payload.id ? action.payload.data : project
            ),
          },
        };
      
      case 'REMOVE_PROJECT':
        return {
          ...state,
          sections: {
            ...state.sections,
            projects: state.sections.projects.filter(project => project.id !== action.payload),
          },
        };
      
      case 'UPDATE_METADATA':
        return {
          ...state,
          metadata: {
            ...state.metadata,
            ...action.payload,
          },
        };
      
      default:
        return state;
    }
  })();

  // Update timestamp on any change
  return {
    ...newState,
    updatedAt: new Date().toISOString(),
  };
};

// Create context
const CVContext = createContext<CVContextType | undefined>(undefined);

// Local storage key
const CV_STORAGE_KEY = 'pixel-cv-data';

// Provider component
interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const [cvData, dispatch] = useReducer(cvReducer, createEmptyCV());

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Auto-save to localStorage on data changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage();
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
      console.log('CV data saved to localStorage');
    } catch (error) {
      console.error('Failed to save CV data to localStorage:', error);
      // TODO: Show user notification about save failure
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem(CV_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as CVData;
        dispatch({ type: 'SET_CV_DATA', payload: parsedData });
        console.log('CV data loaded from localStorage');
      }
    } catch (error) {
      console.error('Failed to load CV data from localStorage:', error);
      // TODO: Show user notification about load failure
    }
  };

  // Context value
  const contextValue: CVContextType = {
    cvData,
    updateHeader: (data: HeaderData) => dispatch({ type: 'UPDATE_HEADER', payload: data }),
    updateSummary: (data: SummaryData) => dispatch({ type: 'UPDATE_SUMMARY', payload: data }),
    updateExperience: (data: ExperienceData[]) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: data }),
    addExperience: (data: ExperienceData) => dispatch({ type: 'ADD_EXPERIENCE', payload: data }),
    updateSingleExperience: (id: string, data: ExperienceData) => 
      dispatch({ type: 'UPDATE_SINGLE_EXPERIENCE', payload: { id, data } }),
    removeExperience: (id: string) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id }),
    updateEducation: (data: EducationData[]) => dispatch({ type: 'UPDATE_EDUCATION', payload: data }),
    addEducation: (data: EducationData) => dispatch({ type: 'ADD_EDUCATION', payload: data }),
    updateSingleEducation: (id: string, data: EducationData) => 
      dispatch({ type: 'UPDATE_SINGLE_EDUCATION', payload: { id, data } }),
    removeEducation: (id: string) => dispatch({ type: 'REMOVE_EDUCATION', payload: id }),
    updateSkills: (data: SkillsData) => dispatch({ type: 'UPDATE_SKILLS', payload: data }),
    updateProjects: (data: ProjectData[]) => dispatch({ type: 'UPDATE_PROJECTS', payload: data }),
    addProject: (data: ProjectData) => dispatch({ type: 'ADD_PROJECT', payload: data }),
    updateSingleProject: (id: string, data: ProjectData) => 
      dispatch({ type: 'UPDATE_SINGLE_PROJECT', payload: { id, data } }),
    removeProject: (id: string) => dispatch({ type: 'REMOVE_PROJECT', payload: id }),
    updateMetadata: (metadata: { title?: string; templateId?: string }) => 
      dispatch({ type: 'UPDATE_METADATA', payload: metadata }),
    saveToLocalStorage,
    loadFromLocalStorage,
  };

  return (
    <CVContext.Provider value={contextValue}>
      {children}
    </CVContext.Provider>
  );
};

// Custom hook to use CV context
export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}; 