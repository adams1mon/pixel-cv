'use client';

import React, { useCallback, useRef, useState } from 'react';

// outputs image/png regardless of the input mime type
type ImageCropperProps = {
  src: string; // data URL or normal URL
  onCropped: (croppedDataUrl: string) => void;
  onCancel?: () => void;
};

type Point = { x: number; y: number };

export const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  onCropped,
  onCancel,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetSelection = () => {
    setStartPoint(null);
    setEndPoint(null);
    setError(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setStartPoint({ x, y });
    setEndPoint({ x, y });
    setError(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || !startPoint) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);

    setEndPoint({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getNormalizedSelection = useCallback(() => {
    if (!startPoint || !endPoint || !containerRef.current) return null;

    const rect = containerRef.current.getBoundingClientRect();

    const x1 = Math.max(Math.min(startPoint.x, endPoint.x), 0);
    const y1 = Math.max(Math.min(startPoint.y, endPoint.y), 0);
    const x2 = Math.min(Math.max(startPoint.x, endPoint.x), rect.width);
    const y2 = Math.min(Math.max(startPoint.y, endPoint.y), rect.height);

    const width = x2 - x1;
    const height = y2 - y1;

    if (width < 5 || height < 5) {
      return null;
    }

    return { x: x1, y: y1, width, height, containerWidth: rect.width, containerHeight: rect.height };
  }, [startPoint, endPoint]);

  const handleCrop = async () => {
    const selection = getNormalizedSelection();
    if (!selection) {
      setError('Please drag to select an area to crop.');
      return;
    }

    try {
      const image = await loadImage(src);

      // scale the image by the container size, otherwise we would
      // be using the browser's container coordinates on the image 
      // coordinates (image space); the browser scales the image to
      // fit the desired container w/h, so we need to scale it back
      const scaleX = image.naturalWidth / selection.containerWidth;
      const scaleY = image.naturalHeight / selection.containerHeight;

      const sx = selection.x * scaleX;
      const sy = selection.y * scaleY;
      const sw = selection.width * scaleX;
      const sh = selection.height * scaleY;

      // scale down large images
      const maxWidth = 500;
      const maxHeight = 500;

      const scale = Math.min(1, maxWidth/sw, maxHeight/sh);
      const targetWidth = Math.round(sw * scale);
      const targetHeight = Math.round(sh * scale);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL("image/jpg", 0.5);
      onCropped(dataUrl);
    } catch (e) {
      console.error(e);
      setError('Failed to crop image. Please try again.');
    }
  };

  const selectionStyle = (() => {
    const s = getNormalizedSelection();
    if (!s) return { display: 'none' as const };

    return {
      left: `${s.x}px`,
      top: `${s.y}px`,
      width: `${s.width}px`,
      height: `${s.height}px`,
      display: 'block',
    };
  })();

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative border border-gray-300 rounded-md overflow-hidden bg-black/5 cursor-crosshair select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {/* Image */}
        <img
          src={src}
          alt="Crop preview"
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        {/* Selection rectangle */}
        <div
          className="pointer-events-none absolute border-2 border-blue-400 bg-blue-500/20"
          style={selectionStyle}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            <div className="border-r border-b border-white/40" />
            <div className="border-r border-b border-white/40" />
            <div className="border-b border-white/40" />
            <div className="border-r border-b border-white/40" />
            <div className="border-r border-b border-white/40" />
            <div className="border-b border-white/40" />
            <div className="border-r border-white/40" />
            <div className="border-r border-white/40" />
            <div />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={() => {
              resetSelection();
              onCancel?.();
            }}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={resetSelection}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Reset selection
        </button>
        <button
          type="button"
          onClick={handleCrop}
          className="px-4 py-1.5 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Crop
        </button>
      </div>
    </div>
  );
};

// Helper to load an image from a src
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}