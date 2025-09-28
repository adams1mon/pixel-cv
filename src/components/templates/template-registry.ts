import { JsonResume } from "@/types/jsonresume";
import { ModernReactPdf } from "./ModernReactPdf";
import { AlphaPdfTemplate } from "./AlphaPdfTemplate";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string; // base64 preview image
  component: React.ComponentType<{ data: JsonResume, pageWrap: boolean }>;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  'modern': {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional single-column layout',
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