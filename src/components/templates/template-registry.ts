import { EnrichedJsonResume } from "@/types/jsonresume";
import { ModernReactPdf } from "./ModernReactPdf";
import { AlphaPdfTemplate } from "./AlphaPdfTemplate";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string; // base64 preview image
  component: React.ComponentType<{ data: EnrichedJsonResume, pageWrap: boolean }>;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  'modern': {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional single-column layout',
    // TODO: preview
    preview: '', // We'll add previews later
    component: ModernReactPdf
  },
  'alpha': {
    id: 'alpha',
    name: 'Alpha', 
    description: 'Two-column layout with skills sidebar',
    preview: '',
    component: AlphaPdfTemplate
  }
};