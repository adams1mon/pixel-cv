'use client';

import React from 'react';
import { useCV } from '../../../contexts/CVContext';

export const HeaderSectionEditor: React.FC = () => {
  const { cvData, updateHeader } = useCV();

  // Helper to update header fields
  const handleHeaderUpdate = (field: string, value: string) => {
    const fieldParts = field.split('.');
    let updatedHeader = { ...cvData.sections.header };
    
    if (fieldParts.length === 2) {
      // Nested field like 'personalInfo.firstName'
      const [section, subField] = fieldParts;
      updatedHeader = {
        ...updatedHeader,
        [section]: {
          ...updatedHeader[section as keyof typeof updatedHeader],
          [subField]: value
        }
      };
    } else {
      // Direct field
      updatedHeader = { ...updatedHeader, [field]: value };
    }
    
    updateHeader(updatedHeader);
  };

  return (
    <div className="section-editor">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-sm text-gray-600">Basic contact and personal details for your CV header.</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={cvData.sections.header.personalInfo.firstName}
              onChange={(e) => handleHeaderUpdate('personalInfo.firstName', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={cvData.sections.header.personalInfo.lastName}
              onChange={(e) => handleHeaderUpdate('personalInfo.lastName', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Professional Title</label>
            <input
              type="text"
              value={cvData.sections.header.personalInfo.title}
              onChange={(e) => handleHeaderUpdate('personalInfo.title', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <input
              type="text"
              value={cvData.sections.header.personalInfo.location}
              onChange={(e) => handleHeaderUpdate('personalInfo.location', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={cvData.sections.header.contact.email}
              onChange={(e) => handleHeaderUpdate('contact.email', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              value={cvData.sections.header.contact.phone}
              onChange={(e) => handleHeaderUpdate('contact.phone', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Website</label>
            <input
              type="url"
              value={cvData.sections.header.contact.website || ''}
              onChange={(e) => handleHeaderUpdate('contact.website', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://your-website.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 