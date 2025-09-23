'use client';

import React, { useState } from 'react';
import { JsonResumeReference } from '@/types/jsonresume';
import { IdCard, Mail, FileText, ChevronDown, ChevronRight, Trash2, User2 } from 'lucide-react';
import { InputField, EmailField, PhoneField, TextArea } from './InputField';

interface ReferenceEntryProps {
  referenceItem: JsonResumeReference;
  index: number;
  onReferenceChange: (referenceItem: JsonResumeReference) => void;
  onRemove: () => void;
}

export const ReferenceEntry: React.FC<ReferenceEntryProps> = ({
  referenceItem,
  index,
  onReferenceChange,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First entry expanded by default

  const updateField = (field: keyof JsonResumeReference, value: any) => {
    onReferenceChange({
      ...referenceItem,
      [field]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Entry Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <IdCard className="w-5 h-5 text-blue-600 mr-3" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {referenceItem.name || 'New Reference'}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {referenceItem.email || referenceItem.phone || 'Contact not set'}
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
              aria-label="Remove reference"
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
              <User2 className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Reference</h4>
            </div>
            <InputField
              label="Name"
              value={referenceItem.name || ''}
              onChange={(value) => updateField('name', value)}
              placeholder="e.g., Jane Doe"
              required={true}
            />
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Contact</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmailField
                label="Email"
                value={referenceItem.email || ''}
                onChange={(value) => updateField('email', value)}
                placeholder="jane.doe@example.com"
              />

              <PhoneField
                label="Phone"
                value={referenceItem.phone || ''}
                onChange={(value) => updateField('phone', value)}
                placeholder="e.g., +1 555-123-4567"
              />
            </div>
          </div>

          {/* Reference Text */}
          <div className="space-y-3">
            <div className="flex items-center mb-1">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Reference Text</h4>
            </div>
            <TextArea
              value={referenceItem.reference || ''}
              onChange={(value) => updateField('reference', value)}
              placeholder="Recommendation or testimonial from the referee..."
              rows={4}
            />
          </div>
        </div>
      )}
    </div>
  );
}; 