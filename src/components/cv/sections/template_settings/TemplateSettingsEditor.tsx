import { useCVStore } from "@/stores/cv-store";
import { EditorHeader } from "../shared/EditorHeader";
import { TEMPLATE_REGISTRY } from "../../../templates/template-registry";
import { TemplateCard } from "./TemplateCard";

export const TemplateSettingsEditor: React.FC = () => {
  const selectedTemplate = useCVStore(s => s.data)._metadata.templateId;
  const setSelectedTemplate = useCVStore(s => s.setSelectedTemplate);
  
  return (
    <div className="section-editor max-w-4xl">
      <EditorHeader
        title="Template Settings"
        subtitle="Customize your CV template"
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

      <TemplateSettings />
      <div className="mt-12 flex flex-col m-auto text-center">
        <p className="text-slate-700 text-md font-bold text-center">
          More templates and options coming soon! 🚧
        </p>

        <a className="mt-8 underline text-blue-400 text-md font-normal" href="https://x.com/@slimptr" target="_blank">DM me for any requests.</a>
        <p className="mt-2 text-black text-md font-normal">My site: <a className="text-blue-400 underline" href="https://slimptr.blog" target="_blank">slimptr.blog</a></p>
      </div>
    </div>
  );
};

function TemplateSettings() {

  const pageWrap = useCVStore(s => s.pageWrap);
  const setPageWrap = useCVStore(s => s.setPageWrap);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Options</h2>
      <div className="text-gray-600 text-sm px-2 py-2 flex flex-col gap-y-2">

        <div className="flex items-center gap-x-2">
          <label 
            htmlFor="page-wrap" 
          >
            Enable PDF page wrapping
          </label>
          <input
            checked={pageWrap}
            id="page-wrap"
            type="checkbox"
            onChange={e => setPageWrap(e.target.checked)}
            className="p-0 m-0"
          />
        </div>
      </div>
    </div>
  );
}