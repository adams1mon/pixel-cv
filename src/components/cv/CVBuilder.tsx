'use client';

import React, { useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useCV } from '../../contexts/CVContext';
import { Sidebar } from './Sidebar';
import { SectionRouter } from './SectionRouter';
import { ModernReactPdf } from '../templates/ModernReactPdf';
import { jsonResumeSample } from './jsonresume-sample';

import { pdf } from '@react-pdf/renderer';


import dynamic from 'next/dynamic';
import { setupFonts } from './load-fonts';
import { clsx } from 'clsx';

const CanvasPdfPreview = dynamic(
  () => import("./CanvasPdfPreview").then(m => m.CanvasPdfPreview),
);

setupFonts();

const headerSize = 40;

// Main content component that uses the CV context
export const CVBuilder: React.FC = () => {
  const { cvData, importFromJson } = useCV();
  
  // Debounced PDF document state
  const [debouncedCvDoc, setDebouncedCvDoc] = React.useState<React.ReactElement<any>>(
    <ModernReactPdf data={cvData} />
  );

  // Blob state generated imperatively
  const [pdfBlob, setPdfBlob] = React.useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [genError, setGenError] = React.useState<unknown>(null);

  useEffect(() => {
    console.log("cv data update");
  }, [cvData]);

  // Debounce PDF document creation to prevent UI blocking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedCvDoc(<ModernReactPdf data={cvData} />);
    }, 400); // 300ms debounce for responsive feel

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  useEffect(() => {
    let cancelled = false;
    async function generate() {
      if (!debouncedCvDoc) return;
      try {
        setIsGenerating(true);
        setGenError(null);
        const blob = await pdf(debouncedCvDoc).toBlob();
        if (!cancelled) setPdfBlob(blob);
      } catch (err) {
        setGenError(err);
      } finally {
        setIsGenerating(false);
      }
    }
    generate();
    return () => {
      cancelled = true;
    };
  }, [debouncedCvDoc]);

  // Download function using existing PDF blob
  const downloadPdf = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cvData.metadata.title || 'CV'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
                onClick={() => importFromJson(JSON.stringify(jsonResumeSample))}
                className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
              >
                Load Sample
              </button>

              <button 
                onClick={downloadPdf}
                disabled={!!(isGenerating || genError || !pdfBlob)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1 text-white text-sm font-medium rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors",
                  isGenerating || genError || !pdfBlob ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isGenerating ?
                <Loader2 className="w-4 h-4 animate-spin" />
                :
                <Download className="w-4 h-4" />
                }
                Download CV
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
            pdfInstance={{
              blob: pdfBlob,
              loading: isGenerating,
              error: genError,
              document: debouncedCvDoc,
            }}
            // width={300}
            initialScale={1}
          />
        </div>
      </main>
    </div>
  );
};
