'use client';

import React from 'react';
import { createEmptyCertificate } from '../../../../types/jsonresume';
import { BadgeCheck } from 'lucide-react';
import { CertificateEntry } from './CertificateEntry';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';

export const CertificatesSectionEditor: React.FC = () => {

  const certificates = useCVStore(s => s.data.certificates || []);
  const updateSection = useCVStore(s => s.updateSection);
  const updateSectionItem = useCVStore(s => s.updateSectionItem);

  // Certificates array management
  const addCertificate = () => {
    const newCertificate = createEmptyCertificate();
    const updatedCertificates = [...certificates, newCertificate];
    updateSection("certificates", updatedCertificates);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    updateSection("certificates", updatedCertificates);
  };

  return (
    <div className="section-editor max-w-4xl">

      <EditorHeader
        title='Certifications'
        subtitle='Add your professional certifications and licenses.'
      />

      <div className="space-y-6">
        {certificates.length === 0 ? (

          <ListPlaceholder 
            buttonText='Add First Certificate'
            addItem={addCertificate}
            icon={
              <BadgeCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            }
            title='No certifications yet'
            subtitle='Add your first certificate to get started.'
          />

        ) : (

          <ListItems
            addItem={addCertificate}
            buttonText='Add Another Certificate'
            listItems={
              certificates.map((certificate, index) => (
                <CertificateEntry
                  key={index}
                  index={index}
                  certificate={certificate}
                  onCertificateChange={(updated) => updateSectionItem("certificates", index, updated)}
                  onRemove={() => removeCertificate(index)}
                />
              ))
            }
          />
        )}

      </div>
    </div>
  );
}; 