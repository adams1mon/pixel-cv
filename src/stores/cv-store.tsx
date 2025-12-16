import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import {
  EnrichedJsonResumeWork,
  EnrichedJsonResumeEducation,
  EnrichedJsonResumeProject,
  EnrichedJsonResumeSkill,
  EnrichedJsonResumeVolunteer,
  EnrichedJsonResumeAward,
  EnrichedJsonResumeLanguage,
  EnrichedJsonResumeCertificate,
  EnrichedJsonResumeInterest,
  EnrichedJsonResumePublication,
  EnrichedJsonResumeReference,
  EnrichedJsonResume,
  parseAndEnrichJsonResume,
  enrichJsonResume,
  parseAndEnrichJsonResumes,
  createEmptyResume,
} from '../types/jsonresume';
import { pdf } from '@react-pdf/renderer';
import { TEMPLATE_REGISTRY } from '@/components/templates/template-registry';
import { jsonResumeSample } from '@/components/cv/jsonresume-sample';

const CV_STORAGE_KEY = 'pixel-cv-jsonresume-data';

type EnrichedJsonResumeArrayKeys = Omit<EnrichedJsonResume, "basics" | "_metadata">;

type ArraySectionItemTypeMap = {
  work: EnrichedJsonResumeWork;
  projects: EnrichedJsonResumeProject;
  education: EnrichedJsonResumeEducation;
  skills: EnrichedJsonResumeSkill;
  volunteer: EnrichedJsonResumeVolunteer;
  awards: EnrichedJsonResumeAward;
  languages: EnrichedJsonResumeLanguage;
  certificates: EnrichedJsonResumeCertificate;
  interests: EnrichedJsonResumeInterest;
  publications: EnrichedJsonResumePublication;
  references: EnrichedJsonResumeReference;
};

// TODO: add more resumes

// we work with the enriched jsonresume
type CVState = {
  data: EnrichedJsonResume;

  resumes: Record<string, EnrichedJsonResume>;
  currentResumeId: string;

  isLoaded: boolean; // Track if data has been loaded from localStorage

  selectResume: (id: string) => void;
  createResume: (name?: string) => void;
  addResume: (resume: EnrichedJsonResume) => void;
  deleteResume: (id: string) => void;

  updateSection: <T extends keyof EnrichedJsonResume>(
    section: T,
    item: EnrichedJsonResume[T]
  ) => void;
  
  // Universal item update function
  updateSectionItem: <T extends keyof EnrichedJsonResumeArrayKeys>(
    section: T,
    index: number,
    item: ArraySectionItemTypeMap[T]
  ) => void;
  
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

  setSelectedTemplate: (templateId: string) => void;
};

export const useCVStore = create<CVState>()(
  subscribeWithSelector((set, get) => {

    const resume = enrichJsonResume(jsonResumeSample);  

    return {

      // TODO: get rid of this 'data' and just use resumes[currentResumeId]
      data: resume,

      resumes: { [resume._metadata.id]:  resume },
      currentResumeId: resume._metadata.id,

      isLoaded: false,

      selectResume: (id) => set(state => { 
        if (state.resumes[id]) {
          return {
            data: state.resumes[id],
            currentResumeId: id 
          };
        } else {
          return state;
        }
      }),

      createResume: (name?: string) => {
        const resume = createEmptyResume(name);
        get().addResume(resume);
      },

      addResume: (resume: EnrichedJsonResume) => {
        set(state => ({
          resumes: {
            ...state.resumes,
            [resume._metadata.id]: resume
          }
        }));
      },

      deleteResume: (id: string) => {

        const {[id]: _removed, ...resumes} = get().resumes;
        
        set({
          resumes
        });
      },

      updateSection: <T extends keyof EnrichedJsonResume>(
        section: T,
        item: EnrichedJsonResume[T]
      ) => set(state => {

        const newData = {
          ...state.data,

          // set section
          [section]: item,
        };

        // update after the [section] is set, so we can overwrite things
        // from newData here..

        // set updatedAt
        const updatedData = {
          ...newData,
          _metadata: {
            ...newData._metadata,
            updatedAt: new Date().toISOString(),
          }
        }

        return {
          resumes: {
            ...state.resumes,
            [state.currentResumeId]: updatedData,
          },
          data: updatedData,
        }
      }),

      // Universal item update function - updates a single item at index in any array section
      updateSectionItem: <T extends keyof EnrichedJsonResumeArrayKeys>(
        section: T,
        index: number,
        item: ArraySectionItemTypeMap[T]
      ) => {
        const state = get();
        const currentArray = state.data[section];
        
        if (!currentArray) {
          console.warn(`Section ${section} does not exist in data`);
          return;
        }
        
        if (index < 0 || index >= currentArray.length) {
          console.warn(`Index ${index} is out of bounds for section ${section} (length: ${currentArray.length})`);
          return;
        }
        
        // Create updated array with item replaced at index
        const updatedArray = currentArray.map((existingItem, i) => 
          i === index ? item : existingItem
        ) as EnrichedJsonResume[T];

        get().updateSection(section, updatedArray);
      },

      importFromJson: (jsonString) => {
        try { 
          const resume = parseAndEnrichJsonResume(jsonString);
          const resumes = get().resumes;
          set({ resumes: { ...resumes, [resume._metadata.id]: resume } });
        } catch (e) { 
          console.error(e); 
        }
      },

      loadFromLocalStorage: () => {
        try {
          const jsonString = localStorage.getItem(CV_STORAGE_KEY);
          if (jsonString) {
            const savedData = parseAndEnrichJsonResumes(jsonString);
            const firstResume = Object.values(savedData.resumes)[0];
            set({ 
              resumes: savedData.resumes, 
              data: firstResume, 
              currentResumeId: firstResume._metadata.id,
              isLoaded: true,
            });
            console.log('Resumes loaded from localStorage');
          } else {
            set({ isLoaded: true });
          }
        } catch (error) {
          console.error('Failed to load resumes from localStorage:', error);
          set({ isLoaded: true });
        }
      },

      saveToLocalStorage: () => {
        try {
          const state = get();
          const savedData = {
            resumes: state.resumes, 
            currentResumeId: state.currentResumeId,
          };
          localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(savedData));
          console.log('Resume data saved to localStorage');
        } catch (error) {
          console.error('Failed to save resume data to localStorage:', error);
        }
      },

      // TODO: add move up/down functionality for resume section items

      // TODO: maybe separate this
      pdfBlob: null,
      pdfGenerating: false,
      pdfError: null,

      generatePdfBlob: () => {

        // TODO: don't generate if we're in the mobile layout 
        // in the editor view?

        if (generateTimeout) {
          clearTimeout(generateTimeout);
        }

        generateTimeout = setTimeout(async () => {
          const { data, pageWrap } = get();
          if (!data) return;

          try {
            console.log("generating pdf blob");
            
            set(() => ({ pdfGenerating: true, pdfError: null }));

            const template = TEMPLATE_REGISTRY[data._metadata.templateId];

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

      setSelectedTemplate: templateId => {
        const state = get();

        get().updateSection("_metadata", {
          ...state.resumes[state.currentResumeId]._metadata,
          templateId: templateId,
        });
      },
    }
  })
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
    (state) => state.resumes,
    (resumes, previousResumes) => {
      // Only save if data has actually changed and we've loaded from localStorage
      if (resumes !== previousResumes && useCVStore.getState().isLoaded) {
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
    (state) => state.currentResumeId,
    () => {
      useCVStore.getState().generatePdfBlob();
    }
  );
  
  isSubscribed = true;
};

export interface SavedJsonResumeData {
  resumes: Record<string, EnrichedJsonResume>,
  currentResumeId: string,
};