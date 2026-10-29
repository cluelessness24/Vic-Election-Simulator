/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Camera, Check, Loader2 } from 'lucide-react';
import { GuideTab } from './UserGuideModal';
import { exportSectionImage } from '../utils/exportSectionImage';

export interface SectionHeaderActionsProps {
  /** The DOM ID of the section container to export */
  elementId: string;
  /** Human-readable title of the section for the export header and filename */
  sectionTitle: string;
  /** The guide tab to open when clicking the golden book button */
  guideTab: GuideTab;
  /** Callback to open the User Guide modal navigated to the target tab */
  onOpenGuide: (tab: GuideTab) => void;
  /** Optional custom class name for the button container */
  className?: string;
  /** Whether to show a text label alongside the icon (default: compact/responsive) */
  showLabel?: boolean;
}

export const SectionHeaderActions: React.FC<SectionHeaderActionsProps> = ({
  elementId,
  sectionTitle,
  guideTab,
  onOpenGuide,
  className = '',
  showLabel = false,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const handleCaptureImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExporting) return;

    try {
      setIsExporting(true);
      await exportSectionImage({
        elementId,
        sectionTitle,
        filenamePrefix: 'vic-simulator',
        targetWidth: 1280,
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2200);
    } catch (err) {
      console.error('Failed to capture section snapshot:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenGuideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenGuide(guideTab);
  };

  return (
    <div
      data-export-ignore="true"
      className={`flex items-center gap-1.5 shrink-0 select-none ${className}`}
    >
      {/* 1. Golden User Guide Button */}
      <button
        type="button"
        onClick={handleOpenGuideClick}
        title={`Open User Guide: ${sectionTitle}`}
        aria-label={`Open User Guide for ${sectionTitle}`}
        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/50 rounded transition-all duration-150 cursor-pointer shadow-xs focus:outline-hidden focus:ring-1 focus:ring-amber-400"
      >
        <BookOpen size={12} className="text-amber-400 shrink-0" />
        {showLabel && <span className="hidden sm:inline">Guide</span>}
      </button>

      {/* 2. Full-Width (1280px) Camera Snapshot Download Button */}
      <button
        type="button"
        onClick={handleCaptureImage}
        disabled={isExporting}
        title={exportSuccess ? 'Snapshot saved!' : isExporting ? 'Capturing 1280px image...' : `Download 1280px image snapshot of ${sectionTitle}`}
        aria-label={`Download image snapshot of ${sectionTitle}`}
        className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded transition-all duration-150 cursor-pointer shadow-xs focus:outline-hidden focus:ring-1 focus:ring-slate-400 border ${
          exportSuccess
            ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40'
            : isExporting
            ? 'text-slate-400 bg-white/5 border-white/10 cursor-wait'
            : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border-white/10 hover:border-white/20'
        }`}
      >
        {isExporting ? (
          <>
            <Loader2 size={12} className="animate-spin text-amber-400 shrink-0" />
            <span className="hidden sm:inline text-[10px]">Saving...</span>
          </>
        ) : exportSuccess ? (
          <>
            <Check size={12} className="text-emerald-400 shrink-0" />
            <span className="hidden sm:inline text-[10px] text-emerald-300">Saved</span>
          </>
        ) : (
          <>
            <Camera size={12} className="shrink-0 text-slate-300" />
            {showLabel && <span className="hidden sm:inline">Snapshot</span>}
          </>
        )}
      </button>
    </div>
  );
};
