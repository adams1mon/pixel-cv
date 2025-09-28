import { useCVStore } from "@/stores/cv-store";
import { EditorHeader } from "../cv/sections/shared/EditorHeader";
import { TEMPLATE_REGISTRY } from "./template-registry";
import { TemplateCard } from "./TemplateCard";

// src/components/cv/sections/template/TemplateSettingsEditor.tsx
export const TemplateSettingsEditor: React.FC = () => {
  const selectedTemplate = useCVStore(s => s.selectedTemplate);
  const setSelectedTemplate = useCVStore(s => s.setSelectedTemplate);
  
  return (
    <div className="section-editor max-w-4xl">
      <EditorHeader
        title="Template Settings"
        subtitle="Choose and customize your CV template"
      />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(TEMPLATE_REGISTRY).map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={() => setSelectedTemplate(template.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
