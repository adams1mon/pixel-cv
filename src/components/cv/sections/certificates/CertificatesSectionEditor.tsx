'use client';

import React from 'react';
import { JsonResumeCertificate, createEmptyCertificate } from '../../../../types/jsonresume';
import { Plus, BadgeCheck } from 'lucide-react';
import { CertificateEntry } from './CertificateEntry';
import { useCVStore } from '@/stores/cv-store';
import { EditorHeader } from '../shared/EditorHeader';
import { ListPlaceholder } from '../shared/ListPlaceholder';
import { ListItems } from '../shared/ListItems';

export const CertificatesSectionEditor: React.FC = () => {

  const certificates = useCVStore(s => s.data.certificates || []);
  const updateCertificates = useCVStore(s => s.updateCertificates);

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
                  onCertificateChange={(updated) => updateSingleCertificate(index, updated)}
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