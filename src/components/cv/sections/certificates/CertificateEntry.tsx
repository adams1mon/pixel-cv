'use client';

import React, { useCallback, useState } from 'react';
import { EnrichedJsonResumeCertificate } from '@/types/jsonresume';
import { BadgeCheck, Calendar, FileText, FileBadge } from 'lucide-react';
import { InputField, UrlField, TextArea } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface CertificateEntryProps {
  certificate: EnrichedJsonResumeCertificate;
  index: number;
  onCertificateChange: (certificate: EnrichedJsonResumeCertificate) => void;
  onRemove: () => void;
}

export const CertificateEntry: React.FC<CertificateEntryProps> = ({
  certificate,
  index,
  onCertificateChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof EnrichedJsonResumeCertificate, value: any) => {
    onCertificateChange({
      ...certificate,
      [field]: value
    });
  };

  const toggleVisibility = useCallback(() => {
    onCertificateChange({
      ...certificate,
      _visible: !certificate._visible
    });
  }, [certificate, onCertificateChange]);

  return (
    <ExpandableEntry
      icon={<FileBadge className="w-5 h-5" />}
      title={certificate.name || 'New Certificate'}
      subtitle={
        (certificate.issuer ? certificate.issuer : 'Issuer not set') + 
        (certificate.date ? ` • ${certificate.date}` : '')
      }
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove certificate"
      visible={certificate._visible !== false}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <BadgeCheck className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Certificate</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            value={certificate.name || ''}
            onChange={(value) => updateField('name', value)}
            placeholder="e.g., AWS Certified Solutions Architect"
            required={true}
          />
          
          <InputField
            label="Issuer"
            value={certificate.issuer || ''}
            onChange={(value) => updateField('issuer', value)}
            placeholder="e.g., Amazon Web Services"
            required={true}
          />
        </div>
      </div>

      {/* Date & Links */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Date & Links</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Date"
            value={certificate.date || ''}
            onChange={(value) => updateField('date', value)}
            placeholder="YYYY-MM-DD"
          />
          
          <UrlField
            label="Website"
            value={certificate.website || ''}
            onChange={(value) => updateField('website', value)}
            placeholder="https://issuer.com"
          />

          <UrlField
            containerClassName="col-span-1 md:col-span-2"
            label="Verification URL"
            value={certificate.url || ''}
            onChange={(value) => updateField('url', value)}
            placeholder="https://verify-certificate.com/xyz"
          />
        </div>
      </div>

      {/* Notes (Optional) */}
      <div className="space-y-3">
        <div className="flex items-center mb-1">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Notes</h4>
        </div>
        <TextArea
          value={(certificate as any).notes || ''}
          onChange={(value) => updateField('summary' as any, value)}
          placeholder="Optional: Add notes such as credential ID, specialization, or scope..."
          rows={3}
        />
      </div>
    </ExpandableEntry>
  );
}; 