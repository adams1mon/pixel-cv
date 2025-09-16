'use client';

import React, { useMemo } from 'react';
import { CVData } from '../../types/cv-data';
import { HandlebarsTemplate } from '../../types/handlebars-template';
import { HandlebarsTemplateRenderer } from '../../services/HandlebarsRenderer';

interface CVPreviewProps {
  cvData: CVData;
  template: HandlebarsTemplate;
  className?: string;
}

// Create a singleton renderer instance for performance
const renderer = new HandlebarsTemplateRenderer();

export const CVPreview: React.FC<CVPreviewProps> = ({
  cvData,
  template,
  className = ""
}) => {
  // Memoize the rendered HTML to avoid unnecessary re-renders
  const renderedHTML = useMemo(() => {
    try {
      return renderer.renderWithStyles(cvData, template);
    } catch (error) {
      console.error('Template preview error:', error);
      return `
        <div style="
          padding: 2rem;
          text-align: center;
          color: #ef4444;
          border: 2px dashed #ef4444;
          border-radius: 8px;
          margin: 1rem;
        ">
          <h3>Preview Error</h3>
          <p>Failed to render template: ${template.name}</p>
          <small>${error instanceof Error ? error.message : 'Unknown error'}</small>
        </div>
      `;
    }
  }, [cvData, template]);

  // TODO: remove
  // Debug info (can be removed in production)
  const debugInfo = useMemo(() => ({
    templateId: template.id,
    templateName: template.name,
    cacheSize: renderer.getCacheSize(),
    cvData: cvData,
  }), [cvData, template]);

  // Log debug info in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CVPreview Debug:', debugInfo);
    }
  }, [debugInfo]);

  // TODO: use shadow dom here, isolate styles
  return (
    <div 
      className={`template-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
};

// Higher-order component for error boundary

// TODO: this is NOT an error boundary, it's only a suspense (?)
interface CVPreviewWithErrorBoundaryProps extends CVPreviewProps {
  fallback?: React.ReactNode;
}

export const CVPreviewWithErrorBoundary: React.FC<CVPreviewWithErrorBoundaryProps> = ({
  fallback,
  ...props
}) => {
  return (
    <React.Suspense fallback={
      fallback || (
        <div className="template-loading" style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          Loading template...
        </div>
      )
    }>
      <CVPreview {...props} />
    </React.Suspense>
  );
}; 