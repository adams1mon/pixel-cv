'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';

export const SummarySectionEditor: React.FC = () => {
  const { cvData, updateSummary } = useCV();

  // Helper to update summary
  const handleSummaryUpdate = (field: keyof typeof cvData.sections.summary, value: any) => {
    updateSummary({
      ...cvData.sections.summary,
      [field]: value
    });
  };

  return (
    <div className="section-editor">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-sm text-gray-600">A brief overview of your professional background and key strengths.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Summary</label>
          <textarea
            value={cvData.sections.summary.content}
            onChange={(e) => handleSummaryUpdate('content', e.target.value)}
            rows={6}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Write a brief professional summary that highlights your key skills, experience, and career objectives..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Tip: Keep it concise (2-3 sentences) and focus on your most relevant qualifications.
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="summary-visible"
              type="checkbox"
              checked={cvData.sections.summary.isVisible}
              onChange={(e) => handleSummaryUpdate('isVisible', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="summary-visible" className="text-sm font-medium text-gray-700">
              Show summary section
            </label>
            <p className="text-xs text-gray-500">
              Uncheck to hide this section from your CV while keeping the content saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 