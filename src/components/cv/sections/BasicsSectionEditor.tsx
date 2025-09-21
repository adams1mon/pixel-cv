'use client';

import React, { useState } from 'react';
import { useCV } from '../../../contexts/CVContext';
import { JsonResumeProfile } from '../../../types/jsonresume';
import { Plus, Trash2, ChevronDown, ChevronRight, Globe, Mail, Phone, MapPin, User, Briefcase } from 'lucide-react';
import { InputField, EmailField, PhoneField, UrlField, TextArea } from './shared/InputField';

const COMMON_SOCIAL_NETWORKS = [
  'LinkedIn',
  'GitHub',
  'X/Twitter',
  'Portfolio',
  'Blog',
  'Instagram',
  'Facebook',
  'YouTube',
  'Stack Overflow',
  'Behance',
  'Dribbble',
  'Other'
];

export const BasicsSectionEditor: React.FC = () => {
  const { cvData, updateBasics } = useCV();
  const [expandedSections, setExpandedSections] = useState({
    location: false,
    profiles: true
  });

  const basics = cvData.basics;

  // Toggle expandable sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper to update basics fields
  const handleBasicsUpdate = (updates: Partial<typeof basics>) => {
    updateBasics({
      ...basics,
      ...updates
    });
  };

  // Helper to update nested location fields
  const handleLocationUpdate = (field: string, value: string) => {
    handleBasicsUpdate({
      location: {
        ...basics.location,
        [field]: value
      }
    });
  };

  // Profile management
  const addProfile = () => {
    const profiles = basics.profiles || [];
    const newProfile: JsonResumeProfile = {
      network: '',
      username: '',
      url: ''
    };
    handleBasicsUpdate({
      profiles: [...profiles, newProfile]
    });
  };

  const updateProfile = (index: number, updates: Partial<JsonResumeProfile>) => {
    const profiles = [...(basics.profiles || [])];
    profiles[index] = { ...profiles[index], ...updates };
    handleBasicsUpdate({ profiles });
  };

  const removeProfile = (index: number) => {
    const profiles = (basics.profiles || []).filter((_, i) => i !== index);
    handleBasicsUpdate({ profiles });
  };

  const profiles = basics.profiles || [];

  return (
    <div className="section-editor max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">
          Your core personal details, contact information, and professional summary.
        </p>
      </div>

      <div className="space-y-8">
        {/* Personal Identity Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Identity</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              value={basics.name || ''}
              onChange={(value) => handleBasicsUpdate({ name: value })}
              placeholder="e.g., John Doe"
              required={true}
            />
            
            <InputField
              label="Professional Title"
              value={basics.label || ''}
              onChange={(value) => handleBasicsUpdate({ label: value })}
              placeholder="e.g., Senior Software Engineer"
              helpText="Your current role or desired position"
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmailField
              label="Email"
              value={basics.email || ''}
              onChange={(value) => handleBasicsUpdate({ email: value })}
              placeholder="your.email@example.com"
              icon={<Mail className="inline w-4 h-4 mr-1" />}
            />
            
            <PhoneField
              label="Phone"
              value={basics.phone || ''}
              onChange={(value) => handleBasicsUpdate({ phone: value })}
              placeholder="+1 (555) 123-4567"
              icon={<Phone className="inline w-4 h-4 mr-1" />}
            />
          </div>
          
          <div className="mt-6">
            <UrlField
              label="Website"
              value={basics.url || ''}
              onChange={(value) => handleBasicsUpdate({ url: value })}
              placeholder="https://yourwebsite.com"
              icon={<Globe className="inline w-4 h-4 mr-1" />}
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            </div>
            <button
              type="button"
              onClick={() => toggleSection('location')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              {expandedSections.location ? (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Less details
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mr-1" />
                  More details
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="City"
              value={basics.location?.city || ''}
              onChange={(value) => handleLocationUpdate('city', value)}
              placeholder="e.g., San Francisco"
            />
            
            <InputField
              label="Region/State"
              value={basics.location?.region || ''}
              onChange={(value) => handleLocationUpdate('region', value)}
              placeholder="e.g., California"
            />
          </div>

          {/* Expandable detailed location fields */}
          {expandedSections.location && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
              <InputField
                label="Street Address"
                value={basics.location?.address || ''}
                onChange={(value) => handleLocationUpdate('address', value)}
                placeholder="123 Main Street"
              />
              
              <InputField
                label="Postal Code"
                value={basics.location?.postalCode || ''}
                onChange={(value) => handleLocationUpdate('postalCode', value)}
                placeholder="94102"
              />
              
              <InputField
                label="Country Code"
                value={basics.location?.countryCode || ''}
                onChange={(value) => handleLocationUpdate('countryCode', value)}
                placeholder="US"
                maxLength={2}
                helpText="2-letter ISO country code"
              />
            </div>
          )}
        </div>

        {/* Social Profiles Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Social Profiles</h3>
            </div>
            <button
              type="button"
              onClick={() => toggleSection('profiles')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              {expandedSections.profiles ? (
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
          </div>

          {expandedSections.profiles && (
            <>
              {profiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="mb-4">No social profiles added yet</p>
                  <button
                    type="button"
                    onClick={addProfile}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Social Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {profiles.map((profile, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Profile #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeProfile(index)}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                          aria-label="Remove profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                            <select
                              value={profile.network}
                              onChange={(e) => updateProfile(index, { network: e.target.value })}
                              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select network...</option>
                              {COMMON_SOCIAL_NETWORKS.map(network => (
                                <option key={network} value={network}>{network}</option>
                              ))}
                            </select>
                          </div>
                          
                          <InputField
                            label="Username"
                            value={profile.username || ''}
                            onChange={(value) => updateProfile(index, { username: value })}
                            placeholder="your-username"
                          />
                        </div>
                        
                        <UrlField
                          label="Profile URL"
                          value={profile.url}
                          onChange={(value) => updateProfile(index, { url: value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addProfile}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Another Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Professional Summary Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          </div>
          
          <TextArea
            label="Summary"
            value={basics.summary || ''}
            onChange={(value) => handleBasicsUpdate({ summary: value })}
            rows={6}
            placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives. Keep it concise but impactful..."
            helpText="Tip: 2-3 sentences focusing on your most relevant qualifications and career goals."
            maxLength={1000}
          />
        </div>
      </div>
    </div>
  );
}; 