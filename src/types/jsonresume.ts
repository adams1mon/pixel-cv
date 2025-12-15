// JSON Resume TypeScript Interfaces
// Based on: https://jsonresume.org/schema/

import { SavedJsonResumeData } from "@/stores/cv-store";
import { nanoid } from "nanoid";

// we can load the plain type and enrich it
export interface JsonResume {
  basics: JsonResumeBasics;
  work?: JsonResumeWork[];
  projects?: JsonResumeProject[];
  education?: JsonResumeEducation[];
  publications?: JsonResumePublication[];
  volunteer?: JsonResumeVolunteer[];
  awards?: JsonResumeAward[];
  skills?: JsonResumeSkill[];
  languages?: JsonResumeLanguage[];
  certificates?: JsonResumeCertificate[];
  interests?: JsonResumeInterest[];
  references?: JsonResumeReference[];
}

// we work with this enriched format, save it to localStorage
export interface EnrichedJsonResume {
  _metadata: JsonResumeMetadataExtension;
  basics: EnrichedJsonResumeBasics;
  work?: EnrichedJsonResumeWork[];
  projects?: EnrichedJsonResumeProject[];
  education?: EnrichedJsonResumeEducation[];
  publications?: EnrichedJsonResumePublication[];
  volunteer?: EnrichedJsonResumeVolunteer[];
  awards?: EnrichedJsonResumeAward[];
  skills?: EnrichedJsonResumeSkill[];
  languages?: EnrichedJsonResumeLanguage[];
  certificates?: EnrichedJsonResumeCertificate[];
  interests?: EnrichedJsonResumeInterest[];
  references?: EnrichedJsonResumeReference[];
}

export interface JsonResumeMetadataExtension {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  // For data format compatibility
  version: string;
}

export interface VisibleExtension {
  _visible: boolean;
}

// Enriched interfaces with visibility extension
export interface EnrichedJsonResumeBasics extends JsonResumeBasics, VisibleExtension {}

export interface EnrichedJsonResumeWork extends JsonResumeWork, VisibleExtension {}

export interface EnrichedJsonResumeProject extends JsonResumeProject, VisibleExtension {}

export interface EnrichedJsonResumeEducation extends JsonResumeEducation, VisibleExtension {}

export interface EnrichedJsonResumePublication extends JsonResumePublication, VisibleExtension {}

export interface EnrichedJsonResumeVolunteer extends JsonResumeVolunteer, VisibleExtension {}

export interface EnrichedJsonResumeAward extends JsonResumeAward, VisibleExtension {}

export interface EnrichedJsonResumeSkill extends JsonResumeSkill, VisibleExtension {}

export interface EnrichedJsonResumeLanguage extends JsonResumeLanguage, VisibleExtension {}

export interface EnrichedJsonResumeCertificate extends JsonResumeCertificate, VisibleExtension {}

export interface EnrichedJsonResumeInterest extends JsonResumeInterest, VisibleExtension {}

export interface EnrichedJsonResumeReference extends JsonResumeReference, VisibleExtension {}

// Basics Section (required)
export interface JsonResumeBasics {
  name: string;
  label?: string; // Job title/professional role
  image?: string; // URL or base64 image
  email?: string;
  phone?: string;
  url?: string; // Personal website
  summary?: string; // Professional summary
  location?: JsonResumeLocation;
  profiles?: JsonResumeProfile[];
}

export interface JsonResumeLocation {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string; // ISO country code
  region?: string; // State/province/region
}

export interface JsonResumeProfile {
  network: string; // e.g., "GitHub", "LinkedIn", "Twitter"
  username?: string;
  url: string;
}

// Work Experience
export interface JsonResumeWork {
  name: string; // Company name
  position: string; // Job title
  location?: string;
  description?: string; // Company description
  website?: string; // Company website
  startDate: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format, null/undefined for current position
  summary?: string; // Job description
  highlights?: string[]; // Key achievements
  keywords?: string[]; // Technologies/skills used
}

// Projects
export interface JsonResumeProject {
  name: string;
  description?: string;
  highlights?: string[]; // Key features or achievements
  keywords?: string[]; // Things to show off as badge items?
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
  url?: string; // Project URL
  roles?: string[]; // Roles in the project
  entity?: string; // Associated organization
  type?: string; // Project type (application, library, etc.)
}

// Publications
export interface JsonResumePublication {
  name: string;
  publisher: string;
  releaseDate: string; // YYYY-MM-DD format
  website?: string;
  url?: string; // Link to publication
  summary?: string;
  keywords?: string[];
}

// Education
export interface JsonResumeEducation {
  institution: string;
  area?: string; // Field of study
  studyType?: string; // Degree type (Bachelor, Master, PhD, etc.)
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format, null/undefined for ongoing
  score?: string; // GPA or grade
  courses?: string[]; // Relevant courses
  honors?: string[]; // Academic honors
  activities?: string[]; // Extracurricular activities
}

// Volunteer Work
export interface JsonResumeVolunteer {
  organization: string;
  position?: string;
  location?: string;
  website?: string;
  url?: string; // Organization URL
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
  summary?: string; // Description of volunteer work
  highlights?: string[]; // Key contributions
  keywords?: string[]; // Skills used
}

// Awards & Achievements
export interface JsonResumeAward {
  title: string;
  date?: string; // YYYY-MM-DD format
  awarder: string; // Organization that gave the award
  summary?: string; // Description of the award
  website?: string;
}

// Skills
export interface JsonResumeSkill {
  name: string;
  level?: string; // Beginner, Intermediate, Advanced, Expert, Master
  keywords?: string[]; // Related technologies/tools
}

// Languages
export interface JsonResumeLanguage {
  language: string;
  fluency: string; // Native speaker, Fluent, Conversational, Basic, etc.
}

// Certificates & Certifications
export interface JsonResumeCertificate {
  name: string;
  date?: string; // YYYY-MM-DD format
  issuer: string; // Issuing organization
  website?: string;
  url?: string; // Certificate verification URL
}

// Interests & Hobbies
export interface JsonResumeInterest {
  name: string;
  keywords?: string[]; // Related terms
  summary?: string; // Description of the interest
}

// References
export interface JsonResumeReference {
  name: string;
  reference: string; // Reference text/testimonial
  email?: string;
  phone?: string;
}

// Utility types for form handling and validation
export type JsonResumeDateString = string; // YYYY-MM-DD format
export type JsonResumePartialDateString = string; // YYYY-MM or YYYY format

// TODO: add functions to enrich jsonresume with 
// section show/hide options

export const createDefaultMetadata = (id?: string): JsonResumeMetadataExtension => ({
  version: "1.0.0",

  id: id || nanoid(),
  name: `CV-${Date.now().toString()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const createEmptyBasics = (): EnrichedJsonResumeBasics => ({
  _visible: true,
  name: "",
  label: "",
  email: "",
  phone: "",
  summary: "",
  location: {
    city: "",
    countryCode: "",
    region: ""
  },
  profiles: []
});

export const createEmptyWork = (): EnrichedJsonResumeWork => ({
  _visible: true,
  name: "",
  position: "",
  startDate: "",
  summary: "",
  highlights: [],
  keywords: []
});

export const createEmptyEducation = (): EnrichedJsonResumeEducation => ({
  _visible: true,
  institution: "",
  area: "",
  studyType: "",
  startDate: ""
});

export const createEmptyProject = (): EnrichedJsonResumeProject => ({
  _visible: true,
  name: "",
  description: "",
  highlights: [],
  keywords: []
});

export const createEmptySkill = (): EnrichedJsonResumeSkill => ({
  _visible: true,
  name: "",
  level: ""
});

export const createEmptyVolunteer = (): EnrichedJsonResumeVolunteer => ({
  _visible: true,
  organization: "",
  position: "",
  summary: "",
  highlights: []
});

export const createEmptyAward = (): EnrichedJsonResumeAward => ({
  _visible: true,
  title: "",
  awarder: "",
  summary: ""
});

export const createEmptyPublication = (): EnrichedJsonResumePublication => ({
  _visible: true,
  name: "",
  publisher: "",
  releaseDate: "",
  summary: ""
});

export const createEmptyCertificate = (): EnrichedJsonResumeCertificate => ({
  _visible: true,
  name: "",
  issuer: ""
});

export const createEmptyLanguage = (): EnrichedJsonResumeLanguage => ({
  _visible: true,
  language: "",
  fluency: ""
});

export const createEmptyInterest = (): EnrichedJsonResumeInterest => ({
  _visible: true,
  name: "",
  summary: ""
});

export const createEmptyReference = (): EnrichedJsonResumeReference => ({
  _visible: true,
  name: "",
  reference: ""
});

// export function parseAndEnrichJsonResumes(jsonString: string): Record<string, EnrichedJsonResume> {
export function parseAndEnrichJsonResumes(jsonString: string): SavedJsonResumeData {
  const savedData: SavedJsonResumeData = JSON.parse(jsonString);

  if (!("resumes" in savedData && "currentResumeId" in savedData)) {
    throw new Error("malformed jsonresume data, couldn't load resumes");
  }

  for (const resumeId in savedData.resumes) {
    const resume = savedData.resumes[resumeId];
    if (!isEnrichedJsonResume(resume)) {
      savedData.resumes[resumeId] = enrichJsonResume(resume);
    }
  }

  return savedData;
}

// we either parse plain jsonresume and enrich it, 
// or parse the enriched format
export function parseAndEnrichJsonResume(jsonString: string): EnrichedJsonResume {
  const resume = JSON.parse(jsonString);
  if (!isEnrichedJsonResume(resume)) {
    return enrichJsonResume(resume);
  }
  return resume;
}

/**
 * Type guard to check if a parsed JSON object is an EnrichedJsonResume
 * Checks for the presence of _visible property on basics, which is always present in enriched resumes
 */
export function isEnrichedJsonResume(
  data: JsonResume | EnrichedJsonResume
): data is EnrichedJsonResume {
  // Check if basics has _visible property (most reliable indicator)
  if (data.basics && '_visible' in data.basics) {
    return true;
  }
  
  // Also check for _metadata as a secondary indicator (though it's optional)
  if ('_metadata' in data) {
    return true;
  }
  
  return false;
}

export function enrichJsonResume(jsonResume: JsonResume): EnrichedJsonResume {
  
  // Enrich basics
  const enrichedBasics: EnrichedJsonResumeBasics = {
    ...jsonResume.basics,
    _visible: true,
  };
  
  // Helper function to enrich array items
  // adds visible: true
  const enrichArray = <T extends object>(
    array: T[] | undefined
  ): (T & VisibleExtension)[] | undefined => {
    if (!array) return undefined;
    return array.map(item => ({
      ...item,
      _visible: true,
    }));
  };
  
  return {
    _metadata: createDefaultMetadata(),
    basics: enrichedBasics,
    work: enrichArray<JsonResumeWork>(jsonResume.work) as EnrichedJsonResumeWork[],
    projects: enrichArray(jsonResume.projects) as EnrichedJsonResumeProject[],
    education: enrichArray(jsonResume.education) as EnrichedJsonResumeEducation[],
    publications: enrichArray(jsonResume.publications) as EnrichedJsonResumePublication[],
    volunteer: enrichArray(jsonResume.volunteer) as EnrichedJsonResumeVolunteer[],
    awards: enrichArray(jsonResume.awards) as EnrichedJsonResumeAward[],
    skills: enrichArray(jsonResume.skills) as EnrichedJsonResumeSkill[],
    languages: enrichArray(jsonResume.languages) as EnrichedJsonResumeLanguage[],
    certificates: enrichArray(jsonResume.certificates) as EnrichedJsonResumeCertificate[],
    interests: enrichArray(jsonResume.interests) as EnrichedJsonResumeInterest[],
    references: enrichArray(jsonResume.references) as EnrichedJsonResumeReference[],
  };
}

export function isJsonResumeItemVisible(item: any): boolean {
  return item !== undefined && item !== null && "_visible" in item && item._visible;
}
