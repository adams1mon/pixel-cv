'use client';

import React, { useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SectionRouter } from './SectionRouter';
import { jsonResumeSample } from './jsonresume-sample';
import dynamic from 'next/dynamic';
import { setupFonts } from './load-fonts';
import { clsx } from 'clsx';
import { initializeCVStore, useCVStore } from '@/stores/cv-store';
import { TEMPLATE_REGISTRY } from '../templates/template-registry';

const CanvasPdfPreview = dynamic(
  () => import("./CanvasPdfPreview").then(m => m.CanvasPdfPreview),
);

setupFonts();


// Main content component that uses the CV context
export const CVBuilder: React.FC = () => {
  
  // Initialize store on mount
  useEffect(() => {
    initializeCVStore();
  }, []);

  console.count("cv builder render");

  // TODO: loading indicator
  // TODO: solve dommatrix missing 

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

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
            initialScale={1}
          />
        </div>
      </main>
    </div>
  );
};

const headerHeight = 30;

function Header() {

  const importFromJson = useCVStore(s => s.importFromJson);
  const template = useCVStore(s => s.selectedTemplate);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result as string;
        // Validate that it's valid JSON
        JSON.parse(fileContent);
        importFromJson(fileContent);
      } catch (error) {
        alert('Invalid JSON file. Please upload a valid JSON Resume file.');
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className={`bg-white shadow-sm border-b h-${headerHeight}`}>
      <div className="max-w-full px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">CV Builder</h1>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>template: {TEMPLATE_REGISTRY[template].name}</span>
            <span>•</span>
            <TemplateSettings />

            <button
              onClick={() => importFromJson(JSON.stringify(jsonResumeSample))}
              className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
            >
              Load Sample
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handleButtonClick}
              className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
            >
              Import JSON
            </button>
            <GeneratePdfButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function GeneratePdfButton() {

  const cvData = useCVStore(s => s.data);
  const pdfBlob = useCVStore(s => s.pdfBlob);
  const pdfGenerating = useCVStore(s => s.pdfGenerating);
  const pdfError = useCVStore(s => s.pdfError);

  // Download function using existing PDF blob
  const downloadPdf = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cvData.metadata?.title || 'CV'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button 
      onClick={downloadPdf}
      disabled={!!(pdfGenerating || pdfError || !pdfBlob)}
      className={clsx(
        "flex items-center gap-2 px-3 py-1 text-white text-sm font-medium rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors",
        pdfGenerating || pdfError || !pdfBlob ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {pdfGenerating ?
      <Loader2 className="w-4 h-4 animate-spin" />
      :
      <Download className="w-4 h-4" />
      }
      Download CV
    </button>
  )
}

function TemplateSettings() {

  const pageWrap = useCVStore(s => s.pageWrap);
  const setPageWrap = useCVStore(s => s.setPageWrap);

  return (
    <div className="flex items-center gap-x-2">
      <label htmlFor="page-wrap">
        Enable PDF page wrapping
      </label>
      <input
        checked={pageWrap}
        id="page-wrap"
        type="checkbox"
        onChange={e => setPageWrap(e.target.checked)}
      />
    </div>
  )
}