'use client';
import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) onChange(!checked); }}
        onClick={() => { if (!disabled) onChange(!checked); }}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${checked ? 'bg-primary-700' : 'bg-muted-foreground/30'}`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </div>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
    </label>
  );
}