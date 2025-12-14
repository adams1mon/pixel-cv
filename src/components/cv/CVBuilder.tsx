'use client';

import React, { useCallback, useEffect } from 'react';
import { Download, Loader2, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SectionRouter } from './SectionRouter';
import { jsonResumeSample } from './jsonresume-sample';
import dynamic from 'next/dynamic';
import { setupFonts } from './load-fonts';
import { clsx } from 'clsx';
import { initializeCVStore, useCVStore } from '@/stores/cv-store';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileActionsDropdown } from './mobile/HeaderMobileDropdown';
import { TemplateName } from './TemplateName';
import { useUI } from '@/contexts/UIContext';
import { MobileBottomTabs } from './mobile/MobileBottomTabs';

const CanvasPdfPreview = dynamic(
  () => import("./CanvasPdfPreview").then(m => m.CanvasPdfPreview),
);

setupFonts();


// Main content component that uses the CV context
export const CVBuilder: React.FC = () => {

  const isMobile = useIsMobile();
  const { activeMobileTab } = useUI();
  
  // Initialize store on mount
  useEffect(() => {
    initializeCVStore();
  }, []);

  const renderMobileContent = useCallback(() => {
    switch (activeMobileTab) {
      case 'editor':
        return (
          <div className="h-full max-w-xl mx-auto overflow-hidden p-2 pb-16">
            <SectionRouter />
          </div>
        );
      case 'preview':
        return (
          <div className="h-full p-2 shadow-sm overflow-hidden bg-gray-500 pb-16">
            <CanvasPdfPreview
              initialScale={1}
            />
          </div>
        );
      default:
        return null;
    }
  }, [activeMobileTab]);

  console.count("cv builder render");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main Content - Three Column Layout */}
      <div className="flex h-[100vh] overflow-auto">
        {/* Left Side - Sidebar */}
        <Sidebar />

        {isMobile ?

          // Single-column on mobile/tablet
          <div className="h-full w-full">
            {renderMobileContent()}
          </div>
          :
          <>
            {/* Desktop 3 column layout */}
            {/* Middle - Section Editor */}
            <div className="h-full max-w-6xl flex-1 overflow-hidden p-2">
              <SectionRouter />
            </div>

            {/* Right Side - React-PDF Preview */}
            <div className="h-full flex-1 p-2 shadow-sm overflow-hidden bg-gray-500">
              <CanvasPdfPreview
                initialScale={1}
              />
            </div>
          </>
        }
      </div>

      {/* Mobile Bottom Tabs */}
      {isMobile && <MobileBottomTabs />}
    </div>
  );
};


function Header() {

  const enrichedResume = useCVStore(s => s.data);
  const importFromJson = useCVStore(s => s.importFromJson);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result as string;
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

  const loadSample = () => importFromJson(JSON.stringify(jsonResumeSample));

  const importJson = () => {
    fileInputRef.current?.click();
  };

  const exportJson = () => {
    // exports the enriched jsonresume for now
    const data = JSON.stringify(enrichedResume);
    const blob = new Blob([data], { type: 'application/json' });
    const fileURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = 'jsonresume.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  return (
    <header className="bg-white shadow-sm border-b">

      {/* <div className="max-w-full px-6 py-4"> */}
      <div className="px-4 py-3 md:px-6">

        {/* hidden input for file upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex items-center justify-between">
            {/* TODO: sidebar on mobile?? */}
            {/* <div className="flex items-center">
              <Menu className="w-5 h-5 text-gray-500 mr-3"/> */}
              <div>
                <h1 className="text-lg font-bold font-mono text-slate-700">pixel-cv</h1>
              </div>
            {/* </div> */}
            
            <div className="flex items-center gap-2">
              <MobileActionsDropdown
                onLoadSample={loadSample}
                onImportJson={importJson}
                onExportJson={exportJson}
              />
              <GeneratePdfButton />
            </div>
          </div>
        ) : (

          /* Desktop/Tablet Layout */
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-md font-bold font-mono text-slate-700">pixel-cv</h1>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <TemplateName />

              <button
                onClick={loadSample}
                className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
              >
                Load Sample
              </button>

              <button
                onClick={importJson}
                className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                title='Import a plain or enriched jsonresume file'
              >
                Import JSON
              </button>

              <button
                onClick={exportJson}
                className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                title='Export the enriched jsonresume file'
              >
                Export JSON
              </button>
              <GeneratePdfButton />
            </div>
          </div>
        )}
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
      a.download = `${cvData._metadata?.name || 'CV'}.pdf`;
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
