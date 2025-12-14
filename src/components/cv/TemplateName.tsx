import { useCVStore } from "@/stores/cv-store";
import { TEMPLATE_REGISTRY } from "../templates/template-registry";

export function TemplateName() {

  const template = useCVStore(s => s.selectedTemplate);

  return (
    <p
      className="text-sm text-gray-500"
    >
      template: {TEMPLATE_REGISTRY[template].name}
    </p>
  )
}