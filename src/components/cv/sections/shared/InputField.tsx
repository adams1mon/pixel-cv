'use client';

import React, { ReactNode } from 'react';

interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number';
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  maxLength?: number;
  icon?: ReactNode;
  disabled?: boolean;
  rows?: number; // For textarea
  multiline?: boolean; // Convert to textarea
  className?: string;
  containerClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  helpText,
  required = false,
  maxLength,
  icon,
  disabled = false,
  rows = 3,
  multiline = false,
  className = '',
  containerClassName = '',
}) => {
  const baseInputClasses = `
    w-full px-3 py-2 mt-1
    text-black bg-white
    border border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    placeholder-gray-500
    disabled:bg-gray-100 disabled:text-gray-500
    ${className}
  `;

  const labelClasses = `
    block text-sm font-medium text-gray-700 
    ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && 
        <label className={labelClasses}>
          {icon && <span className="inline-flex items-center">{icon}</span>}
          {label}
        </label>
      }
      
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={`${baseInputClasses} resize-vertical`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={baseInputClasses}
        />
      )}
      
      {(helpText || maxLength) && (
        <div className="flex justify-between items-start mt-1">
          {helpText && (
            <p className="text-xs text-gray-500">{helpText}</p>
          )}
          
          {maxLength && (
            <p className="text-xs text-gray-400">
              {value.length} / {maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Specialized components for common use cases
export const EmailField: React.FC<Omit<InputFieldProps, 'type'>> = (props) => (
  <InputField {...props} type="email" />
);

export const PhoneField: React.FC<Omit<InputFieldProps, 'type'>> = (props) => (
  <InputField {...props} type="tel" />
);

export const UrlField: React.FC<Omit<InputFieldProps, 'type'>> = (props) => (
  <InputField {...props} type="url" />
);

export const TextArea: React.FC<Omit<InputFieldProps, 'multiline'>> = (props) => (
  <InputField {...props} multiline={true} />
); 