import { EnrichedJsonResume } from "@/types/jsonresume";
import { Check } from "lucide-react";

interface ResumeCardProps {
  resume: EnrichedJsonResume;
  isSelected: boolean;
  onSelect: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ 
  resume, 
  isSelected, 
  onSelect 
}) => {
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("en-UK");
    } catch (e) {
      console.warn("error parsing date", e);
      return timestamp
    }
  };

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
      {/* todo: show template? */}
      
      <h3 className="font-semibold text-gray-900 mb-1">
        {resume._metadata.name || resume.basics.name || 'Untitled Resume'}
      </h3>
      <div className="font-medium text-gray-700 mb-3">{resume.basics.name || 'Untitled Resume'}</div>
      <p className="text-sm text-gray-600 mb-2">
        {resume.basics.label || 'No position specified'}
      </p>
      <div className="text-xs text-gray-500">
        Updated: {formatDate(resume._metadata.updatedAt)}
      </div>
      
      {isSelected && (
        <div className="mt-2 flex items-center text-blue-600 text-sm">
          <Check className="w-4 h-4 mr-1" />
          Selected
        </div>
      )}
    </div>
  );
};