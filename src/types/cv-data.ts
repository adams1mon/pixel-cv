import { randomId } from "@/utils";

// Core CV Data Types
export interface CVData {
  id: string;
  templateId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  metadata: CVMetadata;
  sections: CVSections;
}

export interface CVMetadata {
  title: string; // User-defined CV title (e.g., "Software Engineer CV")
  version: string; // Data model version for migration compatibility
}

export interface CVSections {
  header: HeaderData;
  summary: SummaryData;
  experience: ExperienceData[];
  education: EducationData[];
  skills: SkillsData;
  projects: ProjectData[];
  // TODO: free section, do what you want with it
}

// TODO: remove data from localstorage if error?

// Header / Contact Info Section
export interface HeaderData {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string; // Professional title/role
    location: string; // City, Country or full address
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
}

// TODO: add a footer with link to X
// TODO: add rich text editor where appropriate

// Professional Summary Section
export interface SummaryData {
  content: string; // Rich text or plain text summary
  isVisible: boolean; // Allow users to hide sections
}

// TODO: go over what data we can actually enter, we are missing some 
// in the forms

// Experience Section
export interface ExperienceData {
  id: string; // Unique identifier for reordering
  company: string;
  position: string;
  location: string;
  startDate: string; // YYYY-MM format for flexibility
  endDate: string | null; // null for current position
  isCurrentPosition: boolean;
  description: string; // Multi-line description with bullet points
  achievements: string[]; // Array of achievement bullet points
  technologies?: string[]; // Technologies used in this role
  isVisible: boolean;
}

// Education Section
export interface EducationData {
  id: string;
  institution: string;
  degree: string; // Bachelor's, Master's, PhD, etc.
  fieldOfStudy: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string | null; // null for ongoing
  isOngoing: boolean;
  gpa?: number; // Optional GPA
  honors?: string; // Magna cum laude, etc.
  isVisible: boolean;
}

// Skills Section
export interface SkillsData {
  skills: Skill[];
  isVisible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

// Projects Section
export interface ProjectData {
  id: string;
  name: string;
  description: string;
  technologies: string[]; // Array of technologies used
  startDate?: string; // YYYY-MM format, optional
  endDate?: string; // YYYY-MM format, optional
  links: ProjectLink[];
  isVisible: boolean;
}

export interface ProjectLink {
  // Free-form text input (e.g., "github", "demo", "website", etc.),
  // let the template decide what it handles
  type: string; 
  url: string;
  label?: string; // Optional custom label
}

// Utility types for form handling and validation
export type DateString = string; // YYYY-MM format
export type ISODateString = string; // Full ISO date string

// TODO: replace crypto with edge-safe func

// Default/empty data factories
export const createEmptyCV = (): CVData => ({
  id: randomId(),
  templateId: 'modern-white',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  metadata: {
    title: 'My CV',
    version: '1.0.0'
  },
  sections: {
    header: createEmptyHeader(),
    summary: createEmptySummary(),
    experience: [],
    education: [],
    skills: createEmptySkills(),
    projects: []
  }
});

export const createEmptyHeader = (): HeaderData => ({
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    location: ''
  },
  contact: {
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    github: ''
  }
});

export const createEmptySummary = (): SummaryData => ({
  content: '',
  isVisible: true
});

export const createEmptyExperience = (): ExperienceData => ({
  id: randomId(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: null,
  isCurrentPosition: false,
  description: '',
  achievements: [],
  technologies: [],
  isVisible: true
});

export const createEmptyEducation = (): EducationData => ({
  id: randomId(),
  institution: '',
  degree: '',
  fieldOfStudy: '',
  location: '',
  startDate: '',
  endDate: null,
  isOngoing: false,
  isVisible: true
});

export const createEmptySkills = (): SkillsData => ({
  skills: [],
  isVisible: true,
});

export const createEmptySkill = (): Skill => ({
  id: randomId(),
  name: '',
});

export const createEmptyProject = (): ProjectData => ({
  id: randomId(),
  name: '',
  description: '',
  technologies: [],
  links: [],
  isVisible: true
}); 