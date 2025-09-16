'use client';

import React from 'react';
import { usePDF } from '@react-pdf/renderer';

interface ReactPdfPreviewProps {
  document: any;
  className?: string;
  height?: number;
}

// Minimal, toolbar-free preview: use usePDF to generate blob url, render via <object>
export const ReactPdfPreview: React.FC<ReactPdfPreviewProps> = ({ document, className = '', height = 600 }) => {
  const [instance] = usePDF({ document });

  if (instance.loading) {
    return (
      <div className={className}>
        <div className="p-3 text-sm text-gray-600">Rendering PDF...</div>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className={className}>
        <div className="p-3 text-sm text-red-600">{String(instance.error)}</div>
      </div>
    );
  }

  if (!instance.url) {
    return (
      <div className={className}>
        <div className="p-3 text-sm text-gray-600">Preparing preview...</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <object
        data={instance.url}
        type="application/pdf"
        width="100%"
        height={height}
        style={{ border: 'none' }}
      >
        <embed src={instance.url} type="application/pdf" width="100%" height={height} />
      </object>
    </div>
  );
}; 