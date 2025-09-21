'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  JsonResume,
  JsonResumeBasics,
  JsonResumeWork,
  JsonResumeEducation,
  JsonResumeProject,
  JsonResumeSkill,
  JsonResumeVolunteer,
  JsonResumeAward,
  JsonResumeLanguage,
  JsonResumeCertificate,
  JsonResumeInterest,
  JsonResumePublication,
  JsonResumeReference,
  createEmptyJsonResume 
} from '../types/jsonresume';

// Action types for JsonResume updates
type CVAction = 
  | { type: 'SET_RESUME_DATA'; payload: JsonResume }
  | { type: 'UPDATE_BASICS'; payload: JsonResumeBasics }
  | { type: 'UPDATE_WORK'; payload: JsonResumeWork[] }
  | { type: 'UPDATE_EDUCATION'; payload: JsonResumeEducation[] }
  | { type: 'UPDATE_PROJECTS'; payload: JsonResumeProject[] }
  | { type: 'UPDATE_SKILLS'; payload: JsonResumeSkill[] }
  | { type: 'UPDATE_VOLUNTEER'; payload: JsonResumeVolunteer[] }
  | { type: 'UPDATE_AWARDS'; payload: JsonResumeAward[] }
  | { type: 'UPDATE_LANGUAGES'; payload: JsonResumeLanguage[] }
  | { type: 'UPDATE_CERTIFICATES'; payload: JsonResumeCertificate[] }
  | { type: 'UPDATE_INTERESTS'; payload: JsonResumeInterest[] }
  | { type: 'UPDATE_PUBLICATIONS'; payload: JsonResumePublication[] }
  | { type: 'UPDATE_REFERENCES'; payload: JsonResumeReference[] };

// CV Context interface
interface CVContextType {
  cvData: JsonResume;
  updateBasics: (data: JsonResumeBasics) => void;
  updateWork: (data: JsonResumeWork[]) => void;
  updateEducation: (data: JsonResumeEducation[]) => void;
  updateProjects: (data: JsonResumeProject[]) => void;
  updateSkills: (data: JsonResumeSkill[]) => void;
  updateVolunteer: (data: JsonResumeVolunteer[]) => void;
  updateAwards: (data: JsonResumeAward[]) => void;
  updateLanguages: (data: JsonResumeLanguage[]) => void;
  updateCertificates: (data: JsonResumeCertificate[]) => void;
  updateInterests: (data: JsonResumeInterest[]) => void;
  updatePublications: (data: JsonResumePublication[]) => void;
  updateReferences: (data: JsonResumeReference[]) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportAsJson: () => string;
  importFromJson: (jsonString: string) => void;
}

// TODO: Add undo/redo functionality

// Reducer function
const cvReducer = (state: JsonResume, action: CVAction): JsonResume => {
  switch (action.type) {
    case 'SET_RESUME_DATA':
      return action.payload;
    
    case 'UPDATE_BASICS':
      return {
        ...state,
        basics: action.payload,
      };
    
    case 'UPDATE_WORK':
      return {
        ...state,
        work: action.payload,
      };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: action.payload,
      };
    
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: action.payload,
      };
    
    case 'UPDATE_VOLUNTEER':
      return {
        ...state,
        volunteer: action.payload,
      };
    
    case 'UPDATE_AWARDS':
      return {
        ...state,
        awards: action.payload,
      };
    
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        languages: action.payload,
      };
    
    case 'UPDATE_CERTIFICATES':
      return {
        ...state,
        certificates: action.payload,
      };
    
    case 'UPDATE_INTERESTS':
      return {
        ...state,
        interests: action.payload,
      };
    
    case 'UPDATE_PUBLICATIONS':
      return {
        ...state,
        publications: action.payload,
      };
    
    case 'UPDATE_REFERENCES':
      return {
        ...state,
        references: action.payload,
      };
    
    default:
      return state;
  }
};

// Create context
const CVContext = createContext<CVContextType | undefined>(undefined);

// Local storage key
const CV_STORAGE_KEY = 'pixel-cv-jsonresume-data';

// Provider component
interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const [cvData, dispatch] = useReducer(cvReducer, createEmptyJsonResume());

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
      console.log('Resume data saved to localStorage');
    } catch (error) {
      console.error('Failed to save resume data to localStorage:', error);
      // TODO: Show user notification about save failure
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem(CV_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as JsonResume;
        dispatch({ type: 'SET_RESUME_DATA', payload: parsedData });
        console.log('Resume data loaded from localStorage');
      }
    } catch (error) {
      console.error('Failed to load resume data from localStorage:', error);
      // TODO: Show user notification about load failure
    }
  };

  const exportAsJson = (): string => {
    try {
      return JSON.stringify(cvData, null, 2);
    } catch (error) {
      console.error('Failed to export resume as JSON:', error);
      return '';
    }
  };

  const importFromJson = (jsonString: string) => {
    try {
      const parsedData = JSON.parse(jsonString) as JsonResume;
      // TODO: Add validation to ensure the imported data matches JsonResume schema
      dispatch({ type: 'SET_RESUME_DATA', payload: parsedData });
      console.log('Resume data imported from JSON');
    } catch (error) {
      console.error('Failed to import resume from JSON:', error);
      // TODO: Show user notification about import failure
    }
  };

  // Context value
  const contextValue: CVContextType = {
    cvData: cvData,
    updateBasics: (data: JsonResumeBasics) => dispatch({ type: 'UPDATE_BASICS', payload: data }),
    updateWork: (data: JsonResumeWork[]) => dispatch({ type: 'UPDATE_WORK', payload: data }),
    updateEducation: (data: JsonResumeEducation[]) => dispatch({ type: 'UPDATE_EDUCATION', payload: data }),
    updateProjects: (data: JsonResumeProject[]) => dispatch({ type: 'UPDATE_PROJECTS', payload: data }),
    updateSkills: (data: JsonResumeSkill[]) => dispatch({ type: 'UPDATE_SKILLS', payload: data }),
    updateVolunteer: (data: JsonResumeVolunteer[]) => dispatch({ type: 'UPDATE_VOLUNTEER', payload: data }),
    updateAwards: (data: JsonResumeAward[]) => dispatch({ type: 'UPDATE_AWARDS', payload: data }),
    updateLanguages: (data: JsonResumeLanguage[]) => dispatch({ type: 'UPDATE_LANGUAGES', payload: data }),
    updateCertificates: (data: JsonResumeCertificate[]) => dispatch({ type: 'UPDATE_CERTIFICATES', payload: data }),
    updateInterests: (data: JsonResumeInterest[]) => dispatch({ type: 'UPDATE_INTERESTS', payload: data }),
    updatePublications: (data: JsonResumePublication[]) => dispatch({ type: 'UPDATE_PUBLICATIONS', payload: data }),
    updateReferences: (data: JsonResumeReference[]) => dispatch({ type: 'UPDATE_REFERENCES', payload: data }),
    saveToLocalStorage,
    loadFromLocalStorage,
    exportAsJson,
    importFromJson,
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