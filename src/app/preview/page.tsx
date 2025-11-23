'use client';

import { ModernReactHtml } from '@/components/templates/ModernReactHtml';
import { useCVStore } from '@/stores/cv-store';
import './print.css';
import { jsonResumeSample } from '@/components/cv/jsonresume-sample';

export default function PreviewPage() {
  const { data, pageWrap } = useCVStore();
  const importFromJson = useCVStore(s => s.importFromJson);

  return (
    <div style={{ 
      minHeight: '100vh',
    }}>
      <div 
      className='cv-print-container'
      style={{
        margin: '0 auto',
        maxWidth: '210mm',
      }}>
        <ModernReactHtml data={data} pageWrap={pageWrap} />
      </div>
      
      {/* Print button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <button
          onClick={() => importFromJson(JSON.stringify(jsonResumeSample))}
          className="px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
        >
          Load Sample
        </button>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
          }}
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

