'use client';

import React, { useState } from 'react';
import { JsonResumeCertificate } from '@/types/jsonresume';
import { BadgeCheck, Calendar, Globe, Link, FileText, Trash2, ChevronDown, ChevronRight, FileBadge } from 'lucide-react';
import { InputField, UrlField, TextArea } from './InputField';

interface CertificateEntryProps {
  certificate: JsonResumeCertificate;
  index: number;
  onCertificateChange: (certificate: JsonResumeCertificate) => void;
  onRemove: () => void;
}

export const CertificateEntry: React.FC<CertificateEntryProps> = ({
  certificate,
  index,
  onCertificateChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumeCertificate, value: any) => {
    onCertificateChange({
      ...certificate,
      [field]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <FileBadge className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {certificate.name || 'New Certificate'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {certificate.issuer ? certificate.issuer : 'Issuer not set'}
                {certificate.date ? ` • ${certificate.date}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
              aria-label="Remove certificate"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Entry Details */}
      {isExpanded && (
        <div className="p-6 space-y-8">
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
        </div>
      )}
    </div>
  );
}; 