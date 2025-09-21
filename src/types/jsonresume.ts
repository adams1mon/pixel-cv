// JSON Resume TypeScript Interfaces
// Based on: https://jsonresume.org/schema/

// TODO: add metadata?
export interface JsonResume {
  metadata: JsonResumeMetadataExtension;
  $schema?: string;
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

export interface JsonResumeMetadataExtension {
  title: string;
  // For data format compatibility
  version: string;
}

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

// Factory functions for creating empty/default objects
export const createEmptyJsonResume = (): JsonResume => ({
  metadata: createDefaultMetadata(),
  basics: createEmptyBasics(),
  work: [],
  projects: [],
  publications: [],
  education: [],
  volunteer: [],
  awards: [],
  skills: [],
  languages: [],
  certificates: [],
  interests: [],
  references: []
});

export const createDefaultMetadata = (): JsonResumeMetadataExtension => ({
  title: "CV",
  version: "1.0.0",
});

export const createEmptyBasics = (): JsonResumeBasics => ({
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

export const createEmptyWork = (): JsonResumeWork => ({
  name: "",
  position: "",
  startDate: "",
  summary: "",
  highlights: [],
  keywords: []
});

export const createEmptyEducation = (): JsonResumeEducation => ({
  institution: "",
  area: "",
  studyType: "",
  startDate: ""
});

export const createEmptyProject = (): JsonResumeProject => ({
  name: "",
  description: "",
  highlights: [],
  keywords: []
});

export const createEmptySkill = (): JsonResumeSkill => ({
  name: "",
  level: ""
});

export const createEmptyVolunteer = (): JsonResumeVolunteer => ({
  organization: "",
  position: "",
  summary: "",
  highlights: []
});

export const createEmptyAward = (): JsonResumeAward => ({
  title: "",
  awarder: "",
  summary: ""
});

export const createEmptyPublication = (): JsonResumePublication => ({
  name: "",
  publisher: "",
  releaseDate: "",
  summary: ""
});

export const createEmptyCertificate = (): JsonResumeCertificate => ({
  name: "",
  issuer: ""
});

export const createEmptyLanguage = (): JsonResumeLanguage => ({
  language: "",
  fluency: ""
});

export const createEmptyInterest = (): JsonResumeInterest => ({
  name: "",
  summary: ""
});

export const createEmptyReference = (): JsonResumeReference => ({
  name: "",
  reference: ""
});
