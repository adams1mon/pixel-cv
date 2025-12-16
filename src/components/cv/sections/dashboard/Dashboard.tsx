import { useCVStore } from "@/stores/cv-store";
import { ResumeCard } from "./ResumeCard";
import { EditorHeader } from "../shared/EditorHeader";

export const Dashboard: React.FC = () => {

  const resumes = useCVStore(s => s.resumes);
  const currentResumeId = useCVStore(s => s.currentResumeId);
  const setCurrentResumeId = useCVStore(s => s.selectResume);
  const createResume = useCVStore(s => s.createResume);
  const deleteResume = useCVStore(s => s.deleteResume);

  const resumeList = Object.values(resumes).sort((a, b) => (Date.parse(b._metadata.updatedAt) - Date.parse(a._metadata.updatedAt)));

  return (
    <div className="section-editor max-w-6xl">
      <EditorHeader
        title="Resume Dashboard"
        subtitle="Manage and switch between your resumes"
      />

      <div className="space-y-6">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => createResume()}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New CV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeList.map(resume => (
            <ResumeCard
              key={resume._metadata.id}
              resume={resume}
              isSelected={currentResumeId === resume._metadata.id}
              onSelect={() => setCurrentResumeId(resume._metadata.id)}
              onDelete={() => deleteResume(resume._metadata.id)}
            />
          ))}
        </div>

        {resumeList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resumes found</p>
            <p className="text-gray-400 text-sm mt-2">Create your first resume to get started</p>
          </div>
        )}
      </div>

      {/* TODO: duplicate? */}
    </div>
  );
};