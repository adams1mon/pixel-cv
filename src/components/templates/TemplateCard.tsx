import { Check } from "lucide-react";
import { TemplateConfig } from "./template-registry";

// src/components/cv/sections/template/TemplateCard.tsx
interface TemplateCardProps {
  template: TemplateConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={`
        p-4 border-2 rounded-lg cursor-pointer transition-all
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={onSelect}
    >
      <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
        {template.preview ? (
          <img src={template.preview} alt={template.name} className="w-full h-full object-cover rounded" />
        ) : (
          <div className="text-gray-400 text-sm">Preview coming soon</div>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
      <p className="text-sm text-gray-600">{template.description}</p>
      
      {isSelected && (
        <div className="mt-2 flex items-center text-blue-600 text-sm">
          <Check className="w-4 h-4 mr-1" />
          Selected
        </div>
      )}
    </div>
  );
};