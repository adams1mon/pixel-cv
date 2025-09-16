'use client';

import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { ModernReactPdf } from '../components/templates/ModernReactPdf';
import type { CVData } from '../types/cv-data';

interface ExportArgs {
  data: CVData;
  filename?: string;
}

export async function generateAndDownloadPdf(args: ExportArgs): Promise<void> {
  if (typeof window === 'undefined') return;
  const { data, filename } = args;
  const base = (filename || data.metadata?.title || 'pixel-cv').trim();
  const name = (base.length ? base : 'pixel-cv').replace(/\s+/g, '-').toLowerCase() + '.pdf';

  const docElement = React.createElement(ModernReactPdf, { data } as any) as unknown as any;
  const blob = await pdf(docElement).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 