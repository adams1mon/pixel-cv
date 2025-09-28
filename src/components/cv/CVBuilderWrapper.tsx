'use client';

import React from 'react';
import { UIProvider } from '../../contexts/UIContext';

import dynamic from 'next/dynamic';

const CVBuilder = dynamic(
  () => import("./CVBuilder").then(m => m.CVBuilder),
  {
    ssr: false,
  }
);
// Main content component that uses the CV context

// Main export component wrapped with CVProvider and UIProvider
export const CVBuilderWrapper: React.FC = () => {
  return (
    <UIProvider>
      <CVBuilder />
    </UIProvider>
  );
};