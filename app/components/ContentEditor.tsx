'use client';
import React, { useRef, useEffect } from 'react';

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
};

export default function ContentEditor({ value = '', onChange, placeholder = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      ref={ref}
      contentEditable
      onInput={(e) => onChange?.((e.target as HTMLDivElement).innerHTML)}
      className="min-h-[160px] rounded border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
      data-placeholder={placeholder}
      suppressContentEditableWarning
    />
  );
}
