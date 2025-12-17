import { useIsMobile } from "@/hooks/useIsMobile";
import { useCVStore } from "@/stores/cv-store";
import React from "react";
import { jsonResumeSample } from "./jsonresume-sample";
import { MobileActionsDropdown } from "./mobile/HeaderMobileDropdown";
import { TemplateName } from "./TemplateName";
import clsx from "clsx";
import { Download, Loader2 } from "lucide-react";

export function Header() {

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