'use client';

import React from 'react';

interface EditorHeaderProps {
  title: string;
  subtitle: string;
}

export const EditorHeader = React.memo<EditorHeaderProps>((props) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{props.title}</h2>
      <p className="text-gray-600">
        {props.subtitle}
      </p>
    </div>
  );
});
EditorHeader.displayName = 'EditorHeader';
