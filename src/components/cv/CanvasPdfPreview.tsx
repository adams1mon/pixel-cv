"use client";

import React from 'react';
import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CanvasPdfPreviewProps {
  pdfDocument: any;
  width?: number;
  initialScale?: number;
}

// TODO: debounce pdf generation

function setPageStyles() {
  const pages = document.querySelectorAll(".react-pdf__Page");
    pages.forEach(page => {
      const { style } = page as HTMLElement;
      style.backgroundColor = "transparent";
      style.display = "flex";
      style.justifyContent = "center";
      style.marginTop = "calc(var(--spacing) * 2)";
  });
}

export const CanvasPdfPreview: React.FC<CanvasPdfPreviewProps> = ({
  pdfDocument,
  width = 300,
  initialScale = 1.1,
}) => {
  const [instance, update] = usePDF({ document: pdfDocument });
  const [numPages, setNumPages] = React.useState(0);
  const [scale, setScale] = React.useState(initialScale);
  const [scaleInput, setScaleInput] = React.useState(Math.round(initialScale * 100).toString());

  // Force re-generate PDF when the document element changes
  React.useEffect(() => {
    if (pdfDocument) {
      update(pdfDocument);
    }
  }, [pdfDocument, update]);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }

  const applyScale = (next: number) => {
    const clamped = Math.min(200, Math.max(50, Math.round(next)));
    setScale(clamped / 100);
    setScaleInput(String(clamped));
  };

  const zoomIn = () => applyScale(scale * 100 + 10);
  const zoomOut = () => applyScale(scale * 100 - 10);
  const zoomReset = () => applyScale(initialScale * 100);

  const onScaleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setScaleInput(val);
  };

  const onScaleInputBlur = () => {
    const num = parseInt(scaleInput || '0', 10);
    if (isNaN(num)) {
      setScaleInput(String(Math.round(scale * 100)));
      return;
    }
    applyScale(num);
  };

  if (instance.loading) {
    return (
      <div className="w-full h-full">
        <div className="p-3 text-sm text-white">Rendering PDF...</div>
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className="w-full h-full">
        <div className="p-3 text-sm text-red-500">{String(instance.error)}</div>
      </div>
    );
  }

  return (

    <div className="relative w-full h-full overflow-auto bg-none group">
      {/* Overlay controls - appear on hover */}
      <div className="absolute bottom-5 pointer-events-auto w-full z-10">
        <div className="w-48 flex items-center justify-center gap-1 mx-auto border-2 rounded-md bg-white/70 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={zoomOut}
          title="Zoom out"
          className="hover:cursor-pointer text-gray-700 hover:bg-gray-100 border-r border-r-gray-400 px-2 py-1 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="flex items-center px-1 py-1">
          <input
            type="number"
            inputMode="numeric"
            min={50}
            max={200}
            step={1}
            value={scaleInput}
            onChange={onScaleInputChange}
            onBlur={onScaleInputBlur}
            className="text-center text-sm text-gray-800 bg-none outline-none appearance-none"
            style={{ WebkitAppearance: 'none' as any, MozAppearance: 'textfield' as any }}
          />
        </div>
        <button
          onClick={zoomIn}
          title="Zoom in"
          className="hover:cursor-pointer text-gray-700 hover:bg-gray-100 border-l border-l-gray-400 px-2 py-1 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomReset}
          title="Reset zoom"
          className="hover:cursor-pointer text-gray-700 hover:bg-gray-100 border-l border-l-gray-400 px-2 py-1 transition-colors rounded-r-md"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        </div>
      </div>

      <Document
        className="h-full px-2 overflow-auto"
        file={instance.blob}
        onLoadSuccess={onLoadSuccess}
        error={(
          <p>Failed to render the PDF...</p>
        )}
      >
        {Array.from({ length: numPages || 0 }, (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageIndex={i}
            width={width}
            scale={scale}
            onLoadSuccess={setPageStyles}
          />
        ))}
      </Document>

    </div>
  );
};