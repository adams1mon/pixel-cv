import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

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
  createEmptyJsonResume,
  createDefaultMetadata,
} from '../types/jsonresume';
import { ModernReactPdf } from '@/components/templates/ModernReactPdf';
import { pdf } from '@react-pdf/renderer';
import { TEMPLATE_REGISTRY } from '@/components/templates/template-registry';
import { jsonResumeSample } from '@/components/cv/jsonresume-sample';
import { json } from 'stream/consumers';

const CV_STORAGE_KEY = 'pixel-cv-jsonresume-data';

type CVState = {
  data: JsonResume;
  isLoaded: boolean; // Track if data has been loaded from localStorage
  // actions
  setAll: (data: JsonResume) => void;
  updateBasics: (d: JsonResumeBasics) => void;
  updateWork: (d: JsonResumeWork[]) => void;
  updateEducation: (d: JsonResumeEducation[]) => void;
  updateProjects: (d: JsonResumeProject[]) => void;
  updateSkills: (d: JsonResumeSkill[]) => void;
  updateVolunteer: (d: JsonResumeVolunteer[]) => void;
  updateAwards: (d: JsonResumeAward[]) => void;
  updateLanguages: (d: JsonResumeLanguage[]) => void;
  updateCertificates: (d: JsonResumeCertificate[]) => void;
  updateInterests: (d: JsonResumeInterest[]) => void;
  updatePublications: (d: JsonResumePublication[]) => void;
  updateReferences: (d: JsonResumeReference[]) => void;

  exportAsJson: () => string;
  importFromJson: (jsonString: string) => void;
  
  // localStorage control
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;

  pdfBlob: Blob | null;
  pdfGenerating: boolean;
  pdfError: unknown | null;
  generatePdfBlob: () => void;

  pageWrap: boolean;
  setPageWrap: (d: boolean) => void;

  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
};

export const useCVStore = create<CVState>()(
  subscribeWithSelector((set, get) => ({
    // data: createEmptyJsonResume(),
    // TODO: we're shipping an entire image as string in here, maybe try to
    // reduce the size of this a bit - or use image from network
    data: jsonResumeSample,
    isLoaded: false,

    setAll: (data) => set({ data }),

    updateBasics: (d) => set(state => ({ data: { ...state.data, basics: d } })),
    updateWork: (d) => set(state => ({ data: { ...state.data, work: d } })),
    updateEducation: (d) => set(state => ({ data: { ...state.data, education: d } })),
    updateProjects: (d) => set(state => ({ data: { ...state.data, projects: d } })),
    updateSkills: (d) => set(state => ({ data: { ...state.data, skills: d } })),
    updateVolunteer: (d) => set(state => ({ data: { ...state.data, volunteer: d } })),
    updateAwards: (d) => set(state => ({ data: { ...state.data, awards: d } })),
    updateLanguages: (d) => set(state => ({ data: { ...state.data, languages: d } })),
    updateCertificates: (d) => set(state => ({ data: { ...state.data, certificates: d } })),
    updateInterests: (d) => set(state => ({ data: { ...state.data, interests: d } })),
    updatePublications: (d) => set(state => ({ data: { ...state.data, publications: d } })),
    updateReferences: (d) => set(state => ({ data: { ...state.data, references: d } })),

    exportAsJson: () => {
      try { return JSON.stringify(get().data, null, 2); } catch { return ''; }
    },

    importFromJson: (jsonString) => {
      try { 
        const parsed = JSON.parse(jsonString) as JsonResume;

        // metadata is only used for the title (name of the file) now...
        // the version is still important to have
        if (!parsed.metadata) {
          parsed.metadata = createDefaultMetadata();
        }

        get().setAll(JSON.parse(jsonString) as JsonResume); 
      } catch (e) { 
        console.error(e); 
      }
    },

    loadFromLocalStorage: () => {
      try {
        const savedData = localStorage.getItem(CV_STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData) as JsonResume;
          set({ data: parsedData, isLoaded: true });
          console.log('Resume data loaded from localStorage');
        } else {
          set({ isLoaded: true });
        }
      } catch (error) {
        console.error('Failed to load resume data from localStorage:', error);
        set({ isLoaded: true });
      }
    },

    saveToLocalStorage: () => {
      try {
        const { data } = get();
        localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
        console.log('Resume data saved to localStorage');
      } catch (error) {
        console.error('Failed to save resume data to localStorage:', error);
      }
    },

    // TODO: maybe separate this
    pdfBlob: null,
    pdfGenerating: false,
    pdfError: null,

    generatePdfBlob: () => {

      if (generateTimeout) {
        clearTimeout(generateTimeout);
      }

      generateTimeout = setTimeout(async () => {
        const { data, pageWrap, selectedTemplate } = get();
        if (!data) return;

        try {
          console.log("generating pdf blob");
          
          set(() => ({ pdfGenerating: true, pdfError: null }));

          const template = TEMPLATE_REGISTRY[selectedTemplate];

          // const cv = <ModernReactPdf data={data} pageWrap={pageWrap} />
          const cv = <template.component data={data} pageWrap={pageWrap} />

          const blob = await pdf(cv).toBlob();

          set(() => ({ pdfBlob: blob }));

        } catch (err) {
          set(() => ({ pdfError: err }));
        } finally {
          set(() => ({ pdfGenerating: false }));
          console.warn("resetting");
        }
      }, PDF_GEN_DEBOUNCE_MS);
    },

    pageWrap: true,
    setPageWrap: d => set(() => ({ pageWrap: d })),

    // from the template registry
    selectedTemplate: "modern",
    setSelectedTemplate: d => set(() => ({ selectedTemplate: d }))
  }))
);

const LOCAL_STORAGE_DEBOUNCE_MS = 1000;
const PDF_GEN_DEBOUNCE_MS = 1000;

let generateTimeout: NodeJS.Timeout | null = null;

// Set up debounced auto-save subscription
let isSubscribed = false;

// Debounce utility
let saveTimeout: NodeJS.Timeout | null = null;

// TODO: see if isLoaded is needed
export const initializeCVStore = () => {
  if (isSubscribed) return;
  
  // Load from localStorage on initialization
  useCVStore.getState().loadFromLocalStorage();
  const data = useCVStore.getState().data;
  console.log(data);
  
  // load sample if there's no saved data
  if (!useCVStore.getState().data) { 
    useCVStore.getState().importFromJson(JSON.stringify(jsonResumeSample));
  }

  useCVStore.getState().generatePdfBlob();
  
  // Subscribe to data changes for debounced saving
  useCVStore.subscribe(
    (state) => state.data,
    (data, previousData) => {
      // Only save if data has actually changed and we've loaded from localStorage
      if (data !== previousData && useCVStore.getState().isLoaded) {
        // Clear existing timeout
        if (saveTimeout) {
          clearTimeout(saveTimeout);
        }
        
        // Set new timeout for debounced save
        saveTimeout = setTimeout(() => {
          useCVStore.getState().saveToLocalStorage();
        }, LOCAL_STORAGE_DEBOUNCE_MS); // 1 second debounce - you can adjust this

        useCVStore.getState().generatePdfBlob();
      }
    }
  );

  useCVStore.subscribe(
    (state) => state.pageWrap,
    () => {
      useCVStore.getState().generatePdfBlob();
    }
  );

  useCVStore.subscribe(
    (state) => state.selectedTemplate,
    () => {
      useCVStore.getState().generatePdfBlob();
    }
  );
  
  isSubscribed = true;
};
