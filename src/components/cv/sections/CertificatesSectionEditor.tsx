'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeCertificate, createEmptyCertificate } from '../../../types/jsonresume';
import { Plus, BadgeCheck } from 'lucide-react';
import { CertificateEntry } from './shared/CertificateEntry';

export const CertificatesSectionEditor: React.FC = () => {
  const { cvData, updateCertificates } = useCV();

  const certificates = cvData.certificates || [];

  // Certificates array management
  const addCertificate = () => {
    const newCertificate = createEmptyCertificate();
    const updatedCertificates = [...certificates, newCertificate];
    updateCertificates(updatedCertificates);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    updateCertificates(updatedCertificates);
  };

  const updateSingleCertificate = (index: number, updated: JsonResumeCertificate) => {
    const updatedCertificates = certificates.map((certItem, i) => 
      i === index ? updated : certItem
    );
    updateCertificates(updatedCertificates);
  };

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
        <p className="text-gray-600">
          Add your professional certifications and licenses.
        </p>
      </div>

      <div className="space-y-6">
        {certificates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BadgeCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications yet</h3>
            <p className="text-gray-600 mb-6">Add your first certificate to get started.</p>
            <button
              type="button"
              onClick={addCertificate}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Certificate
            </button>
          </div>
        ) : (
          <>
            {certificates.map((certificate, index) => (
              <CertificateEntry
                key={index}
                index={index}
                certificate={certificate}
                onCertificateChange={(updated) => updateSingleCertificate(index, updated)}
                onRemove={() => removeCertificate(index)}
              />
            ))}

            {/* Add New Certificate Button */}
            <button
              type="button"
              onClick={addCertificate}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Another Certificate
            </button>
          </>
        )}
      </div>
    </div>
  );
}; 