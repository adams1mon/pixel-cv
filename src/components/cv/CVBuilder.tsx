'use client';

import React, { useCallback, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { SectionRouter } from './SectionRouter';
import dynamic from 'next/dynamic';
import { setupFonts } from './load-fonts';
import { initializeCVStore } from '@/stores/cv-store';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUI } from '@/contexts/UIContext';
import { MobileBottomTabs } from './mobile/MobileBottomTabs';
import { Header } from './Header';
import { TriangleAlert, X } from 'lucide-react';

const CanvasPdfPreview = dynamic(
  () => import("./CanvasPdfPreview").then(m => m.CanvasPdfPreview),
);

setupFonts();


// Main content component that uses the CV context
export const CVBuilder: React.FC = () => {

  const isMobile = useIsMobile();
  const { activeMobileTab } = useUI();

  const [showDisclaimer, setShowDisclaimer] = React.useState(true);
  
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

      {showDisclaimer && (
        <FlashMessage onClose={() => setShowDisclaimer(false)}>
          <p>
            Disclaimer: <i>heavy</i> vibe coding has been used to make this site, might be buggy!
          </p>
        </FlashMessage>
      )}

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

type FlashMessageProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const FlashMessage: React.FC<FlashMessageProps> = ({ children, onClose }) => (
  <div className="w-full px-2 py-1">
    <div className="w-full flex justify-between items-center gap-2 bg-slate-800 rounded-sm px-2 py-1 text-xs text-slate-100">
      <span>{children}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss message"
        className="text-slate-300 hover:text-white"
      >
        <X className="w-5 h-5 hover:cursor-pointer"/>
      </button>
    </div>
  </div>
);
