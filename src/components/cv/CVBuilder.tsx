'use client';

import React, { useEffect, useMemo } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { CVProvider, useCV } from '../../contexts/CVContext';
import { UIProvider } from '../../contexts/UIContext';
import { modernHandlebarsTemplate } from '../../types/handlebars-template';
import { Sidebar } from './Sidebar';
import { SectionRouter } from './SectionRouter';
import { ModernReactPdf } from '../templates/ModernReactPdf';
import { generateAndDownloadPdf } from '../../services/exportPdf';


import dynamic from 'next/dynamic';
import { setupFonts } from './load-fonts';

const CanvasPdfPreview = dynamic(
  () => import("./CanvasPdfPreview").then(m => m.CanvasPdfPreview),
  {
    loading: () => <div>Loading...</div>
  }
);

// import { Document } from 'react-pdf';
const Document = dynamic(
  () => import("react-pdf").then(m => m.Document),
  {
    ssr: false,
    loading: () => (
      <button disabled>
        <Loader2 className='animate-spin mr-2'/>
        Loading...
      </button> 
    )
  }
)

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then(m => m.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <button disabled>
        <Loader2 className='animate-spin mr-2'/>
        Loading...
      </button> 
    )
  }
)

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then(m => m.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button disabled>
        <Loader2 className='animate-spin mr-2'/>
        Loading...
      </button> 
    )
  }
)

setupFonts();

const headerSize = 40;

// Main content component that uses the CV context
const CVBuilderLayout: React.FC = () => {
  const { cvData } = useCV();

  useEffect(() => {
    console.log("cv data update");
  }, [cvData]);

  // Keep handlebars template import for reference only
  const template = useMemo(() => modernHandlebarsTemplate, []);
  const [exporting, setExporting] = React.useState(false);

  // TODO: loading indicator
  // TODO: solve dommatrix missing 

  return (
    <div className="handlebars-prototype min-h-screen bg-gray-100">
      {/* Header */}
      <header className={`bg-white shadow-sm border-b h-${headerSize}`}>
        <div className="max-w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">CV Builder</h1>
              <p className="text-gray-600 mt-1">
                Sidebar navigation with section-based editing
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Template: React-PDF (Modern)</span>
              <span>•</span>
              <span>Auto-preview enabled</span>
              <span>•</span>
              <button
                onClick={async () => {
                  try {
                    setExporting(true);
                    await generateAndDownloadPdf({ data: cvData });
                  } catch (e) {
                    console.error('Export PDF failed', e);
                  } finally {
                    setExporting(false);
                  }
                }}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                disabled={exporting}
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Exporting…' : 'Export PDF'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <main className={`flex h-[100vh]`}>
        {/* Left Side - Sidebar */}
        <Sidebar />

        {/* Middle - Section Editor */}
        <div className="h-full max-w-xl flex-1 overflow-hidden p-2">
          <SectionRouter />
        </div>

        {/* Right Side - React-PDF Preview */}
        <div className="h-full flex-1 p-2 shadow-sm overflow-hidden bg-gray-500">
          <CanvasPdfPreview
            pdfDocument={<ModernReactPdf data={cvData} /> as any}
            // width={300}
            initialScale={1}
          />
        </div>
      </main>

    </div>
  );
};

// Main export component wrapped with CVProvider and UIProvider
export const CVBuilder: React.FC = () => {
  return (
    <CVProvider>
      <UIProvider>
        <CVBuilderLayout />
      </UIProvider>
    </CVProvider>
  );
};