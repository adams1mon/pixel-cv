import { EnrichedJsonResume } from "@/types/jsonresume";
import { Check, Trash2 } from "lucide-react";

interface ResumeCardProps {
  resume: EnrichedJsonResume;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ 
  resume, 
  isSelected, 
  onSelect,
  onDelete, 
}) => {

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card selection
    if (window.confirm(`Are you sure you want to delete "${resume._metadata.name || resume.basics.name || 'this resume'}"?`)) {
      onDelete();
    }
  };

  return (
    <div 
      className={`
        p-4 border-2 rounded-lg cursor-pointer transition-all relative
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={onSelect}
    >
      {/* Delete button */}
      {!isSelected &&
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 hover:cursor-pointer rounded transition-colors"
          title="Delete resume"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      }

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

function formatDate(timestamp: string) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString("en-UK");
  } catch (e) {
    console.warn("error parsing date", e);
    return timestamp
  }
};