"use client";

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useCVStore } from '@/stores/cv-store';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CanvasPdfPreviewProps {
  width?: number;
  initialScale?: number;
}

// TODO: debounce pdf generation
// TODO: less jarring loading transition
// TODO: loading indicator shifts up fsr

// fixes annotation layer positioning
function setPageStyles() {
  const pages = document.querySelectorAll(".react-pdf__Page");
    pages.forEach(page => {
      const { style } = page as HTMLElement;
      style.backgroundColor = "transparent";
      style.display = "flex";
      style.justifyContent = "center";
      style.marginTop = "calc(var(--spacing) * 2)";
  });
  const layers = document.querySelectorAll(".react-pdf__Page__textContent");
    layers.forEach(page => {
      const { style } = page as HTMLElement;
      style.justifySelf = "center";
  });
  const anno = document.querySelectorAll(".react-pdf__Page__annotations");
    anno.forEach(page => {
      const { style } = page as HTMLElement;
      style.justifySelf = "center";
  });
}

export const CanvasPdfPreview: React.FC<CanvasPdfPreviewProps> = ({
  width = 460,
  initialScale = 1.0,
}) => {

  const pdfBlob = useCVStore(s => s.pdfBlob);
  const pdfGenerating = useCVStore(s => s.pdfGenerating);
  const pdfError = useCVStore(s => s.pdfError);

  const [numPages, setNumPages] = React.useState(0);
  const [scale, setScale] = React.useState(initialScale);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }

  if (pdfGenerating) {
    return <PdfLoading />;
  }

  if (pdfError) {
    console.log(pdfError);
    return <PdfError />;
  }

  return (
    <div className="relative w-full h-full overflow-auto bg-none group">
      { 
        pdfGenerating ?
        <PdfLoading />
        :
        pdfError ?
        <PdfError />
        :
        <>
          <OverlayControls 
            scale={scale}
            setScale={setScale}
          />

          <Document
            // changing key every time the doc loads to prevent some error
            // https://github.com/wojtekmaj/react-pdf/issues/974
            className="h-full px-2 overflow-auto pb-12"
            file={pdfBlob}
            onLoadSuccess={onLoadSuccess}
            loading={<PdfLoading />}
            error={<PdfError />}
          >
            {Array.from({ length: numPages || 0 }, (_, i) => (
              <Page
                key={`page_${i + 1}`}
                pageIndex={i}
                width={width}
                scale={scale}
                onLoadSuccess={setPageStyles}
                loading={null}
              />
            ))}
          </Document>
        </>
      }
    </div>
  );
};

function OverlayControls({
  scale,
  setScale,
}: {
  scale: number,
  setScale: (v: number) => void,
}) {

  const [scaleInput, setScaleInput] = React.useState(Math.round(scale * 100).toString());

  const applyScale = (next: number) => {
    const clamped = Math.min(200, Math.max(50, Math.round(next)));
    setScale(clamped / 100);
    setScaleInput(String(clamped));
  };

  const zoomIn = () => applyScale(scale * 100 + 25);
  const zoomOut = () => applyScale(scale * 100 - 25);
  const zoomReset = () => applyScale(scale * 100);

  const onScaleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleInput(e.target.value);
  };

  const onScaleInputBlur = () => {
    const num = parseInt(scaleInput || '0', 10);
    if (isNaN(num)) {
      setScaleInput(String(Math.round(scale * 100)));
      return;
    }
    applyScale(num);
  };

  return (
    <div className="absolute bottom-6 pointer-events-auto w-full z-10">
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
  );
}

function PdfLoading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Loader2 className='w-4 h-4 animate-spin' />
    </div>
  );
}

function PdfError() {
  return (
    <div className="w-full h-full">
      <div className="p-3 text-sm text-white">An error occurred...</div>
    </div>
  );
}