'use client';

import React, { useCallback } from 'react';
import { EnrichedJsonResumeReference } from '@/types/jsonresume';
import { IdCard, Mail, FileText, User2 } from 'lucide-react';
import { InputField, EmailField, PhoneField, TextArea } from '../shared/InputField';
import { ExpandableEntry } from '../shared/ExpandableEntry';

interface ReferenceEntryProps {
  referenceItem: EnrichedJsonResumeReference;
  index: number;
  onReferenceChange: (referenceItem: EnrichedJsonResumeReference) => void;
  onRemove: () => void;
}

export const ReferenceEntry: React.FC<ReferenceEntryProps> = ({
  referenceItem,
  index,
  onReferenceChange,
  onRemove
}) => {
  const updateField = (field: keyof EnrichedJsonResumeReference, value: any) => {
    onReferenceChange({
      ...referenceItem,
      [field]: value
    });
  };

  const title = referenceItem.name || 'New Reference';
  const subtitle = referenceItem.email || referenceItem.phone || 'Contact not set';

  const toggleVisibility = useCallback(() => {
    onReferenceChange({
      ...referenceItem,
      _visible: !referenceItem._visible
    });
  }, [referenceItem, onReferenceChange]);

  return (
    <ExpandableEntry
      icon={<IdCard className="w-5 h-5" />}
      title={title}
      subtitle={subtitle}
      defaultExpanded={index === 0}
      onRemove={onRemove}
      removeAriaLabel="Remove reference"
      visible={referenceItem._visible}
      onToggleVisible={toggleVisibility}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <User2 className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            value={referenceItem.name || ''}
            onChange={(value) => updateField('name', value)}
            placeholder="e.g., John Smith"
            required={true}
          />
          
          <InputField
            label="Position"
            value={referenceItem.reference || ''}
            onChange={(value) => updateField('reference', value)}
            placeholder="e.g., Former Manager at Company"
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <div className="flex items-center mb-1">
          <Mail className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Contact Details</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmailField
            label="Email"
            value={referenceItem.email || ''}
            onChange={(value) => updateField('email', value)}
            placeholder="john.smith@company.com"
          />
          
          <PhoneField
            label="Phone"
            value={referenceItem.phone || ''}
            onChange={(value) => updateField('phone', value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-3">
        <div className="flex items-center mb-1">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-900">Additional Notes</h4>
        </div>
        <TextArea
          value={referenceItem.reference || ''}
          onChange={(value) => updateField('reference', value)}
          placeholder="Any additional context about your relationship or working experience with this reference..."
          rows={3}
        />
      </div>
    </ExpandableEntry>
  );
}; 